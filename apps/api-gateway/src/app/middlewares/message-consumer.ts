import RabbitManager from "@blogger/rabbitmq-manager";
import 'dotenv/config';
import { Interfaces } from "@blogger/global-interfaces";
import { NextFunction, Request, Response } from "express";
import logger from "@blogger/util-logger";
import generateSwaggerDocs from "../../config/swagger";

/**
 * When services data is updated, the api gateway needs the current info in order to successfully forward the requests
 * Api Registry publishes a message upon creating/updating server data, Api Gateway loads the APIs data from
 * Registry in generate Swagger Docs and updates swagger UI as well
 */

const consumeMessages = async (req: Request, res: Response, next: NextFunction) => {
  const queueName = process.env['API_GATEWAY_QUEUE_NAME'];
  const routingKey = process.env['API_REGISTRY_ROUTING_KEY'];
  const exchangeName = process.env['RABBIT_EXCHANGE'];
  const port = parseInt(process.env['PORT_GATEWAY']);

  try {
    const rabbit = await RabbitManager.rabbitChannel();
    await rabbit.assertExchange(exchangeName, 'direct', {durable: true});
    const queue = await rabbit.assertQueue(queueName, {durable: true})
    await rabbit.bindQueue(queue.queue, exchangeName, routingKey);
    await rabbit.consume(queue.queue, (msg) => {
      const message: Interfaces.RabbitMessage = JSON.parse(msg.content.toString());
      logger.info(`Message consumed from exchange: ${exchangeName}, queue: ${queueName}, message: ${JSON.stringify(message)}`);
      generateSwaggerDocs(global.app, port); // reloads api data, caches new values and rerenders swagger docs
      rabbit.ack(msg);
    });
    next();
  } catch (e: any) {
    logger.error(`Consuming rabbit queue: ${queueName} error: ${e.message}`);
    next();
  }
};

export default {
  consumeMessages
};

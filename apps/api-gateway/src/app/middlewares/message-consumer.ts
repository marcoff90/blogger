import RabbitManager from "@blogger/rabbitmq-manager";
import 'dotenv/config';
import { Interfaces } from "@blogger/global-interfaces";
import { NextFunction, Request, Response } from "express";
import logger from "@blogger/util-logger";
import generateSwaggerDocs from "../../config/swagger";

const consumeMessages = async (req: Request, res: Response, next: NextFunction) => {
  const queueName = process.env['API_GATEWAY_QUEUE_NAME'];
  const routingKey = process.env['API_REGISTRY_ROUTING_KEY'];
  const exchangeName = process.env['RABBIT_EXCHANGE'];
  const port = parseInt(process.env['PORT_GATEWAY']);

  try {
    const rabbit = await RabbitManager.rabbitChannel();
    await rabbit.assertExchange(exchangeName, 'direct', {durable: true});
    const q = await rabbit.assertQueue(queueName, {durable: true})
    await rabbit.bindQueue(q.queue, exchangeName, routingKey);
    await rabbit.consume(q.queue, (msg) => {
      const message: Interfaces.ApiRegistryMessage = JSON.parse(msg.content.toString());
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

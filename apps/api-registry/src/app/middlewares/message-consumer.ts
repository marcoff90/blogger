import RabbitManager from "@blogger/rabbitmq-manager";
import 'dotenv/config';
import { Interfaces } from "@blogger/global-interfaces";
import { NextFunction, Request, Response } from "express";
import logger from "@blogger/util-logger";
import ServerService from "../services/server-service";

/**
 * In case Api Registry fails and isn't online, the services publish message with their updated info into rabbit
 * exchange -> Api Registry gets the message and updates the data accordingly
 */

const consumeMessages = async (req: Request, res: Response, next: NextFunction) => {
  const queueName = process.env['API_REGISTRY_QUEUE_NAME'];
  const routingKey = process.env['API_REGISTRY_FAIL_KEY'];
  const exchangeName = process.env['RABBIT_EXCHANGE'];

  try {
    const rabbit = await RabbitManager.rabbitChannel();
    await rabbit.assertExchange(exchangeName, 'direct', {durable: true});
    const queue = await rabbit.assertQueue(queueName, {durable: true})
    await rabbit.bindQueue(queue.queue, exchangeName, routingKey);

    await rabbit.consume(queue.queue, (msg) => {
      const message: Interfaces.RabbitMessage = JSON.parse(msg.content.toString());
      const newServer = {} as Interfaces.RegisterServerInput;

      logger.info(`Message consumed from exchange: ${exchangeName}, queue: ${queueName}, message: ${JSON.stringify(message)}`);

      Object.assign(newServer, message['message']);
      ServerService.create(newServer as Interfaces.ServerI);
      ServerService.notifyApiGateway();
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

import RabbitManager from "@blogger/rabbitmq-manager";
import 'dotenv/config';
import { Interfaces } from "@blogger/global-interfaces";
import { NextFunction, Request, Response } from "express";
import logger from "@blogger/util-logger";
import ArticleService from "../services/article-service";

/**
 * Comments associated with article were deleted, blogger is notified through message and can hard delete article
 */

const exchangeName = process.env['RABBIT_EXCHANGE'];

const consumeDeleteArticlesQueue = async (req: Request, res: Response, next: NextFunction) => {
  const queueName = process.env['BLOGGER_QUEUE_NAME'];
  const routingKey = process.env['COMMENTS_ROUTING_KEY'];

  try {
    const rabbit = await RabbitManager.rabbitChannel();
    await rabbit.assertExchange(exchangeName, 'direct', {durable: true});
    const queue = await rabbit.assertQueue(queueName, {durable: true})
    await rabbit.bindQueue(queue.queue, exchangeName, routingKey);
    await rabbit.consume(queue.queue, (msg) => {
      const message: Interfaces.RabbitMessage = JSON.parse(msg.content.toString());
      const deleteArticle: Interfaces.DeletedArticleMessage = message.message;
      logger.info(`Message consumed from exchange: ${exchangeName}, queue: ${queueName}, message: ${JSON.stringify(message)}`);
      ArticleService.deleteArticle(deleteArticle.deletedId);
      rabbit.ack(msg);
    });
    next();
  } catch (e: any) {
    logger.error(`Consuming rabbit queue: ${queueName} error: ${e.message}`);
    next();
  }
};

const consumeLifeCheckQueue = async (req: Request, res: Response, next: NextFunction) => {
  const queueName = process.env['COMMENTS_BLOGGER_FAIL_QUEUE_NAME'];
  const routingKey = process.env['COMMENTS_BLOGGER_FAIL_ROUTING_KEY'];

  try {
    const rabbit = await RabbitManager.rabbitChannel();
    await rabbit.assertExchange(exchangeName, 'direct', {durable: true});
    const queue = await rabbit.assertQueue(queueName, {durable: true})
    await rabbit.bindQueue(queue.queue, exchangeName, routingKey);
    await rabbit.consume(queue.queue, (msg) => {
      const message: Interfaces.RabbitMessage = JSON.parse(msg.content.toString());
      const apiMessage: Interfaces.ApiMessage = message.message;
      logger.info(`Message consumed from exchange: ${exchangeName}, queue: ${queueName}, message: ${JSON.stringify(message)}`);

      if (apiMessage.message === 'Communication failed') {
        const sendBackKey = process.env['BLOGGER_COMMENTS_BACK_ONLINE_ROUTING_KEY'];
        const messageToSendBack: Interfaces.ApiMessage = {
          message: 'Back online'
        };
        RabbitManager.publishMessage(sendBackKey, messageToSendBack);
      }
      rabbit.ack(msg);
    });
    next();
  } catch (e: any) {
    logger.error(`Consuming rabbit queue: ${queueName} error: ${e.message}`);
    next();
  }
};

export default {
  consumeDeleteArticlesQueue,
  consumeLifeCheckQueue
};

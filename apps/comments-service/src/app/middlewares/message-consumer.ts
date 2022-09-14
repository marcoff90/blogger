import RabbitManager from "@blogger/rabbitmq-manager";
import 'dotenv/config';
import { Interfaces } from "@blogger/global-interfaces";
import { NextFunction, Request, Response } from "express";
import logger from "@blogger/util-logger";
import CommentService from "../services/comment-service";

/**
 * When article is deleted in Blogger Service, Comment's service gets the message through rabbit mq and deletes
 * associated comments by article id in the message
 */

const exchangeName = process.env['RABBIT_EXCHANGE'];

const consumeDeleteCommentsQueue = async (req: Request, res: Response, next: NextFunction) => {
  const queueName = process.env['COMMENTS_QUEUE_NAME'];
  const routingKey = process.env['BLOGGER_ROUTING_KEY'];

  try {
    const rabbit = await RabbitManager.rabbitChannel();
    await rabbit.assertExchange(exchangeName, 'direct', {durable: true});
    const queue = await rabbit.assertQueue(queueName, {durable: true})
    await rabbit.bindQueue(queue.queue, exchangeName, routingKey);
    await rabbit.consume(queue.queue, (msg) => {
      const message: Interfaces.RabbitMessage = JSON.parse(msg.content.toString());
      const deleteArticle: Interfaces.DeletedArticleMessage = message.message;
      logger.info(`Message consumed from exchange: ${exchangeName}, queue: ${queueName}, message: ${JSON.stringify(message)}`);
      CommentService.deleteByArticleId(deleteArticle.deletedId);
      rabbit.ack(msg);
    });
    next();
  } catch (e: any) {
    logger.error(`Consuming rabbit queue: ${queueName} error: ${e.message}`);
    next();
  }
};

const consumeBloggerActiveQueue = async (req: Request, res: Response, next: NextFunction) => {
  const queueName = process.env['BLOGGER_COMMENTS_BACK_ONLINE_QUEUE_NAME'];
  const routingKey = process.env['BLOGGER_COMMENTS_BACK_ONLINE_ROUTING_KEY'];

  try {
    const rabbit = await RabbitManager.rabbitChannel();
    await rabbit.assertExchange(exchangeName, 'direct', {durable: true});
    const queue = await rabbit.assertQueue(queueName, {durable: true})
    await rabbit.bindQueue(queue.queue, exchangeName, routingKey);
    await rabbit.consume(queue.queue, (msg) => {
      const message: Interfaces.RabbitMessage = JSON.parse(msg.content.toString());
      const apiMessage: Interfaces.ApiMessage = message.message;
      logger.info(`Message consumed from exchange: ${exchangeName}, queue: ${queueName}, message: ${JSON.stringify(message)}`);

      if (apiMessage.message === 'Back online') {
        CommentService.validateNotPublishedComments()
      }
      rabbit.ack(msg);
    });
    next();
  } catch (e: any) {
    logger.error(`Consuming rabbit queue: ${queueName} error: ${e.message}`);
    next();
  }
}

export default {
  consumeDeleteCommentsQueue,
  consumeBloggerActiveQueue
};

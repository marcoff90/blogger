import {NextFunction, Request, Response} from "express";
import RabbitManager from "@blogger/rabbitmq-manager";
import logger from "@blogger/util-logger";
import { Interfaces } from "@blogger/global-interfaces";
import VoteService from "../services/vote-service";
import 'dotenv/config';

const exchangeName = process.env['RABBIT_EXCHANGE'];

const consumeCommentsActiveQueue = async (req: Request, res: Response, next: NextFunction) => {
  const queueName = process.env['COMMENTS_VOTES_BACK_ONLINE_QUEUE_NAME'];
  const routingKey = process.env['COMMENTS_VOTES_BACK_ONLINE_ROUTING_KEY'];

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
        VoteService.validateNotPublishedVotes()
      }
      rabbit.ack(msg);
    });
    next();
  } catch (e: any) {
    logger.error(`Consuming rabbit queue: ${queueName} error: ${e.message}`);
    next();
  }
};

const consumeDeleteVotesQueue = async (req: Request, res: Response, next: NextFunction) => {
  const queueName = process.env['VOTES_COMMENTS_DELETED_ARTICLE_QUEUE_NAME'];
  const routingKey = process.env['VOTES_COMMENTS_DELETED_ARTICLE_ROUTING_KEY'];

  try {
    const rabbit = await RabbitManager.rabbitChannel();
    await rabbit.assertExchange(exchangeName, 'direct', {durable: true});
    const queue = await rabbit.assertQueue(queueName, {durable: true})
    await rabbit.bindQueue(queue.queue, exchangeName, routingKey);
    await rabbit.consume(queue.queue, (msg) => {
      const message: Interfaces.RabbitMessage = JSON.parse(msg.content.toString());
      const deleteArticle: Interfaces.DeletedArticleMessage = message.message;
      logger.info(`Message consumed from exchange: ${exchangeName}, queue: ${queueName}, message: ${JSON.stringify(message)}`);
      VoteService.deleteByArticleId(deleteArticle.deletedId);
      rabbit.ack(msg);
    });
    next();
  } catch (e: any) {
    logger.error(`Consuming rabbit queue: ${queueName} error: ${e.message}`);
    next();
  }
};

export default {
  consumeCommentsActiveQueue,
  consumeDeleteVotesQueue
};

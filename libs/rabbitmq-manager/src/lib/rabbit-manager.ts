import 'dotenv/config';
import client, {Channel, Connection} from 'amqplib';
import logger from "@blogger/util-logger";

const rabbitUrl = process.env['RABBIT_URL'];
const exchangeName = process.env['RABBIT_EXCHANGE'];
let channel: Channel = null;

const createConnection = async (): Promise<void> => {
  try {
    const connection: Connection = await client.connect(`amqp://${rabbitUrl}`)
    channel = await connection.createChannel();
    logger.info('RabbitMQ connection successful');
  } catch (e: any) {
    logger.error(`RabbitMQ connection error: ${e.message}`);
  }
};

const rabbitChannel = async (): Promise<Channel> => {
  if (!channel) {
    await createConnection();
    return channel;
  } else {
    return channel;
  }
};

const publishMessage = async (routingKey: string, message: any): Promise<void> => {
  try {
    const rabbit = await rabbitChannel();
    await rabbit.assertExchange(exchangeName, 'direct', {durable: true});
    const messageDetails = {
      type: routingKey,
      message: message,
      date: new Date()
    };
    rabbit.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(messageDetails)));
    logger.info(`Message ${JSON.stringify(message)} published to exchange ${exchangeName}`);
  } catch (e: any) {
    logger.error(`Message ${JSON.stringify(message)} not published to exchange ${exchangeName} due to error: ${e.message}`);
  }
};

export default {
  publishMessage,
  rabbitChannel
};

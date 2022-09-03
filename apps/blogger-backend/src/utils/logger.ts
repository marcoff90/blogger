import logger from "pino";
import dayjs from "../../../../node_modules/dayjs";

const log = logger({
  transport: {
    target: 'pino-pretty'
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;

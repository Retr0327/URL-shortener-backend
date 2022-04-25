import Redis from "ioredis";
import { dockerEnv } from "../constants";

const { period, redisHost, redisPort } = dockerEnv;

const redisConfig = () => {
  if (period === "production") {
    return `redis://${redisHost}:${redisPort}`;
  }
  return "";
};

const redisCli = new Redis(redisConfig());

export default redisCli;

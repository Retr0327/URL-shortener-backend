import PG, { PoolConfig } from "pg";
import { dockerEnv } from "../constants";

const { period, pgDatabase, pgHost, pgPort, pgPassword, pgUser } = dockerEnv;

const pgConfig = (): PoolConfig => {
  if (period === "production") {
    return {
      host: pgHost,
      user: pgUser,
      database: pgDatabase,
      password: pgPassword,
      port: Number(pgPort),
    };
  }

  return {
    host: "localhost",
    database: "url-shortener",
    port: 5432,
  };
};

const URLSHORTENER = new PG.Pool(pgConfig());

export default URLSHORTENER
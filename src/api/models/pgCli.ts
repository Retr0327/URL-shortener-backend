import PG, { PoolConfig } from "pg";

export const pgConfig = (): PoolConfig => {
  if (process.env.NODE_ENV === "production") {
    return {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: Number(process.env.PGPORT),
    };
  }

  return {
    host: "localhost",
    database: "url-shortener",
    port: 5432,
  };
};

const pgCli = new PG.Pool(pgConfig());

export default pgCli;

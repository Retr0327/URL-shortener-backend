const shortURLTable = "shortened_urls";
const redisKey = (shortURL: string) => `shortURL:${shortURL}`;

const dockerEnv = {
  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.PGPASSWORD,
  pgPort: process.env.PGPORT,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  port: process.env.PORT,
  period: process.env.NODE_ENV,
};

export { dockerEnv, shortURLTable, redisKey };

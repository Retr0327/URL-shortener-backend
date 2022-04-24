export type DockerEnvType = {
  pgUser: string | undefined;
  pgHost: string | undefined;
  pgDatabase: string | undefined;
  pgPassword: string | undefined;
  pgPort: number | string | undefined;
  redisHost: string | undefined;
  redisPort: number | string | undefined;
  port: number | string | undefined;
  period: string | undefined;
};

import { pgConfig } from "src/api/models/pgCli";
import { redisConfig } from "src/api/models/redisCli";

describe("Test models config", () => {
  test("should return postgres config in production", () => {
    const config = pgConfig();
    expect(config).toHaveProperty("host");
    expect(config).toHaveProperty("user");
    expect(config).toHaveProperty("database");
    expect(config).toHaveProperty("password");
    expect(config).toHaveProperty("port");
  });

  test("should return redis config in production", () => {
    const config = redisConfig();
    expect(config).not.toBe("");
  });
});

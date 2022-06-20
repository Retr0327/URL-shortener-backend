import { redisConfig } from "src/api/models/redisCli";

describe("Test Redis config", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test("should return redis config in production", () => {
    process.env.NODE_ENV = "production";
    const config = redisConfig();
    expect(config).toBe("redis://redis:6379");
    expect(config).not.toBe("");
  });
});

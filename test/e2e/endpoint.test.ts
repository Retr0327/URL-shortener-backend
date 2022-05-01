import server from "src/server";
import request from "supertest";
import { deleteCachedURL } from "src/api/helpers/redis";

let expireDate: Date;

beforeAll(() => {
  expireDate = new Date(Date.now() + 60 * 60 * 1000);
});

afterAll(() => {
  server.close();
});

describe("POST Endpoints", () => {
  describe("Post /api/urls", () => {
    test("should return id and short url", async () => {
      const response = await request(server).post("/url").send({
        url: "https://github.com/Retr0327",
        expireDate,
      });

      expect(response.statusCode).toEqual(200);
      expect(response.body.status).toBe("success");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("shortURL");

      const deleteResponse = await request(server).post("/url/delete").send({
        shortURL: response.body.shortUrl,
      });

      expect(deleteResponse.statusCode).toEqual(202);
    });

    test(`should return error {"errors": [{"url": "Invalid URL"}]}`, async () => {
      const response = await request(server).post("/url").send({
        url: "1https://github.com/Retr0327",
        expireDate,
      });

      const actual = { status: "failed", error: [{ message: "Invalid URL" }] };

      expect(response.statusCode).toEqual(400);
      expect(response.body).toMatchObject(actual);
    });
  });
});

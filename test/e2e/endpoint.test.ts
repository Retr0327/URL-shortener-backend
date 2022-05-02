import server from "src/server";
import request from "supertest";
import { deleteCachedURL } from "src/api/helpers/redis";
import { getShortURLByFullURL } from "src/api/services/shortURLServices";

let expireDate: Date;

beforeAll(() => {
  expireDate = new Date(Date.now() + 60 * 60 * 1000);
});

afterAll(() => {
  server.close();
});

describe("POST Endpoints", () => {
  describe("Post /api/url", () => {
    test("should return id and short url", async () => {
      const response = await request(server).post("/url").send({
        url: "https://github.com/Retr0327",
        expireDate,
      });

      expect(response.statusCode).toEqual(200);
      expect(response.body.status).toBe("success");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("shortURL");
    });

    test(`should return error {"error": [{"message": "Invalid URL"}]}`, async () => {
      const response = await request(server).post("/url").send({
        url: "1https://github.com/Retr0327",
        expireDate,
      });

      const actual = { status: "failed", error: [{ message: "Invalid URL" }] };

      expect(response.statusCode).toEqual(400);
      expect(response.body).toMatchObject(actual);
    });

    test(`should return error {"error": [{"expire": "Invalid"}]}`, async () => {
      const response = await request(server).post("/url").send({
        url: "https://github.com/Retr0327",
        expireDate: "1970-02-08T09:20:41Z",
      });

      const actual = { status: "failed", error: [{ expire: "Invalid" }] };

      expect(response.statusCode).toEqual(400);
      expect(response.body).toMatchObject(actual);
    });

    test(`should return error {"error": [{"expire": "Invalid"}]}`, async () => {
      const response = await request(server).post("/url").send({
        url: "https://github.com/Retr0327",
        expireDate: "2036-0208T09:20:41Z",
      });

      const actual = { status: "failed", error: [{ expire: "Invalid" }] };

      expect(response.statusCode).toEqual(400);
      expect(response.body).toMatchObject(actual);
    });
  });

  describe("Post /api/url/all", () => {
    test("should return array of objects", async () => {
      const response = await request(server).post("/url/all");

      expect(response.statusCode).toEqual(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toEqual(
        expect.arrayContaining([expect.any(Object)])
      );
    });
  });
});

describe("GET Endpoints", () => {
  describe("Get /api/:shortURL", () => {
    test("should return fullURL", async () => {
      const result = await getShortURLByFullURL("https://github.com/Retr0327");
      const { short_url: shortURL } = result![0];

      const actual = {
        status: "success",
        fullURL: "https://github.com/Retr0327",
      };

      const response = await request(server).get(`/${shortURL}`);
      expect(response.body).toMatchObject(actual);
    });
  });
});

describe("POST /api/url/delete", () => {
  test("should return success", async () => {
    const result = await getShortURLByFullURL("https://github.com/Retr0327");

    const { short_url: shortURL } = result![0];

    const response = await request(server).post("/url/delete").send({
      shortURL,
    });

    expect(response.statusCode).toEqual(202);
    expect(response.body.status).toBe("success");
  });
});

import server from "src/server";
import request from "supertest";
import { PrismaClient } from "@prisma/client";

const { shortUrls } = new PrismaClient();

let expireDate: Date;
let errorResponse: { status: string; msg: string };

beforeAll(() => {
  expireDate = new Date(Date.now() + 60 * 60 * 1000);
  errorResponse = { status: "failed", msg: "invalid request body" };
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
      expect(response.statusCode).toEqual(201);
      expect(response.body.status).toBe("success");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("shortURL");
    });

    test(`should return { status: 'failed', msg: 'invalid request body' } due to wrong url format`, async () => {
      const response = await request(server).post("/url").send({
        url: "1https://github.com/Retr0327",
        expireDate,
      });

      expect(response.statusCode).toEqual(422);
      expect(response.body).toMatchObject(errorResponse);
    });

    test(`should return { status: 'failed', msg: 'invalid request body' } due to wrong expire date`, async () => {
      const response = await request(server).post("/url").send({
        url: "https://github.com/Retr0327",
        expireDate: "1970-02-08T09:20:41Z",
      });

      expect(response.statusCode).toEqual(422);
      expect(response.body).toMatchObject(errorResponse);
    });

    test(`should return { status: 'failed', msg: 'invalid request body' } due to wrong expire date`, async () => {
      const response = await request(server).post("/url").send({
        url: "https://github.com/Retr0327",
        expireDate: "2036-0208T09:20:41Z",
      });

      expect(response.statusCode).toEqual(422);
      expect(response.body).toMatchObject(errorResponse);
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
      const result = await shortUrls.findUnique({
        where: { fullURL: "https://github.com/Retr0327" },
        select: { shortURL: true },
      });

      const shortURL = result?.shortURL;
      const response = await request(server).get(`/${shortURL}`);
      const actual = {
        status: "success",
        fullURL: "https://github.com/Retr0327",
      };

      expect(response.body).toMatchObject(actual);
    });
  });
});

describe("POST /api/url/delete", () => {
  test("should return success", async () => {
    const result = await shortUrls.findUnique({
      where: { fullURL: "https://github.com/Retr0327" },
      select: { shortURL: true },
    });

    const response = await request(server).post("/url/delete").send({
      shortURL: result?.shortURL,
    });

    expect(response.statusCode).toEqual(202);
    expect(response.body.status).toBe("success");
  });
});

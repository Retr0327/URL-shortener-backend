import { pgCli } from "../models";
import { shortURLTable } from "../constants";

async function createShortUrlByUrl(
  url: string,
  shortUrl: string,
  expire: Date
) {
  try {
    const result = await pgCli.query(
      `INSERT INTO ${shortURLTable} (
        full_url, 
        short_url, 
        expire)
      VALUES ($1, $2, $3)
      RETURNING id, short_url;
      `,
      [url, shortUrl, expire]
    );

    return result.rows;
  } catch (error) {
    console.error("createShortUrlByUrl: ", error);
  }
}

async function getShortURLByFullURL(fullURL: string) {
  try {
    const result = await pgCli.query(
      `SELECT * FROM ${shortURLTable}
       WHERE full_url = $1
       AND expire > $2;
      `,
      [fullURL, new Date(new Date().toUTCString())]
    );

    return result.rows;
  } catch (error) {
    console.error("getFullURLByShortURL: ", error);
  }
}

async function getFullURLByShortURL(shortURL: string) {
  try {
    const result = await pgCli.query(
      `SELECT * FROM ${shortURLTable}
       WHERE short_url = $1
       AND expire > $2;
      `,
      [shortURL, new Date(new Date().toUTCString())]
    );

    return result.rows;
  } catch (error) {
    console.error("getFullURLByShortURL: ", error);
  }
}

async function getAllShortURLs() {
  try {
    const result = await pgCli.query(`SELECT * FROM ${shortURLTable};`);
    return result.rows;
  } catch (error) {
    console.error("getAllShortURL: ", error);
  }
}

async function deleteShortUrlByShortURL(shortURL: string) {
  try {
    const result = await pgCli.query(
      `DELETE FROM ${shortURLTable}
       WHERE short_url=$1
      `,
      [shortURL]
    );
    return result.rows;
  } catch (error) {
    console.error("deleteShortUrlByShortURL: ", error);
  }
}

async function updateTotalClickByShortURL(shortURL: string) {
  try {
    const result = await pgCli.query(
      `UPDATE ${shortURLTable}
       set total_click = total_click + 1
       WHERE short_url = $1
       returning *;
      `,
      [shortURL]
    );
    return result.rows;
  } catch (error) {
    console.error("updateTotalClickByShortURL: ", error);
  }
}

export {
  createShortUrlByUrl,
  getAllShortURLs,
  deleteShortUrlByShortURL,
  getFullURLByShortURL,
  getShortURLByFullURL,
  updateTotalClickByShortURL,
};

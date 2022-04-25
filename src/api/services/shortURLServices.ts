import { pgCli } from "../models";

async function createShortUrlByUrl(
  url: string,
  shortUrl: string,
  expire: Date
) {
  const result = await pgCli.query(
    `INSERT INTO shortened_urls (
        full_url, 
        short_url, 
        expire)
     VALUES ($1, $2, $3)
     RETURNING id, short_url
    `,
    [url, shortUrl, expire]
  );

  return result.rows;
}

async function deleteShortURLByShortURL(shortURL: string) {
  const result = await pgCli.query(
    `DELETE FROM shortened_urls 
     WHERE short_url = $1;
    `,
    [shortURL]
  );

  return result.rows;
}

export { createShortUrlByUrl, deleteShortURLByShortURL };

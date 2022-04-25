import { pgCli } from "../models";

async function createShortUrlByUrl(
  url: string,
  shortUrl: string,
  expire: Date
) {
  const { rows } = await pgCli.query(
    `INSERT INTO shortened_urls (
        full_url, 
        short_url, 
        expire)
     VALUES ($1, $2, $3)
     RETURNING id, short_url
    `,
    [url, shortUrl, expire]
  );

  return rows;
}

async function deleteShortURLByShortURL(shortURL: string) {
  const { rows } = await pgCli.query(
    `DELETE FROM shortened_urls 
     WHERE short_url = $1;
    `,
    [shortURL]
  );

  return rows;
}

export { createShortUrlByUrl, deleteShortURLByShortURL };

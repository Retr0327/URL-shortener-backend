function makeShortURL(length: number) {
  let result = "";
  const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const baseLength = base.length;

  for (let i = 0; i < length; i++) {
    result += base.charAt(Math.floor(Math.random() * baseLength));
  }

  return result;
}

async function generateShortUrl(length: number) {
  const shortURL = makeShortURL(length);

  return shortURL;
}

export default generateShortUrl;

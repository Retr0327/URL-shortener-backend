function makeShortURL(length: number) {
  let result = "";
  const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const baseLength = base.length;

  for (let i = 0; i < length; i++) {
    result += base.charAt(Math.floor(Math.random() * baseLength));
  }

  return result;
}

function generateShortUrl(url: string, length: number) {
  const shortURL = `shorturl/${makeShortURL(length)}`;
  return shortURL;
}

export default generateShortUrl;
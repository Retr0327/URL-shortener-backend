function makeShortURL(length: number) {
  let result = '';
  const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const baseLength = base.length;

  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < length; i++) {
    result += base.charAt(Math.floor(Math.random() * baseLength));
  }

  return result;
}

export default makeShortURL;

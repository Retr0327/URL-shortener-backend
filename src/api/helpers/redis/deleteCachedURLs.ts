import { redisCli } from "../../models";

function deleteCachedURLs(shortURL: string) {
  const data = redisCli.get(shortURL);

  console.log(data);
}

export default deleteCachedURLs;

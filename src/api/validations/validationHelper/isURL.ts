import { URL } from "url";

function isURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

export default isURL;

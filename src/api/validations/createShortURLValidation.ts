import * as Yup from "yup";
import { validate } from "@middlewares/index";
import { isValidURL, isExpired, isValidTimeString } from "./helpers";

const requestSchema = Yup.object({
  url: Yup.string()
    .required()
    .test((value) => isValidURL(value!)),
  expireDate: Yup.string()
    .test((value) => !isExpired(value!) && isValidTimeString(value!))
    .required(),
})
  .noUnknown(true)
  .strict();

const validateCreateShortURL = validate(requestSchema);

export default validateCreateShortURL;

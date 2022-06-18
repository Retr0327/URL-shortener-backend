import * as Yup from "yup";
import { validate } from "@middlewares";

const requestSchema = Yup.object({
  shortURL: Yup.string()
    .test((value) => value?.length === 5)
    .required(),
})
  .noUnknown(true)
  .strict();

const validateShortURL = validate(requestSchema);

export default validateShortURL;

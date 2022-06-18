import * as Yup from "yup";
import { validate } from "@middlewares";

const requestSchema = Yup.object({
  id: Yup.number().required(),
  shortURL: Yup.string()
    .test((value) => value?.length === 5)
    .required(),
})
  .noUnknown(true)
  .strict();

const validateDeleteShortURL = validate(requestSchema);

export default validateDeleteShortURL;

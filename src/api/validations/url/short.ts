import { object, string } from 'yup';
import validate from '../validator';

const requestSchema = object({
  shortURL: string()
    .test((value) => value?.length === 5)
    .required(),
})
  .noUnknown(true)
  .strict();

const validateShortURL = validate(requestSchema);

export default validateShortURL;

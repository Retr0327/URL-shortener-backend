import { object, string } from 'yup';
import validate from '../validator';
import { isValidURL, isExpired, isValidTimeString } from './utils';

const requestSchema = object({
  url: string()
    .required()
    .test((value) => isValidURL(value!)),
  expireDate: string()
    .test((value) => !isExpired(value!) && isValidTimeString(value!))
    .required(),
})
  .noUnknown(true)
  .strict();

const validateCreateURL = validate(requestSchema);

export default validateCreateURL;

import * as yup from "yup";

import { headerValidation, subHeaderValidation, logoValidation, hashtagsValidation } from './validationForm';

export const validateSchemaCreateArticle = yup.object().shape({
    logo: logoValidation,
    header: headerValidation,
    subHeader: subHeaderValidation,
    hashtags: hashtagsValidation,
  });
  
import * as yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const headerValidation = yup
  .string()
  .required()
  .min(5, 'Must be 5 characters at minimum')
  .max(25, 'Must be 25 characters at maximum')
  .matches(/^[0-9a-zA-Z ]+$/, 'Only Numbers and Letters or Spaces');

export const subHeaderValidation = yup
  .string()
  .max(25, 'Must be 25 characters at maximum')
  .matches(/^[0-9a-zA-Z ]+$/, 'Only Numbers and Letters or Spaces');

export const logoValidation = yup
  .mixed()
  .required('Logo require')
  .test(
    'fileFormat',
    'Unsupported Format',
    value => value && SUPPORTED_FORMATS.includes(value.type)
  );

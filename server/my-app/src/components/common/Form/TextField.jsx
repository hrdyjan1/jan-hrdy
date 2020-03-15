import React from 'react';
import { useField } from 'formik';
import { Form } from 'semantic-ui-react';

const TextField = ({ info }) => {
  const { id, name, description, type, label, icon } = info;
  const [field, meta] = useField(name);
  const { error, touched, value } = meta;
  const { onChange, onBlur } = field;
  const shouldShowError = error && touched;

  return (
    <Form.Input
      icon={icon}
      id={id}
      label={label}
      type={type}
      placeholder={description}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={
        shouldShowError && {
          content: error,
          pointing: 'below'
        }
      }
    />
  );
};

export default TextField;

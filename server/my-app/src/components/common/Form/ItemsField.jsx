import React from 'react';
import { useField, Field, FieldArray } from 'formik';

const ItemsField = ({ info }) => {
  const { id, name, description, type, label, icon } = info;
  const [, meta] = useField(name);
  const { value: values } = meta;

  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
          <div>
          {/* <Field name={`${name}[${index}]`} /> */}
          <Field name={`${name}[0].name`} />
          <Field name={`${name}[1].name`} />
          <button type='button' onClick={() => arrayHelpers.push('')}>
            +
          </button>
        </div>
      )}
    />
  );
};

export default ItemsField
import React, { useState } from 'react';
import { Field, FieldArray } from 'formik';

const ItemsField = ({ info }) => {
  const [index, setIndex] = useState(0);

  return (
    <FieldArray
      name={info.name}
      render={({ push, insert, remove }) => {
        return (
          <>
            <Field name={`${info.name}[${index}].name`}>
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta
              }) => {
                const { name } = field;
                const more = () => {
                  push({ name: '' });
                  setIndex(i => i + 1);
                };
                return (
                  <div>
                    <label htmlFor={name}>Email Address</label>
                    <input id={name} type='text' placeholder='Email' {...field} />
                    {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
                    <button type='button' onClick={more}>
                      +
                    </button>
                  </div>
                );
              }}
            </Field>
          </>
        );
      }}
    />
  );
};

export default ItemsField;

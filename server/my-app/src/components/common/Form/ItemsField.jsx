import React from 'react';
import { FieldArray, useField } from 'formik';
import ItemField from './components/ItemField';

const ItemsField = ({ info }) => {
  const [, meta] = useField(info.name);
  return (
    <FieldArray
      name={info.name}
      render={helpers => <ItemField shouldShowError={meta.touched} info={info} {...helpers} />}
    />
  );
};

export default ItemsField;

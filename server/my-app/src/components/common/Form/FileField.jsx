import React, { createRef } from 'react';
import { useField } from 'formik';
import { Form, Button, Icon } from 'semantic-ui-react';

import { FileLabel } from './components';

const FileField = ({ info: { id, name, type, label, description, icon } }) => {
  const fileRef = createRef();
  const [_, meta, helpers] = useField(name);
  const { error, touched, value } = meta;
  const { setTouched, setValue } = helpers;

  const shouldShowError = !!error;
  const fileLabelStatus = error || `Uploaded ${value?.name}`;

  const setUpFile = file => {
    setTouched(true);
    setValue(file);
  };
  const handleChangeFile = ({
    target: {
      validity,
      files: [file]
    }
  }) => validity.valid && setUpFile(file);

  return (
    <Form.Input id={id} label={label} type={type} onChange={handleChangeFile}>
      <input ref={fileRef} style={{ display: 'none' }} />
      {touched && <FileLabel shouldShowError={shouldShowError} status={fileLabelStatus} />}
      <Button type='button' onClick={() => fileRef.current.click()}>
        <Icon name={icon.name} />
        {description}
      </Button>
    </Form.Input>
  );
};

export default FileField;

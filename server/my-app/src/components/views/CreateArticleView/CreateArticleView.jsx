import React from 'react';
import { Formik } from 'formik';
import { createArticleForm } from '../../../constants';
import { isEmpty } from '../../../helpers';
import { Form, Button } from 'semantic-ui-react';
import { TextField, FileField, ItemsField } from '../../common/Form';

const { formValues, initialValues, validateSchema } = createArticleForm;
const { logo, header, subHeader, hashtags } = formValues;

export const DisplayFormikState = props => (
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem'
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

const CreateArticleView = () => {
  const onSubmit = async values => {
    await new Promise(resolve => setTimeout(resolve, 500));
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validateSchema}>
      {props => {
        const { errors, dirty, isSubmitting, handleSubmit } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <TextField info={header} />
            <TextField info={subHeader} />
            <FileField info={logo} />
            <ItemsField info={hashtags} />

            <Button type='submit' disabled={!(dirty && isEmpty(errors)) || isSubmitting}>
              Submit
            </Button>
            <DisplayFormikState {...props} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateArticleView;

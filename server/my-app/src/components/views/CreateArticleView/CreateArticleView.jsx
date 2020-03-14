import React from 'react';
import { Formik } from 'formik';
import { createArticleForm } from '../../../constants';
import { isEmpty } from '../../../helpers';

const { formValues, initialValues, validateSchema } = createArticleForm;
const { logo, header, subHeader } = formValues;

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

  const handleChangeFile = (
    {
      target: {
        validity,
        files: [file]
      }
    },
    name,
    callback
  ) => validity.valid && callback(name, file);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validateSchema}>
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor={header.id}>{header.label}</label>
            <input
              id={header.id}
              placeholder={header.description}
              type={header.type}
              value={values.header}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.header && touched.header && (
              <div className='input-feedback'>{errors.header}</div>
            )}

            <label htmlFor={subHeader.id}>{subHeader.label}</label>
            <input
              id={subHeader.id}
              placeholder={subHeader.description}
              type={subHeader.type}
              value={values.subHeader}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.subHeader && touched.subHeader && (
              <div className='input-feedback'>{errors.subHeader}</div>
            )}

            <label htmlFor={logo.id}>{logo.label}</label>
            <input
              id={logo.id}
              name={logo.name}
              type={logo.type}
              onChange={event => handleChangeFile(event, logo.name, setFieldValue)}
            />
            {errors[logo.name] && values[logo.name] != null && (
              <div className='input-feedback'>{errors[logo.name]}</div>
            )}

            <button type='submit' disabled={!(dirty && isEmpty(errors)) || isSubmitting}>
              Submit
            </button>
            <DisplayFormikState {...props} />
          </form>
        );
      }}
    </Formik>
  );
};

export default CreateArticleView;

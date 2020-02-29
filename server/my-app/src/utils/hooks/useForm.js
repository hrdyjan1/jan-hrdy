import { useState } from 'react';
import { useMutation } from 'react-apollo';

const useForm = (mutation, update, initialState = {}) => {
  const [errors, setError] = useState({});
  const [values, setValues] = useState(initialState);
  const onError = err => {
    setError(err.graphQLErrors[0].extensions.exception.errors);
  };

  const [callback, { loading }] = useMutation(mutation, {
    update,
    onError,
    variables: values
  });

  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
    loading,
    errors
  };
};

export default useForm;

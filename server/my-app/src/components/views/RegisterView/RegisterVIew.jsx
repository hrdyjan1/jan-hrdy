import React, { useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../../utils/hooks';
import { AuthContext } from '../../../contexts';

const initialRegisterValues = {
  username: '',
  password: '',
  confirmPassword: '',
  email: ''
};

const RegisterView = () => {
  const history = useHistory();
  const { login } = useContext(AuthContext);
  const registrationCallback = (_, result) => {
      login(result.data.register)
      history.push('/');
  }
  const { onChange, onSubmit, values, loading, errors } = useForm(
    REGISTER_USER,
    registrationCallback,
    initialRegisterValues
  );

  return (
    <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label='Username'
          placeholder='Username..'
          name='username'
          type='text'
          value={values.username}
          error={!!errors.username}
          onChange={onChange}
        />
        <Form.Input
          label='Email'
          placeholder='Email..'
          name='email'
          type='email'
          value={values.email}
          error={!!errors.email}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password..'
          name='password'
          type='password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password..'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    register(
      registerUser: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
        id email username createdAt token
    }
  }
`;

export default RegisterView;

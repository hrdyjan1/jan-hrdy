import React, { useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../../utils/hooks';
import { AuthContext } from '../../../contexts';

const initialLoginValues = {
  username: '',
  password: ''
};

const LoginView = () => {
  const history = useHistory();
  const { login } = useContext(AuthContext);
  const loginCallback = (_, result) => {
    login(result.data.login);
    history.push('/');
  };
  const { onChange, onSubmit, values, loading, errors } = useForm(
    LOGIN_USER,
    loginCallback,
    initialLoginValues
  );

  return (
    <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
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
          label='Password'
          placeholder='Password..'
          name='password'
          type='password'
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Login
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(loginUser: { username: $username, password: $password }) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default LoginView;

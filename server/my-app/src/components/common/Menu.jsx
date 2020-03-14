import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext, AuthContext } from '../../contexts';

const Login = () => {
  return (
    <>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
    </>
  );
};

const Logout = () => {
  const { logout } = useContext(AuthContext);
  return (
    <li>
        <button onClick={logout}>Logout</button>
    </li>
  );
};

const Menu = () => {
  const user = useContext(UserContext);
  return (
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      {user ? <Logout /> : <Login />}
      <li>
        <Link to='/open-minded'>Open Minded</Link>
      </li>
      <li>
        <Link to='/create-article'>Create Article</Link>
      </li>
      <li>
        <Link to='/will-not-match'>Will Not Match</Link>
      </li>
      <li>
        <Link to='/login'>Will Not Match</Link>
      </li>
      <li>
        <Link to='/also/will/not/match'>Also Will Not Match</Link>
      </li>
    </ul>
  );
};

export default Menu;

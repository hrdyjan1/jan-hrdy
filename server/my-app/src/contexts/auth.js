import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const TYPES = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};

const initialState = {
  user: null
};

// Check localstorage
if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

// Created contexts
const AuthContext = createContext({
  login: userData => {},
  logout: () => {}
});

const UserContext = createContext({
  user: null
});

function authReducer(state, { type, payload }) {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      throw new Error(type);
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const user = state.user;

  function login(userData) {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: TYPES.LOGIN,
      payload: userData
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: TYPES.LOGOUT });
  }

  return (
    <AuthContext.Provider value={{ login, logout }}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </AuthContext.Provider>
  );
}

export { AuthContext, UserContext, AuthProvider };

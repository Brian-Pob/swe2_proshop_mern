import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const LoginScreen = ({ location, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { loginWithRedirect } = useAuth0();

  const redirect = location.search ? location.search.split('=')[1] : '/';
  if (!redirect) {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin + '/callback',
      },
    });
  }
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    } else {
      loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.location.origin + '/callback',
        },
      });
    }
  }, [history, userInfo, redirect]);

  return <>Redirecting to auth0...</>;
};

export default LoginScreen;

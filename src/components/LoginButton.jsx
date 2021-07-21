import React from "react";
import Button from 'react-bootstrap/Button';
import {useAuth0} from "@auth0/auth0-react";

const LoginButton = () => {

  const {loginWithRedirect} = useAuth0();

  return (
    <Button
      id='login-btn'
      variant='primary'
      className='btn-margin'
      onClick={() => loginWithRedirect()}>Log In</Button>
  );
  
};

export default LoginButton;
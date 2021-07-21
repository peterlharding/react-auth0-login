import React from "react";
import Button from 'react-bootstrap/Button';
import {useAuth0} from "@auth0/auth0-react";

const LogoutButton = () => {

  const {logout} = useAuth0();

  return (
    <Button
      id='logout-btn'
      variant='danger'
      className='btn-margin'
      onClick={() => logout()}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
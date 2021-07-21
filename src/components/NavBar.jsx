import React from "react";
import {NavLink as RouterNavLink } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {useAuth0} from "@auth0/auth0-react";

import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

const ShowProfile = () => {

  const {isAuthenticated} = useAuth0();

  if (isAuthenticated) {
    return (
        <Nav.Link
          as={RouterNavLink}
          to="/profile"
          exact
          activeClassName="router-link-exact-active"
        >
          Profile
        </Nav.Link>
      );
  } else {
    return (<></>);
  }
}

const MainNav = () => (

  <Nav className="mr-auto">
    <Nav.Link
      as={RouterNavLink}
      to="/"
      exact
      activeClassName="router-link-exact-active"
    >
      Home
    </Nav.Link>

    {ShowProfile()}

    <Nav.Link
      as={RouterNavLink}
      to="/external-api"
      exact
      activeClassName="router-link-exact-active"
    >
      External API
    </Nav.Link>
  </Nav>
);


const AuthNav = () => {

  const {isAuthenticated} = useAuth0();

  return (
    <Nav className='justify-content-end'>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </Nav>
  )
};

const NavBar = () => {


  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand as={RouterNavLink} className="logo" to="/" />
        <MainNav />
        <AuthNav />
      </Container>
    </Navbar>
  );
};

export default NavBar;

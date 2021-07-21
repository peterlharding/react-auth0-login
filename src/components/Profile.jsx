import React from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {useAuth0} from "@auth0/auth0-react";

import Highlight from "../components/Highlight";

const Profile = () => {

  const {user, isAuthenticated, isLoading} = useAuth0();

  if (!isAuthenticated) {
    return (
      <>
        <h1>Profile</h1>
        <p><strong>This information is private</strong></p>
        <p>Not authenticated!</p>
      </>

    );
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Container className='mb-5'>
      <h1>Profile</h1>
      <p><strong>This route will only show private information when authenticated</strong></p>
      <Row className='aligh-items-center profile-header mb-5 text-center text-md-left'>
        <Col md={2}>
        <img
          className='rounded-circle img-fluid profile-picture mb-3 mb-md-0'
          src={user.picture}
          alt={user.name} />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
        </Row>
    </Container>

  );
};

export default Profile;
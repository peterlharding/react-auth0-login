/*jshint esversion: 11 */

import React, { useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import {withAuthenticationRequired, useAuth0} from "@auth0/auth0-react";

import Highlight from '../components/Highlight';
import Loading from '../components/Loading';

import {API_PORT} from '../localization';

export const ExternalApi = () => {

  const {getAccessTokenSilently} = useAuth0();

  const [message, setMessage] = useState('');

  const callApi = async () => {
    try {
      const response = await fetch(`http://localhost:${API_PORT}/api/public-message`);

      const responseData = await response.json()

      console.log('responseData |' + JSON.stringify(responseData) + '|');

      setMessage(responseData);

    } catch (error) {
      setMessage(error);
    }
  };

  const callSecureApi = async () => {
    try {

      const token = await getAccessTokenSilently();

      console.log(JSON.stringify(token));

      const response = await fetch(`http://localhost:${API_PORT}/api/private-message`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await response.json()

      console.log('responseData |' + JSON.stringify(responseData) + '|');

      setMessage(responseData);

    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <Container className='mb-5'>
      <h1>External API</h1>
      <p>
        You use will use a button to call an external API using an access token,
        and the API will validate it using the API's audience value.{' '}
        <strong>This route should be private</strong>.
      </p>
      <ButtonGroup>
        <Button color='primary' className='mt-5' style={{margin: '10px', padding:'10px'}} onClick={() => callApi()}>
          Get Public Message
        </Button>
        {'  '}
        <Button color='primary' className='mt-5' style={{margin: '10px', padding:'10px'}} onClick={() => callSecureApi()}>
          Get Private Message
        </Button>
      </ButtonGroup>

      {message && (
        <div className='mt-5'>
          <h6 className='muted'>Result</h6>
          <Highlight language='json'>
            {JSON.stringify(message, null, 2)}
          </Highlight>
        </div>
      )}
    </Container>
  );
};

export default withAuthenticationRequired(ExternalApi, {
  onRedirecting: () => <Loading />
});

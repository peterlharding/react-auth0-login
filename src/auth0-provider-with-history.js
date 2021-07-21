/*jshint esversion: 11 */

import {useHistory} from  'react-router-dom';
import {Auth0Provider} from "@auth0/auth0-react";
import {REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID} from './localization';

const Auth0ProviderWithHistory = ({children}) => {

  const history = useHistory();
  
  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  }

  return (
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN}
      clientId={REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );

};

export default Auth0ProviderWithHistory;

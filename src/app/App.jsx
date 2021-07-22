import React from "react";
import {Route, Switch} from "react-router-dom";
import {Container} from "react-bootstrap";

import {useAuth0} from "@auth0/auth0-react";

import 'bootstrap/dist/css/bootstrap.min.css';

import {NavBar, Footer} from "../components";
import {Home, ExternalApi} from "../views";
import Loading from '../components/Loading';
import Profile from '../components/Profile';

import ProtectedRoute from '../auth/protected-route';

import "./app.css";

const App = () => {

  const {isLoading} = useAuth0();

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/external-api" component={ExternalApi} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );

}

export default App;

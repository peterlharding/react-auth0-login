import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Auth0ProviderWithHistory from "./auth0-provider-with-history";

import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./app/App";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

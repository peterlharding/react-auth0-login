/*jshint esversion: 11 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const {resolve} = require('path');


require('dotenv').config({
  path: resolve(process.cwd(), 'src', 'server', '.env'),
});

const app = express();

// const api= require('../api-localization');

// const port      = api.API_PORT;
// const appOrigin = api.APP_ORIGIN;
// const audience  = api.AUTH0_AUDIENCE;
// const issuer    = api.AUTH0_ISSUER;

const port      = process.env.API_PORT;
const appOrigin = process.env.APP_ORIGIN;
const audience  = process.env.AUTH0_AUDIENCE;
const issuer    = process.env.AUTH0_ISSUER;

if (!issuer || !audience) {
  throw new Error('Please make sure that .env is in place and populated');
}

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuer}.well-known/jwks.json`,
  }),

  audience: audience,
  issuer: issuer,
  algorithms: ['RS256'],
});

app.get('/api/public-message', (req, res) => {
  res.send({
    message: 'The API does not require an access token to share this message.'
  });
});

app.get('/api/private-message', checkJwt, (req, res) => {
  res.send({
    message: 'The API successfully validated your access token.',
  });
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));

const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const mailRoute = require('./mails.route');
const docsRoute = require('./docs.route');
const filesRoute = require('./files.route');
const config = require('../../config/config');
const mailingRoutes = require('./mailing.route')
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/clients',
    route: mailRoute,
  },
  {
    path: '/files',
    route: filesRoute,
  },
  {
    path: '/sendMails',
    route: mailingRoutes,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

const express = require('express');


const userRoutes = require('../modules/User/user.route');
const carRoutes = require('../modules/Car/car.route');

const router = express.Router();


const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/cars',
    route: carRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
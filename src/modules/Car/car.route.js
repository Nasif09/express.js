const express = require('express');
const { addCar, allCar } = require('./car.controller');
const isLogin = require('../../middlewares/isLogin');

const router = express.Router();

router.post('/addcar',isLogin , addCar);
router.get('/allCar' , allCar);




module.exports = router;
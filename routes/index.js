const express = require('express');
const router = express.Router();
const APIController = require('../src/apis/controllers');

router.get('/', function (req, res, next) {
  res.json({ succes: true, message: 'Welcome Dating App APIs' });
});

router.get('/all-users', APIController.getAllUsers);

router.post('/login', APIController.login);

router.post('/register', APIController.register);

router.get('/matching-users-city', APIController.matchingByCity);

router.get('/matching-users-gender', APIController.matchingByGender);

module.exports = router;

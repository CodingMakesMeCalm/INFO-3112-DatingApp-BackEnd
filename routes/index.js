const express = require('express');
const router = express.Router();
const APIController = require('../src/apis/controllers');

router.get('/', function (req, res, next) {
  res.json({ succes: true, message: 'Welcome Dating App APIs' });
});

router.get('/all-users', APIController.getAllUsers);
router.post('/login', APIController.login);
router.post('/register', APIController.register);
router.put('/update-user', APIController.update);
router.get('/matching-users-city/:city', APIController.matchingByCity);
router.get('/matching-users-gender/:gender', APIController.matchingByGender);
router.get('/all-posts', APIController.getAllPosts);
router.post('/new-post', APIController.newPost);
router.get('/personal-message/:userId', APIController.getPersonalMessage);
router.put('/set-message-read', APIController.setPersonalMessageRead);
router.post('/new-message', APIController.newMessage);
router.get('/get-lat-lng', APIController.getLondonLatLng);

module.exports = router;

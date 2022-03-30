const express = require('express');
const router = express.Router()

const AuthController = require('../Controllers/AuthController');


router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/frdzrequest', AuthController.friendrequest)
router.post('/deleteFriend', AuthController.deleteFriend)
router.post('/AddPost', AuthController.addPost)
router.post('/deletePost', AuthController.deletePost)
router.get('/Friendlist', AuthController.Friendlist)
router.post('/userProfile', AuthController.userProfile)
module.exports = router;




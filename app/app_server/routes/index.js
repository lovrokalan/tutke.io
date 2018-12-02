var express = require('express');
var router = express.Router();

var ctrlIndex = require('../controllers/index');
var ctrlLogIn = require('../controllers/log-in');
var ctrlSignUp = require('../controllers/sign-up');
var ctrlUsersProfile = require('../controllers/user-profile');
var ctrlMyAccount = require('../controllers/my-account');

/* Index page routes. */
router.get('/', ctrlIndex.index);
router.post('/', ctrlIndex.index);

/* Log In page routes.*/
router.get('/login', ctrlLogIn.renderLogIn);
router.post('/login', ctrlLogIn.logIn);

/* Sign Up page routes.*/
router.get('/signUp', ctrlSignUp.signUpRender);
router.post('/signUp', ctrlSignUp.signUp);

/* Users profile routes */
router.get('/user/:userId', ctrlUsersProfile.userProfile);

/* My account routes */
router.get('/account', ctrlMyAccount.myAccount);



module.exports = router;

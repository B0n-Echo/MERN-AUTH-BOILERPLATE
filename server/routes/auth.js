const express = require('express');
const router = express.Router();
const { signup, accountActivation } = require('../controllers/auth')

const {userSignupValidator} = require('../validators/authValidator');
const {runValidation} = require('../validators');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation)

module.exports = router;
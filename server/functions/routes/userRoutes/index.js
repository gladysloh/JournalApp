const express = require('express')
const router = express.Router()
const firebaseAuth = require('../middleware/firebase-auth')
const editprofile = require('./editprofile')
const validate = require('../util/validate')

router.post('/login', validate, require('./login'))
router.post('/editprofile', firebaseAuth, editprofile)
router.get('/getuser', firebaseAuth, require('./get-user'))
router.post('/register', validate, require('./register'))
router.post('/googlesignin', require('./googlesignup'))


module.exports = router
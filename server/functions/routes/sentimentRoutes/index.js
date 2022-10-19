const express = require('express')
const router = express.Router()
const firebaseAuth = require('../middleware/firebase-auth')

router.post('/sentimentanalyzer', require('./sentimentAnalyzer'))
router.post('/justsentiment', firebaseAuth, require('./justsentiment'))
router.post('/monthlymood', firebaseAuth, require('./monthlymood'))
router.post('/wordcloud', firebaseAuth, require('./wordcloud'))


module.exports = router
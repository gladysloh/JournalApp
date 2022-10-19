const express = require('express')
const mainRouter = express.Router()

mainRouter.use('/user', require('./userRoutes'))
mainRouter.use('/journal', require('./jouralRoutes'))
mainRouter.use('/sentiment', require('./sentimentRoutes'))

module.exports = mainRouter

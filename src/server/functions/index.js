const functions = require("firebase-functions");
const express = require('express')
const session = require('express-session')
const admin = require('firebase-admin')
const validateEmailAndPassword = require('./routes/validate')
const firebaseConfig = { apiKey: "AIzaSyB5-qTKTZqSYmhnTvGo7xRp-tPgS8bqQ0s",
                            authDomain: "onceaday-48fb7.firebaseapp.com",
                            projectId: "onceaday-48fb7",
                            storageBucket: "onceaday-48fb7.appspot.com",
                            messagingSenderId: "1079672258338",
                            appId: "1:1079672258338:web:0659c5e7f2974ed80a2f7b"
}
const { initializeApp } = require('firebase/app')
const serviceAccount = require('../serviceAccountKey.json')
const cors = require('cors')
const morgan = require('morgan');
const cookieparser = require('cookie-parser')
const bodyparser = require('body-parser')

const { Firestore } = require('@google-cloud/firestore')
const { FirestoreStore } = require('@google-cloud/connect-firestore')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "onceaday-48fb7.appspot.com"
})
initializeApp(firebaseConfig)

const register = require('./routes/register')
const login = require('./routes/login')
const firebaseAuth = require('./routes/firebase-auth')
const getUser = require('./routes/get-user')
const googlesignin = require('./routes/googlesignup');
const createjournal = require("./routes/createjournal");
const getalljournal = require('./routes/getalljournal');
const getRandomQuestion = require("./routes/getrandomquestion");
const editjournal = require('./routes/editjournal')
const logout = require('./routes/logout')
const sentimentAnalyzer = require('./routes/sentimentAnalyzer');
const googlelogin = require("./routes/googlesignup");
const app = express()
app.use(session({
    store: new FirestoreStore({
        dataset: new Firestore(),
        kind: 'express-sessions'
    }),
    saveUninitialized: true,
    resave: false,
    secret: 'ilovecat',
    cookie: { 
        secure: false,            //setting this false for http connections
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000) 
    }
}))//what the fuck
app.use(cors({
    credentials: true,
    origin: "http://localhost:8100"
  }));
//app.use(morgan('dev'))
app.use(cookieparser())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))


app.post('/login', validateEmailAndPassword, login)
app.post('/register', validateEmailAndPassword, register)
app.get('/getuser', firebaseAuth, getUser)
app.post('/createjournal', firebaseAuth, createjournal)
app.get('/getrandomquestion', getRandomQuestion)
app.get('/getalljournals', firebaseAuth, getalljournal)
app.post('/editjournal', firebaseAuth, editjournal)
app.post('/logout', logout)
app.get('/randomq', getRandomQuestion)
app.post('/sentimentanalyzer', sentimentAnalyzer)
app.post('/googlelogin', googlelogin)
// app.get('/googlesignin', googlesignin)
exports.api = functions.https.onRequest(app);


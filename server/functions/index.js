

const functions = require("firebase-functions");
const express = require('express')
const session = require('express-session')
const admin = require('firebase-admin')
//const validateEmailAndPassword = require('./routes/util/validate')
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

const app = express()
// app.use(session({
//     store: new FirestoreStore({
//         dataset: new Firestore(),
//         kind: 'express-sessions'
//     }),
//     saveUninitialized: true,
//     resave: false,
//     secret: 'ilovecat',
//     cookie: { 
//         secure: false,            //setting this false for http connections
//         maxAge: 3600000,
//         expires: new Date(Date.now() + 3600000) 
//     }
// }))
app.use(cors({
    // origin: true,
    credentials: true,
    origin: "http://localhost:8100"
  }));
//app.use(morgan('dev'))
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.use(cookieparser())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

const routes = require('./routes')
app.use('/', routes)
// app.get('/googlesignin', googlesignin)
exports.api = functions.https.onRequest(app);
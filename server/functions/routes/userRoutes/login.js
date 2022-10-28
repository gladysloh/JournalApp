const {
    getAuth: getClientAuth,
    signInWithEmailAndPassword,
    //currentUser
} = require('firebase/auth')
const admin = require('firebase-admin')
const {
    getAuth
} = require('firebase-admin/auth')
//const fb = require('firebase')

const {
    getAdminAuth: getAdminAuth
} = require('firebase-admin/auth');
const {
    auth
} = require('firebase-admin');
const firestore = require('firebase-admin').firestore()


async function login(req, res) {
    const {
        email,
        password
    } = req.body;
    try {
        const credential = await signInWithEmailAndPassword(
            getClientAuth(),
            email,
            password
        );


        await credential.user.getIdToken().then((token) => {
            console.log(token)
            // getSessionCookie(token, req, res);
            res.cookie('auth_token', token).status(201).json({
                success: true,
                displayName: credential.user.displayName,
                uid: credential.user.uid,
                idToken: token
            })

        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            error: error
        })
    }
}

async function getSessionCookie(token, req, res){
     // Set session expiration to 5 days.
     const expiresIn = 60 * 60 * 24 * 5 * 1000;
     // Create the session cookie. This will also verify the ID token in the process.
     // The session cookie will have the same claims as the ID token.
     // To only allow session cookie setting on recent sign-in, auth_time in ID token
     // can be checked to ensure user was recently signed in before creating a session cookie.
     await getAuth()
         .createSessionCookie(token, {
             expiresIn
         })
         .then(
             (sessionCookie) => {
                 console.log("session cookie: ", sessionCookie)
                 // Set cookie policy for session cookie.
                 const options = {
                     maxAge: expiresIn,
                     httpOnly: true,
                     secure: true
                 };
                 
                 res.cookie('session', sessionCookie, options);
                 res.end(JSON.stringify({
                     status: 'success',
                 //     success: true,
                 //     displayName: credential.user.displayName,
                 //     uid: credential.user.uid
                 }));
             },
             (error) => {
                 res.status(401).send('UNAUTHORIZED REQUEST!');
             }
         );
}
module.exports = login
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
            res.cookie('auth_token', token).status(201).json({
                success: true,
                displayName: credential.user.displayName,
                uid: credential.user.uid
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
module.exports = login
const {
    getAuth: getClientAuth,
    signInWithEmailAndPassword,    
    //currentUser
} = require('firebase/auth')
const admin = require('firebase-admin')
const { getAuth } = require('firebase-admin/auth')
//const fb = require('firebase')

const {
    getAdminAuth: getAdminAuth
} = require('firebase-admin/auth');
const { auth } = require('firebase-admin');
const firestore = require('firebase-admin').firestore()


async function login(req, res) {
    const {email, password} = req.body;
    try {
        //console.log(admin.auth().createSessionCookie(credential))
        const credential = await signInWithEmailAndPassword(
            getClientAuth(),
            email,
            password
        );
        //console.log(credential)
        //const idToken = credential._tokenResponse.idToken
        //getAuth().updateUser
        req.session.uid = credential.user.uid
        req.session.save()
        //console.log(req.session)

        console.log(credential.user)
        return res.status(200).json({ 
            success: true,
            displayname: credential.user.displayName,
            uid: credential.user.uid
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            error: error
        })
    }
}
module.exports = login
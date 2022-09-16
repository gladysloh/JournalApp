const {
    getAuth: getClientAuth,
    signInWithEmailAndPassword,
    setPersistence,
    
    //currentUser
} = require('firebase/auth')
const admin = require('firebase-admin')
const { getAuth } = require('firebase-admin/auth')
//const fb = require('firebase')

const {
    getAdminAuth: getAdminAuth
} = require('firebase-admin/auth');
const { auth } = require('firebase-admin');

async function login(req, res) {
    const {email, password} = req.body;
    try {
        //console.log(admin.auth().createSessionCookie(credential))
        const credential = await signInWithEmailAndPassword(
            getClientAuth(),
            email,
            password
        );
        console.log(credential)
        const idToken = credential._tokenResponse.idToken
        
        req.session.uid = credential.user.uid
        req.session.save()
        console.log(req.session)

        console.log(credential.user.displayName)
        res.status(200).json({ 
            success: true,
            displayname: credential.user.displayname,
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
const {
    //getAuth: getClientAuth,
    createUserWithEmailAndPassword,
    getAuth
} = require('firebase/auth')

const {
    getAuth: getAdminAuth
} = require('firebase-admin/auth')

const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')
const bucket = admin.storage().bucket()

async function register(req, res) {
    const {email, password, displayName} = req.body;
    if (!email || !password || !displayName){
        return res.status(400).json({ "success": false,
                                      "message": "empty field"  
                                        })
    }
    //console.log(displayname)

    try {
        const auth = getAuth()
        const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
            displayName
        );
        //console.log(auth)
        try {
            await admin.auth().updateUser(credential.user.uid, {
                displayname: displayName
            })
            await firestore.collection('users').doc(credential.user.uid).set({
                displayName: displayName
            })
        } catch(err){
            console.log(err)
            return res.status(400).json({
                success: false,
                error: err.message
            })
        }
        await credential.user.getIdToken().then((token) => {
            res.cookie('auth_token', token).status(201).json({
                success: true,
                displayname: displayName,
                uid: credential.user.uid
            })
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }
}

module.exports = register
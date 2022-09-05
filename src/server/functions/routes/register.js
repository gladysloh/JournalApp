const {
    getAuth,
    createUserWithEmailAndPassword
} = require('firebase/auth')

const {
    getAuth: getAdminAuth
} = require('firebase-admin/auth')

const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')
const bucket = admin.storage().bucket()

async function register(req, res) {
    const {email, password, displayname} = req.body;
    if (!email || !password || !displayname){
        return res.status(400).json({ "success": false,
                                      "message": "empty field"  
                                        })
    }


    try {
        const auth = getAuth()
        const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const adminAuth = getAdminAuth()
        // const token = await adminAuth.createCustomToken(
        //     credential.user.uid
        // );
        try {
            await firestore 
                .doc(`users/${credential.user.uid}`)
                .set({ displayname });
        } catch(err){
            res.status(400).json({
                success: false,
                error: err
            })
        }
        req.session.uid = credential.user.uid
        req.session.save()
        res.status(200).json({
            success: true,
            displayname: credential.user.displayName
        })
        //res.cookie('x_auth', credential._tokenResponse.idToken).status(201).json({ registerSuccess: true })
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }
}

module.exports = register
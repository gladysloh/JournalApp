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
        return res.status(400).json({ "registerSuccess": false,
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
                error: err
            })
        }
        req.session.uid = credential.user.uid
        req.session.save()
        res.status(200).json({
            createsuccess: true
        })
        //res.cookie('x_auth', credential._tokenResponse.idToken).status(201).json({ registerSuccess: true })
    } catch (err) {
        console.log(err)
        const { code } = err;
        if (code == 'auth/email-already-in-use'){
            res.status(400);
        } else {
            res.status(500);
        }
        res.json({
            error: {
                code: code ? code.replace('auth/', '') : undefined
            }
        })
    }
}

module.exports = register
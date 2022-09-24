const {getAuth} = require('firebase-admin/auth');
const admin = require('firebase-admin')

async function checkauthenticated(req, res, next){
    let token = req.cookies['auth_token']
    console.log(token)
    admin.auth().verifyIdToken(token).then((decodedtoken) => {
        const uid = decodedtoken.uid
        req.body.uid = uid
        next()
    }).catch((error) => {
        return res.status(401).json({
            success: false,
            error: 'unauthenticated'
        })
    })
}

module.exports = checkauthenticated
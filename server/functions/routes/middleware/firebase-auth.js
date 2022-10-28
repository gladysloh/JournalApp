const {
    getAuth
} = require('firebase-admin/auth');
const admin = require('firebase-admin')

async function checkauthenticated(req, res, next) {
    console.log('withinauth!')
    let token = req.cookies['auth_token'] || ''
    console.log(token)
    console.log(req.cookies)

    admin.auth().verifyIdToken(token).then((decodedtoken) => {
        const uid = decodedtoken.uid
        req.body.uid = uid
        console.log(req.body.uid)
        next()
    }).catch((error) => {
        return res.status(401).json({
            success: false,
            error: 'unauthenticated'
        })
    }) //test

    // const sessionCookie = req.cookies.session || '';
    // console.log("session cookies:  ", sessionCookie)
    // // Verify the session cookie. In this case an additional check is added to detect
    // // if the user's Firebase session was revoked, user deleted/disabled, etc.
    // getAuth()
    //     .verifySessionCookie(sessionCookie, true /** checkRevoked */ )
    //     .then((decodedClaims) => {
    //         const uid = decodedClaims.uid
    //         req.body.uid = uid
    //         console.log(req.body.uid)
    //         next()
    //     })
    //     .catch((error) => {
    //         // Session cookie is unavailable or invalid. Force user to login.
    //         return res.status(401).json({
    //             success: false,
    //             error: 'unauthenticated'
    //         })
    //     });
}

module.exports = checkauthenticated
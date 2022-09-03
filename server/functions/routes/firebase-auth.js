const {getAuth} = require('firebase-admin/auth');


async function checkauthenticated(req, res, next){
    // console.log('within auth')
    // const regex = /Bearer (.+)/i
    // try {
    //     const idToken = req.cookies.x_auth//.match(regex)?.[1];
    //     //console.log(idToken)
    //     // const idToken = req.cookies.x_auth
    //     await getAuth().verifyIdToken(idToken).then((decodedToken) => {
    //         //console.log(decodedToken)
    //         req.token = decodedToken;
    //         console.log(req.token.uid)
    //     })
    //     //console.log('decoded attached')
    
    //     console.log(req.token)
    //     console.log('authenticated')
    //     next()
    // } catch (err) {
    //     console.log(err)
    //     res.status(401).json({ error: {code: 'unauthenticated'}})
    // }
    if (!req.session.uid){
        return res.status(400).json({
            message: "unauthenticated"
        })
    }
    next()
}

module.exports = checkauthenticated
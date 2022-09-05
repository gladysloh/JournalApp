const {getAuth} = require('firebase-admin/auth');


async function checkauthenticated(req, res, next){
   
    if (!req.session.uid){
        return res.status(400).json({
            error: "unauthenticated"
        })
    }
    next()
}

module.exports = checkauthenticated
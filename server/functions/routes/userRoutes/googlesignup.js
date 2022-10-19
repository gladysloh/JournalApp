const admin = require('firebase-admin')
const firestore = require('firebase-admin').firestore()


async function googlelogin(req, res){
    if (!req.body.displayName || !req.body.uid){
        return res.status(400).json({
            success: false,
            error: "no displayName"
        })
    } 

    try {
        await admin.auth().updateUser(req.body.uid, {
            displayName: req.body.displayName
        })
    } catch (err){
        return res.status(400).json({
            success: false,
            displayName: req.body.displayName
        })
    }
}

module.exports = googlelogin
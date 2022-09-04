
const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')
const uploadimage = require('./uploadimage')
require('firebase/storage')
const bucket = admin.storage().bucket()
global.XMLHttpRequest = require('xhr2')

async function createjournal(req, res) {
    const uid = req.session.uid
    if (req.body.image){
        var temp = await uploadimage(req.body.image, uid)
        console.log(temp)
        temp = JSON.parse(temp)
        const signedUrl = temp.signedUrl
        const filename = temp.fileName
        var fields = {
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            body: req.body.journal,
            url: signedUrl,
            filename: filename
        }
    } else {
        fields = {
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            body: req.body.journal
        }
    }


    await firestore.doc(`users/${uid}`).collection('journal').add({
        fields
    }, err => {
        res.status(400).json({ success: false,
                               error: err                            
        })
    })
    return res.status(200).json({ success: true })
}

module.exports = createjournal


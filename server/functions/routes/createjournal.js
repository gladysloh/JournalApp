
const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')
const uploadimage = require('./uploadimage')
require('firebase/storage')
const bucket = admin.storage().bucket()
global.XMLHttpRequest = require('xhr2')

async function createjournal(req, res) {
    console.log('whats in the session', req.session.uid)
    const uid = req.session.uid
    console.log(req.body.image)
    if (req.body.image){
        console.log('entered upload')
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
        console.log('not uploading')
        fields = {
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            body: req.body.journal
        }
    }

    //console.log('upload complete')
    //console.log(signedUrl)
    await firestore.doc(`users/${uid}`).collection('journal').add({
        fields
    }, err => {
        console.log(err)
        res.status(400).json({ createSuccess: false})
    })
    return res.status(200).json({ createSuccess: true})
}

module.exports = createjournal


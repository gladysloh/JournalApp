
const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')
const uploadimage = require('./uploadimage')
require('firebase/storage')
const bucket = admin.storage().bucket()
global.XMLHttpRequest = require('xhr2')

async function createjournal(req, res) {
    const uid = req.body.uid
    if (!req.body.title || !req.body.journal){
            return res.status(400).json({
            success: false,
            error: "empty field(s)"
        })
    }
    try {
        if (req.body.image){
            var temp = await uploadimage(req.body.image, uid)
            console.log(temp)
            temp = JSON.parse(temp)
            const signedUrl = temp.signedUrl
            const filename = temp.fileName
            var fields = {
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                title: req.body.title,
                body: req.body.journal,
                url: signedUrl,
                filename: filename
            }
        } else {
            fields = {
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                title: req.body.title,
                body: req.body.journal
            }
        }
    } catch (err){
        return res.status(400).json({
            success: false,
            error: err
        })
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

// add title to journal
// add page feature to the journal query
// 
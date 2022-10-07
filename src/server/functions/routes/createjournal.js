const firestore = require('firebase-admin').firestore()
const e = require('express')
const admin = require('firebase-admin')
const uploadimage = require('./uploadimage')
require('firebase/storage')
const bucket = admin.storage().bucket()
global.XMLHttpRequest = require('xhr2')

async function createjournal(req, res) {
    const uid = req.body.uid
    if (!req.body.title || !req.body.journal) {
        return res.status(400).json({
            success: false,
            error: "empty field(s)"
        })
    }
    try { //if there is an image attached, else no image attached
        fields = {
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            title: req.body.title,
            body: req.body.journal,
            sentiment: req.body.sentiment
        }
        if (req.body.image) {
            var temp = await uploadimage(req.body.image, uid)
            temp = JSON.parse(temp)
            const signedUrl = temp.signedUrl
            const filename = temp.fileName
            fields.filename = filename
            fields.url = signedUrl
        } else {
            fields = {
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                title: req.body.title,
                body: req.body.journal,
                sentiment: req.body.sentiment
            }
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }


    await firestore.doc(`users/${uid}`).collection('journal').add({
        fields
    }).then(function (docRef) {
        return res.status(200).json({
            success: true,
            fields,
            id: docRef.id
        })
    }).catch(function (err) {
        return res.status(400).json({
            success: false,
            error: err
        })
    })
}

module.exports = createjournal

// add title to journal
// add page feature to the journal query
// 
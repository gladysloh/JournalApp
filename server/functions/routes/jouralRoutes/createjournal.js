const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')
const uploadimage = require('../util/uploadimage')
require('firebase/storage')
const bucket = admin.storage().bucket()
// const JournalEntry = require('../../../model/journalEntry')
global.XMLHttpRequest = require('xhr2')

async function createjournal(req, res) {
    const uid = req.body.uid
    if (!req.body.title || !req.body.journal) {
        return res.status(400).json({
            success: false,
            error: "empty field(s)"
        })
    }

    //check if a journal already exists TODAY
    try {
        const snapshot = (await firestore.collection('users').doc(uid).collection('journal').orderBy('createdTimestamp', 'desc').limit(1).get()).docs[0]
        if (snapshot.exists){
            const date = new Date(snapshot.data().createdTimestamp._seconds * 1000 + 8 * 60 * 60 * 1000)
            const currentDate = new Date()
            currentDate.setTime(currentDate.getTime() + 8 * 60 * 60 * 1000)
            if (date.getDate() == currentDate.getDate()){
                return res.status(400).json({
                    success: false,
                    message: 'journal already exists today'
                })
            }
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'error while checking if journal exists today'
        })
    }

    fields = {
        createdTimestamp: admin.firestore.FieldValue.serverTimestamp(),
        title: req.body.title,
        body: req.body.journal,
        sentiment: req.body.sentiment
    }
    try { //if there is an image attached, else no image attached
        if (req.body.image) {
            var temp = await uploadimage(req.body.image, uid)
            temp = JSON.parse(temp)
            const signedUrl = temp.signedUrl
            const filename = temp.fileName
            fields.filename = filename
            fields.url = signedUrl
        } 
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
    // const entries = JSON.stringify(fields)


    await firestore.doc(`users/${uid}`).collection('journal').add(
        fields
    ).then(function (docRef) {
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
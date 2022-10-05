
const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')
const uploadimage = require('./uploadimage')
const bucket = admin.storage().bucket()
const storage = admin.storage()


async function editjournal(req, res){
    const uid = req.body.uid
    const journalid = req.body.journalid
    const newbody = req.body.newbody
    const newtitle = req.body.newtitle
    const sentiment = req.body.sentiment
    let imageexists = true
    //the following try-catch block is to check if the journal of concern already has an image, sets imageexists boolean to true or false
    try {
        const snapshot = await firestore
            .collection('users')
            .doc(uid)
            .collection('journal')
            .doc(journalid)
            .get()
        console.log(snapshot.get('fields.url'))
        if(snapshot.get('fields.url')) {
            imageexists = true
        } else {
            imageexists = false
        }
    } catch (err) {
        console.log('caught an error')
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
    console.log(imageexists)

    //assumed all paths update text, differentiating factor is whether there is new image
    if (req.body.newimage){ //update image
        var filename = req.body.filename
        if (imageexists) {
            try {
                await bucket.file(`post-images/${filename}`).delete()
            } catch (err){
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            }
        } 
        
        var temp = await uploadimage(req.body.newimage, uid)
        temp = JSON.parse(temp)
        const signedUrl = temp.signedUrl
        const newfilename = temp.fileName

        var fields = {
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            body: newbody,
            url: signedUrl,
            filename: newfilename,
            title: newtitle,
            sentiment: sentiment
        }

    }  else { //does not update image, journal entry with just the body
        fields = {
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            body: newbody,
            title: newtitle,
            sentiment: sentiment
        }
    }
    try {
        await firestore
        .collection('users')
        .doc(uid)
        .collection('journal')
        .doc(journalid)
        .update({
            fields
        })
        res.status(200).json({
            success: true,
            fields
        })
    } catch(err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

module.exports = editjournal
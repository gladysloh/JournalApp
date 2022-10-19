
const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')
const uploadimage = require('../util/uploadimage')
const bucket = admin.storage().bucket()


async function editjournal(req, res){
    const uid = req.body.uid
    const journalid = req.body.journalid
    const newbody = req.body.newbody
    const newtitle = req.body.newtitle
    const sentiment = req.body.sentiment
    let imageexists = true
    //check if + 2 days
    try {
        const snapshot = await firestore.collection('users').doc(uid).collection('journal').doc(journalid).get()
        console.log(snapshot.exists)
        if (snapshot.exists){
            const date = new Date(snapshot.data().createdTimestamp._seconds * 1000 + 8 * 60 * 60 * 1000)
            const currentDate = new Date()
            currentDate.setTime(currentDate.getTime() + 8 * 60 * 60 * 1000)
            const offsetTime = Math.abs(currentDate - date)
            const offset = Math.ceil(offsetTime/ (1000 * 60 * 60 * 24))
            if (offset >= 2){
                return res.status(400).json({
                    success: false,
                    message: 'cannot edit anymore, passed 2 days'
                })
            }
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'error while checking if journal was created within 2 days'
        })
    }

    //the following try-catch block is to check if the journal of concern already has an image, sets imageexists boolean to true or false
    try {
        const snapshot = await firestore
            .collection('users')
            .doc(uid)
            .collection('journal')
            .doc(journalid)
            .get()
        //fields.timestamp = snapshot.get('fields.timestamp')
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
    fields = {
        editTimestamp: admin.firestore.FieldValue.serverTimestamp(),
        body: newbody,
        title: newtitle,
        sentiment: sentiment
    }

    var filename = req.body.filename
    //assumed all paths update text, differentiating factor is whether there is new image
    if (req.body.newimage){ //update image
        //var filename = req.body.filename
        if (imageexists) { //if there already exists an image attached to the journal, delete it first
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
        fields.url = signedUrl
        fields.filename = newfilename
    }  else { //does not update image, journal entry with just the body
        if (imageexists) { //original post had an image, but the user did not include another image in the edit function
            try {
                await bucket.file(`post-images/${filename}`).delete()
            } catch (err){
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            }
        } 
    }
    console.log(fields)
    try {
        await firestore
        .collection('users')
        .doc(uid)
        .collection('journal')
        .doc(journalid)
        .update(
            fields
        )
        res.status(200).json({
            success: true,
            id: journalid,
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
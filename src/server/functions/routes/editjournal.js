
const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')
const uploadimage = require('./uploadimage')
const bucket = admin.storage().bucket()
const storage = admin.storage()
const { refFromURL } = require('firebase/storage')



async function editjournal(req, res){
    const uid = req.session.uid
    const journalid = req.body.journalid
    const newbody = req.body.newbody
    console.log(req.body.filename)
    //assumed all paths update text, differentiating factor is whether there is new image
    if (req.body.newimage){ //update image
        //const image = req.body.image
        var filename = req.body.filename
        //delete existing image from firestore first
        //filename = toString(filename).replace("%2F", "/")
        console.log(filename)
        await bucket.file(`post-images/${filename}`).delete((error) => {
            return res.status(400).json({
                message: 'failed to delete existing image'
            })
        })
        
        var temp = await uploadimage(req.body.newimage, uid)
        //console.log(temp)
        temp = JSON.parse(temp)
        const signedUrl = temp.signedUrl
        const newfilename = temp.fileName

        var fields = {
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            body: newbody,
            url: signedUrl,
            filename: newfilename
        }
        // await firestore.doc(`users/${uid}`).collection('journal').add({
        //     timestamp: admin.firestore.FieldValue.serverTimestamp(),
        //     body: req.body.journal,
        //     url: signedUrl
        // }, err => {
        //     console.log(err)
        //     res.status(400).json({ createSuccess: false})
        // })
    }  else { //does not update image
        fields = {
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            body: newbody
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
            updatesuccess: true,
            fields
        })
    } catch(err) {
        res.status(400).json({
            updatesuccess: false,
            message: err
        })
    }
}

module.exports = editjournal
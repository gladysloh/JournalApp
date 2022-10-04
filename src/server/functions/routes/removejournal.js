const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')
const uploadimage = require('./uploadimage')
const bucket = admin.storage().bucket()
const storage = admin.storage()

async function removejournal(req, res){
    const journalid = req.body.journalid
    const userID = req.body.uid
    const snapshot = await firestore
        .collection('users')
        .doc(userID)
        .collection('journal')
        .doc(journalid)
        .get();

    if (!snapshot.exists){
        return res.status(400).json({
            success: false,
            error: 'journal not found'
        })
    } else {
        const journal = snapshot.data().fields
        console.log(journal.filename)
        if (journal.url){
            try {
            await bucket.file(`post-images/${journal.filename}`).delete()
            console.log('delete image success')
            } catch (error) {
                console.log('i shouldnt be in this block there was no error')
                return res.status(400).json({
                    success: false,
                    error: error.message
                })
            }
        }
        try {
            console.log('within try, deleting post')
            await firestore.collection('users')
                .doc(userID)
                .collection('journal')
                .doc(journalid)
                .delete()
        } catch (error){
            console.log('caught an error')
            return res.status(400).json({
                success: false,
                error: 'journal not deleted'
            })
        }
    }
    console.log('no error caught, exiting')
    return res.status(200).json({
        success: true
    })
}

module.exports = removejournal
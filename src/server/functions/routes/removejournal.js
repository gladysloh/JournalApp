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
            await bucket.file(`post-images/${journal.filename}`).delete((error) => {
                if (error){
                    return res.status(400).json({
                        success: false,
                        message: 'image not deleted',
                        error: error
                    })
                }
            })
        }
        try {
            await firestore.collection('users')
                .doc(userID)
                .collection('journal')
                .doc(journalid)
                .delete()
        } catch (error){
            return res.status(400).json({
                success: false,
                error: 'journal not deleted'
            })
        }
    }
    return res.status(200).json({
        success: true
    })
}

module.exports = removejournal
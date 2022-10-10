const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')

async function justsentiment(req, res){
    const uid = req.body.uid
    console.log(uid)
    const newsentiment = req.body.sentiment
    console.log(newsentiment)
    const journalid = req.body.journalid
    const fields = { sentiment: newsentiment }
    const query = firestore.collection(`users/${uid}/journal/${journalid}/fields`)

    try {
        await firestore
        .collection('users')
        .doc(uid)
        .collection('journal')
        .doc(journalid)
        .update({
            "sentiment": newsentiment
        })
        res.status(200).json({
            success: true
        })
    } catch(err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }



}

module.exports = justsentiment
const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')

async function justsentiment(req, res){
    const uid = req.body.uid
    console.log(uid)
    const newsentiment = req.body.uid
    const journalid = req.body.journalid

    try {
        await firestore
        .collection('users')
        .doc(uid)
        .collection('journal')
        .doc(journalid)
        .update({
            sentiment: newsentiment
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
const firestore = require('firebase-admin').firestore()

async function getonejournal(req, res){
    const uid = req.body.uid
    const journalid = req.body.journalid

    const snapshot = await firestore.collection('user').doc(uid).collection('journal').doc(journalid).get()

    console.log(snapshot.data())
    return res.status(200).json({
        success: true,
    })
}

module.exports = getonejournal
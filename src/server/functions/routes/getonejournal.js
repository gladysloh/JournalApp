const firestore = require('firebase-admin').firestore()

async function getonejournal(req, res){
    const uid = req.body.uid
    const journalid = req.body.journalid

    const snapshot = await firestore.collection('users').doc(uid).collection('journal').doc(journalid).get()
    if(!snapshot.exists){
        return res.status(400).json({
            success: false,
            message: 'page not found'
        })
    }
    return res.status(200).json({
        success: true,
        journal: snapshot.data()
    })
}

module.exports = getonejournal
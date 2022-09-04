const firestore = require('firebase-admin').firestore()
const { getDocs, collection, doc } = require('firebase/firestore')
async function getalljournal(req, res){
    
    const uid = req.session.uid

    const query = firestore.collection(`users/${uid}/journal`)
    const snapshot = query.onSnapshot(querysnapshot => {

        const journals = []
        querysnapshot.forEach((doc) => {
            const {body, timestamp, url} = doc.data()
            journals.push({
                id: doc.id,
                body,
                url,
                timestamp
            })
        })

        res.status(200).json(journals)
    }, err => {
        res.status(400).json({ success: false,
                               error: err                        
        })
    })



}

module.exports = getalljournal
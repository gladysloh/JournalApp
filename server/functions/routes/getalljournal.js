const firestore = require('firebase-admin').firestore()
const { getDocs, collection, doc } = require('firebase/firestore')
async function getalljournal(req, res){
    
    const uid = req.session.uid

    const query = firestore.collection(`users/${uid}/journal`)
    const snapshot = query.onSnapshot(querysnapshot => {
        // console.log(`received query snapshot of size ${querysnapshot.size}`)
        // var docs = querysnapshot.docs.map(doc => doc.data())
        // console.log('document data: ', docs)
        // docs.id = querysnapshot.docs.id
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
        console.log(err)
        res.status(404).json({ getjournal: "failure",
                               message: err                        
        })
    })



}

module.exports = getalljournal
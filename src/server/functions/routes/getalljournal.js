const firestore = require('firebase-admin').firestore()
const { getDocs, collection, doc } = require('firebase/firestore')
async function getalljournal(req, res){
    
    const uid = req.body.uid

    const query = firestore.collection(`users/${uid}/journal`)
    console.log('within getalljournal')
    const snapshot = await query.onSnapshot(querysnapshot => {
        const journals = []
        querysnapshot.forEach((doc) => {
            //console.log(doc.data().fields)
            //console.log(doc)
            //const {body, timestamp, url, title} = doc.data().fields
            //console.log(body)
            journals.push({
                id: doc.id,
                //title,
                body: doc.data().fields.body,
                url: doc.data().fields.url,
                timestamp: doc.data().fields.timestamp,
                title: doc.data().fields.title, 
                sentiment: doc.data().fields.sentiment
            })
            //console.log(journals)
        })
        console.log('successful')
        return res.status(200).json(journals)
    }, err => {
        console.log('error occurred')
        return res.status(400).json({ success: false,
                               error: err                        
        })
    })



}

module.exports = getalljournal
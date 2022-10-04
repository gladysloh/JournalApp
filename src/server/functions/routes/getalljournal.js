const firestore = require('firebase-admin').firestore()
const { getDocs, collection, doc } = require('firebase/firestore')
async function getalljournal(req, res){
    
    const uid = req.body.uid
    const journals = []
    try {
        await firestore.collection(`users/${uid}/journal`).get()
            .then(querysnapshot => {
                querysnapshot.docs.forEach(doc => {
                    journals.push({
                        id: doc.id,
                        body: doc.data().fields.body,
                        url: doc.data().fields.url,
                        timestamp: doc.data().fields.timestamp,
                        title: doc.data().fields.title,
                        filename: doc.data().fields.filename
                    })
                })
            })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
   

    // //let journals = []
    // const query = firestore.collection(`users/${uid}/journal`)
    // console.log('within getalljournal')
    // let snapshot = await query.onSnapshot(querysnapshot => {
    //     let journals = []
    //     console.log('within snapshot')
    //     querysnapshot.forEach((doc) => {

    //         journals.push({
    //             id: doc.id,
    //             body: doc.data().fields.body,
    //             url: doc.data().fields.url,
    //             timestamp: doc.data().fields.timestamp,
    //             title: doc.data().fields.title,
    //             filename: doc.data().fields.filename
    //         })
    //         //console.log(journals)
    //     })
    //     console.log('dumb')
    //     return res.status(200).json({
    //         journals
    //     })
    // }, err => {
    //     console.log('error occurred')
    //     if (err){
    //         return res.status(400).json({ success: false,
    //                             error: err                        
    //         })
    //     }
    // })
}

module.exports = getalljournal
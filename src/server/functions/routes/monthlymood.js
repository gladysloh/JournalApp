const admin = require('firebase-admin')
const firestore = require('firebase-admin').firestore()
const moment = require('moment')

async function monthlymood(req, res){
    const uid = req.body.uid
    const currentDate = moment().format("DD-MM-YYYY").split("-")
    const next = moment().add(1, 'month').format("DD-MM-YYYY").split("-")
    const nextMonthYear = next[2]
    const nextMonth = next[1]
    const currentMonth = currentDate[1]
    const currentYear = currentDate[2]


    const query = firestore.collection(`users/${uid}/journal`)
                    .where('fields.timestamp',
                            '>=',
                            new Date(`${currentYear}-${currentMonth}-01`))
                    .where('fields.timestamp',
                            '<',
                            new Date(`${nextMonthYear}-${nextMonth}`))
    await query.onSnapshot(querysnapshot => {
        var moods = []
        querysnapshot.forEach((doc) => {
            console.log(doc.data())
            moods.push({
                timestamp: doc.data().fields.timestamp,
                sentiment: doc.data().fields.sentiment
            })
        })
        res.status(200).json({
            moods
        })
    }, err => {
        res.status(400).json({
            success: false,
            error: err.message
        })//wth
    })

        // if (!snapshot.exists){
        //     return res.status(400).json({
        //         success: false,
        //         error: 'journals not found in that month'
        //     })
        // }
        // const moods = snapshot.data()
        // return res.status(400).json({
        //     moods
        // })
    


}

module.exports = monthlymood
const admin = require('firebase-admin')
const firestore = require('firebase-admin').firestore()
const moment = require('moment')

async function monthlymood(req, res){
    const uid = req.body.uid
    
    // const currentDate = moment().format("DD-MM-YYYY").split("-")
    // const next = moment().add(1, 'month').format("DD-MM-YYYY").split("-")
    // const nextMonthYear = next[2]
    // const nextMonth = next[1]
    // const currentMonth = currentDate[1]
    // const currentYear = currentDate[2]
    const target = moment().set({'year': req.body.year, 'month': req.body.month}).format("MM-YYYY").split("-")
    const targetplusone = moment().add(1, 'month').format("MM-YYYY").split("-")
    const targetMonth = target[0]
    const targetYear = target[1]
    const nextMonth = targetplusone[0]
    const nextMonthYear = targetplusone[1]
    console.log('Target: ', target)
    console.log('Targetplusone: ', targetplusone)

    const query = firestore.collection(`users/${uid}/journal`)
                    .where('timestamp',
                            '>=',
                            new Date(`${targetYear}-${targetMonth}-01`))
                    .where('timestamp',
                            '<',
                            new Date(`${nextMonthYear}-${nextMonth}`))
    await query.onSnapshot(querysnapshot => {
        var moods = []
        querysnapshot.forEach((doc) => {
            console.log(doc.data())
            moods.push({
                timestamp: doc.data().timestamp,
                sentiment: doc.data().sentiment
            })
        })
        res.status(200).json({
            moods
        })
    }, err => {
        res.status(400).json({
            success: false,
            error: err.message
        })
    })


    


}

module.exports = monthlymood
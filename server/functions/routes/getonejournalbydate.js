const firestore = require('firebase-admin').firestore()
const moment = require('moment')

async function getonejournalbydate(req, res){
    const uid = req.body.uid
    if (!(req.body.year && req.body.month && req.body.date)){
        return res.status(400).json({
            success: false,
            error: 'missing value'
        })
    }
    const target = moment().set({'year': req.body.year, 'month': req.body.month, 'date': req.body.date})
                    .format("DD-MM-YYYY").split("-")
    const targetplusone = moment(target, "DD-MM-YYYY").add(1, 'days').format("DD-MM-YYYY").split("-")
    const targetDate = target[0]
    const targetMonth = target[1]
    const targetYear = target[2]
    const nextDate = targetplusone[0]
    const nextMonth = targetplusone[1]
    const nextMonthYear = targetplusone[2]

    const query = firestore.collection(`users/${uid}/journal`)
        .where('createdTimestamp',
                            '>=',
                            new Date(`${targetYear}-${targetMonth}-${targetDate}`))
        .where('createdTimestamp',
                            '<',
                            new Date(`${nextMonthYear}-${nextMonth}-${nextDate}`))

    await query.onSnapshot(querysnapshot => {
        if (querysnapshot.size == 0){
            return res.status(200).json({
                success: false,
                message: 'no journal on this date'
            })
        }
        querysnapshot.forEach((doc) => {
            return res.status(200).json({
                success: true,
                journal: doc.data()
            })
        })
    })


}

module.exports = getonejournalbydate
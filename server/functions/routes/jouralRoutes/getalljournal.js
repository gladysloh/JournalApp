const firestore = require('firebase-admin').firestore()
const moment = require('moment')



async function getalljournal(req, res) {
    console.log('within get all journals')
    const uid = req.body.uid
    const journals = []
    var target, targetplusone, targetMonth, targetYear, nextMonth, nextMonthYear;

    if (req.body.month && req.body.year){
        target = moment().set({'year': req.body.year, 'month': req.body.month}).format("MM-YYYY").split("-")
    } else {
        target = moment().format("MM-YYYY").split("-")
    }
    targetplusone = moment(target, "MM-YYYY").add(1, 'month').format("MM-YYYY").split("-")
    targetMonth = target[0]
    targetYear = target[1]
    nextMonth = targetplusone[0]
    nextMonthYear = targetplusone[1]
    console.log(target)
    console.log(targetplusone)
    try {
        await firestore.collection(`users/${uid}/journal`)
                    .where('createdTimestamp',
                            '>=',
                            new Date(`${targetYear}-${targetMonth}-01`))
                    .where('createdTimestamp',
                            '<',
                            new Date(`${nextMonthYear}-${nextMonth}`)).get()
        .then(querysnapshot => {
                querysnapshot.docs.forEach(doc => {
                    journals.push({
                        id: doc.id,
                        body: doc.data().body,
                        url: doc.data().url,
                        createdTimestamp: doc.data().createdTimestamp,
                        title: doc.data().title,
                        filename: doc.data().filename,
                        sentiment: doc.data().sentiment,
                        editTime: doc.data().editTime
                    })
                })
            })

        return res.status(200).json({
            journals
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = getalljournal
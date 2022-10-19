const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')
const moment = require('moment')
const countwords = require('count-words')
const SW = require('stopword')
const preprocess = require('../util/preprocessText')


async function wordcloud(req, res){
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
                    .where('createdTimestamp',
                            '>=',
                            new Date(`${targetYear}-${targetMonth}-01`))
                    .where('createdTimestamp',
                            '<',
                            new Date(`${nextMonthYear}-${nextMonth}`))
    await query.onSnapshot(querysnapshot => {
        let positivestring = ""
        let negativestring = ""
        querysnapshot.forEach((doc) => {
            if (doc.data().sentiment >= 0) {
                positivestring = positivestring.concat(" ", doc.data().body)
            } else {
                negativestring = negativestring.concat(" ", doc.data().body)
            }
        })
        cleanedPositiveString = preprocess(positivestring)
        cleanedNegativeString = preprocess(negativestring)
        positiveWordCountObject = countwords(cleanedPositiveString)
        negativeWordCountObject = countwords(cleanedNegativeString)
        positiveResult = Object.keys(positiveWordCountObject).map((key) => [String(key), positiveWordCountObject[key]])
        negativeResult = Object.keys(negativeWordCountObject).map((key) => [String(key), negativeWordCountObject[key]])
        res.status(200).json({
            positive: positiveResult,
            negative: negativeResult
        })
    }, err => {
        res.status(400).json({
            success: false,
            error: err.message
        })
    })

}



module.exports = wordcloud
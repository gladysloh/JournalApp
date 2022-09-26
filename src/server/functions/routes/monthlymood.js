const admin = require('firebase-admin')
const firestore = require('firebase-admin').firestore()
const moment = require('moment')

async function monthlymood(req, res){
    const uid = req.body.uid
    const currentDate = moment().format("DD-MM-YYYY").split("-")
    const next = moment().add(1, 'months').format("DD-MM-YYYY")
    const nextMonthYear = next[2]
    const nextMonth = next[1]
    const currentDay = currentDate[0]
    const currentMonth = currentDate[1]
    const currentYear = currentDate[2]

    try {
        var snapshot = await firestore
        .collection('users')
        .doc(userID)
        .collection('journal')
        .where(
            'timestamp',
            ">=",
            new Date(`${currentYear}-${currentMonth}-01`)
        )
        .where(
            'timestamp',
            "<",
            new Date(`${nextMonthYear}-${nextMonth}-01`)
        )
        .select('sentiment')
        .get()

        if (!snapshot.exists){
            return res.status(400).json({
                success: false,
                error: 'journals not found in that month'
            })
        }
        const moods = snapshot.data()
        return res.status(400).json({
            moods
        })
    } catch(err){
        res.status(400).json({
            success: false,
            error: err
        })
    } 


}

module.exports = monthlymood
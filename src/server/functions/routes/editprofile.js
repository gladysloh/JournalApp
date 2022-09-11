const admin = require('firebase-admin')
const firestore = require('firebase-admin').firestore()

async function editprofile(req, res){

    const uid = req.session.uid

    if (!req.body.new_displayname || !req.body.new_pin){
        return res.status(400).json({
            success: false,
            error: 'no displayname/pin to be updated'
        })
    }
    const new_displayname = req.body.new_displayname
    const new_pin = req.body.new_pin

    try{
        await firestore
            .collection('user')
            .doc(uid)
            .update({
                displayname: new_displayname,
                pin: new_pin
            })
            res.status(200).json({
                success: true
            })
    } catch(err){
        res.status(400).json({
            success: false,
            error: err
        })
    } 
}
const admin = require('firebase-admin')
const firestore = require('firebase-admin').firestore()

async function editprofile(req, res){

    const uid = req.body.uid

    if (!req.body.new_displayname){
        return res.status(400).json({
            success: false,
            error: 'no displayname/pin to be updated'
        })
    }
    const new_displayname = req.body.new_displayname

    try{
        await firestore
            .collection('user')
            .doc(uid)
            .update({
                displayname: new_displayname
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
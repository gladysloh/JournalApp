const firestore = require('firebase-admin').firestore()

async function getUser(req, res){

    const userID = req.body.uid
    if (!userID){
        res.status(400).json({ error: {code: 'no-user-id'}})
        return
    }

    if (userID != req.body.uid){
        res.status(403).json({ error: {code: 'unauthorized'}})
        return
    }

    const snapshot = await firestore
        .collection('users')
        .doc(userID)
        .get();
    if (!snapshot.exists) {
        res.status(404).json({error: {code: 'user-not-found'}})
        return;
    }
    console.log(snapshot)
     const user = snapshot.data();
     return res.status(200).json({ displayname: user.displayname })

}

module.exports = getUser


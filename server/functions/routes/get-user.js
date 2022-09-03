const firestore = require('firebase-admin').firestore()

async function getUser(req, res){

    const userID = req.session.uid
    if (!userID){
        res.status(400).json({ error: {code: 'no-user-id'}})
        return
    }

    if (userID != req.token.uid){
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
     //console.log(user)
     return res.status(200).json({ displayname: user.displayname })

}

module.exports = getUser

//eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY2MTcwMDk3NiwiZXhwIjo
//xNjYxNzA0NTc2LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1hYmt6N0BvbmNlYWRheS00OGZiNy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWFia3o3QG9uY2VhZGF5LTQ4ZmI3LmlhbS5nc2VydmljZWFjY291bnQuY29
//tIiwidWlkIjoiaGd2Vk9KbWpCcVFPeHEzSGxiTURnQzZsdTZoMSJ9.klEwz_-ZBtbUeE5_qAycEOYTfHespFRkgv7AHSsTOUt6a22LL3iguXdcw9X7UbSZLFfrIqHrPyAE4tUycvdiQx0mB9-JNKmt9wVWYv6I5KollJfm1mn6C9lyebxW7X5KDhhV_UwgQdCNMgGcrx
//sJa7B4TiZj2oMzaFob8E4Ft8feTPXGQHQD0BHB9meTkna-5RmcM5RESD7W4jjQ16eFYxW0qBEV-XNVavd4EcW8d_PK9Kuf_EWr1hNHggp6H1nDeXO3O00U2Ul1DBEYlmCzvdve0rl1XwWycMV1LH1qDtajWlUUf9kanS660mD8TUw1w4q2Y7iBAZQ2XXb9FnHSkw
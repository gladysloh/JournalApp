const admin = require('firebase-admin')
const firestore = require('firebase-admin').storage()

async function pinlogin(req, res){
    if (req.session.uid){
        req.session.destroy()
    }

    if (!req.session.uid){

    }

}

//how pin logout will work
//google auth

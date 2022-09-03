const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')

async function getRandomQuestion(req, res){
    const snapshot = await firestore
        .collection('questions')
        .get();
    if (!snapshot){
        return res.status(400).json({
            getQuestion: "failed"
        })
    }
    console.log(snapshot.size)
    const numberofquestions = snapshot.size
    console.log(numberofquestions)
    const randomindex = Math.floor(Math.random() * parseInt(numberofquestions))
    console.log(randomindex)
    return res.status(200).json({ question: snapshot.docs[randomindex].data().question })
}

module.exports = getRandomQuestion
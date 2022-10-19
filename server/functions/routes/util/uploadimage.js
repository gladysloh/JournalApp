
const firestore = require('firebase-admin').firestore()
const admin = require('firebase-admin')

require('firebase/storage')
const bucket = admin.storage().bucket()
global.XMLHttpRequest = require('xhr2')

async function uploadimage(base64EncodedImageString, uid){
    const randomId = Math.random()
        .toString(36)
        .substring(2,8)
    let date = new Date()
    mimeType = 'image/jpeg',
    fileName = `${uid}/${date.getTime()}_${randomId}.jpg`,
    imageBuffer = new Buffer(base64EncodedImageString, 'base64')

    var file = bucket.file('post-images/' + fileName)
    file.save(imageBuffer, {
        metadata: {contentType: mimeType},
    }, ((error) => {
        if (error) {
            return res.status(400).json({
                success: false,
                error: error
            })
        } 
    }))
    console.log('uploaded')

    const signedUrl = await file.getSignedUrl({
        action: 'read',
        expires: new Date(date.getTime() + 60 * 60 * 1000 * 60 * 60 * 2)
    }).then(signedUrls => {
        return signedUrls[0]
    })
    console.log('upload journal url', signedUrl)
    var toreturn = {signedUrl, fileName}
    var tore = JSON.stringify(toreturn)
    return tore
}

module.exports = uploadimage
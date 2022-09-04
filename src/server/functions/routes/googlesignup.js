const {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect
} = require('firebase/auth')

var provider = new GoogleAuthProvider()

const googlesignup = () => {
    console.log('in googlesignup')
    signInWithRedirect(provider).then(function(result) {
        var token = result.credentials.accessToken;
        var user = result.user
    }).catch(function(error){
        var errorCode = error.code
        var errorMessage = error.message
        var email = error.email
        var credential = error.credential
    })
}

// const googlesignup = () => signInWithRedirect(provider)
module.exports = googlesignup
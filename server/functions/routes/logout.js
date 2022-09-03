function logout(req, res){
    req.session.destroy()
    return res.status(200).json({
        logoutsuccess: true,
        message: "user logged out"
    })
}

module.exports = logout
function logout(req, res){
    req.session.destroy()
    if (!req.session.uid){
        return res.status(200).json({
            success: true,
            message: "user logged out"
        })
    } else {
        return res.status(404).json({
            success: false
        })
    }
}

module.exports = logout
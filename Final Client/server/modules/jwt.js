const jwt = require('jsonwebtoken');
require('dotenv').config();


const createJWT = (id) => {
    var token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '3d'})
    return token
}

const verifyToken = (token) => {
    // console.log(token)
    var check = false
    try {
        check = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (err) {
        console.log(err)
        check = false
    }
    return check
}

const createRefreshToken = (user) => {
    var token =  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn : '7d' })
    return token
}

module.exports = {createJWT, verifyToken, createRefreshToken}
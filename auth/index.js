const jwt = require("jsonwebtoken")
const secret = process.env.SECRET

const decodeToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        res.locals.user = jwt.verify(token, secret)
        next()
    } catch (err) {
        next()
    }
}
module.exports = decodeToken
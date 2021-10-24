let express = require('express')
let router = express.Router()

const adminRoutes = require('./api/admin.routes')

router.use('/admin', adminRoutes)



module.exports = router;
let express = require('express')
let router = express.Router()

const adminController = require('../../controller/admin.controller')

router.post('/login', adminController.login)
router.post('/verify', adminController.verify)
router.post('/add', adminController.addAdmin)
router.post('/save', adminController.saveData)
router.post('/save-answer', adminController.saveAnswer)
router.post('/get', adminController.getData)
router.post('/get-questions', adminController.getAllQuestion)

module.exports = router
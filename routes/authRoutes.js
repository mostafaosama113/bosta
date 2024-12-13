const { register } = require('../controllers/authController')

const router = require('express').Router()

router.route('/').post(register)

module.exports = router
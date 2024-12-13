const { register } = require('../controllers/authController')

const router = require('express').Router()

router.route('/register').post(register)

module.exports = router
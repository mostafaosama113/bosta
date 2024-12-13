const { register , login , update} = require('../controllers/borrowersController')

const router = require('express').Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/:borrower_id').put(update)

module.exports = router
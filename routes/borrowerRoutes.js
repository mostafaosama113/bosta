const { register , login , update , deleteBorrower} = require('../controllers/borrowersController')

const router = require('express').Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/:borrower_id').put(update)
router.route('/:borrower_id').delete(deleteBorrower)

module.exports = router
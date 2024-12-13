const { register , login , update , deleteBorrower , getAllBorrowers} = require('../controllers/borrowersController')

const router = require('express').Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/:borrower_id').put(update)
router.route('/:borrower_id').delete(deleteBorrower)
router.route('/').get(getAllBorrowers)

module.exports = router
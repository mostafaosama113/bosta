const { register , login , update , deleteBorrower , getAllBorrowers} = require('../controllers/borrowersController')

const router = require('express').Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/').put(update)
router.route('/').delete(deleteBorrower)
router.route('/').get(getAllBorrowers)

module.exports = router
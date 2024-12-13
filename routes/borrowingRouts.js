const { checkoutBook,returnBook,getCurrentBorrowedBooks,getOverdueBooks,getBooksLeft} = require('../controllers/borrowingController')

const router = require('express').Router()

router.route('/').post(checkoutBook)
router.route('/return').put(returnBook)
router.route('/books/:borrowerId').get(getCurrentBorrowedBooks)
router.route('/overdueBooks/:borrowerId').get(getOverdueBooks)
router.route('/left/:bookId').get(getBooksLeft)

module.exports = router
const { addBook,updateBook,deleteBook,listBooks,searchBooks} = require('../controllers/bookController')

const router = require('express').Router()

router.route('/').post(addBook)
router.route('/:book_id').put(updateBook)
router.route('/:book_id').delete(deleteBook)
router.route('/').get(listBooks)
router.route('/search').get(searchBooks)

module.exports = router
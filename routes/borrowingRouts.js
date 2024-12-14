/**
 * @swagger
 * tags:
 *   name: Borrowing
 *   description: API for managing the borrowing process.
 */

/**
 * @swagger
 * /api/borrowing/:
 *   post:
 *     summary: Checkout a book
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: The ID of the book to checkout.
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Due date for returning the book.
 *     responses:
 *       201:
 *         description: Successfully checked out the book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 borrowing_id:
 *                   type: string
 *                   description: The ID of the borrowing process.
 *                 book_id:
 *                   type: string
 *                   description: The ID of the borrowed book.
 *                 due_date:
 *                   type: string
 *                   format: date
 *       400:
 *         description: Error during book checkout.
 */

/**
 * @swagger
 * /api/borrowing/return:
 *   put:
 *     summary: Return a borrowed book
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               borrowingId:
 *                 type: string
 *                 description: The ID of the borrowing record.
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: The return date.
 *     responses:
 *       200:
 *         description: Successfully returned the book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 borrowing_id:
 *                   type: string
 *                   description: The ID of the borrowing record.
 *                 return_date:
 *                   type: string
 *                   format: date
 *       400:
 *         description: Error during book return.
 */

/**
 * @swagger
 * /api/borrowing/books:
 *   get:
 *     summary: Get all current borrowed books
 *     tags: [Borrowing]
 *     responses:
 *       200:
 *         description: List of current borrowed books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   borrowing_id:
 *                     type: string
 *                     description: The ID of the borrowing record.
 *                   title:
 *                     type: string
 *                     description: Title of the borrowed book.
 *                   author:
 *                     type: string
 *                     description: Author of the borrowed book.
 *       400:
 *         description: Error fetching current borrowed books.
 */

/**
 * @swagger
 * /api/borrowing/overdueBooks:
 *   post:
 *     summary: Get all overdue books for a borrower
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentDate:
 *                 type: string
 *                 format: date
 *                 description: The current date to check overdue books.
 *     responses:
 *       200:
 *         description: List of overdue books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   borrowing_id:
 *                     type: string
 *                     description: The ID of the borrowing record.
 *                   title:
 *                     type: string
 *                     description: Title of the overdue book.
 *                   author:
 *                     type: string
 *                     description: Author of the overdue book.
 *       400:
 *         description: Error fetching overdue books.
 */

/**
 * @swagger
 * /api/borrowing/left/{bookId}:
 *   get:
 *     summary: Get the number of available copies left for a book
 *     tags: [Borrowing]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book.
 *     responses:
 *       200:
 *         description: Number of available copies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books_left:
 *                   type: integer
 *                   description: Number of available copies.
 *       400:
 *         description: Error fetching books left.
 */


const { checkoutBook,returnBook,getCurrentBorrowedBooks,getOverdueBooks,getBooksLeft} = require('../controllers/borrowingController')

const router = require('express').Router()

router.route('/').post(checkoutBook)
router.route('/return').put(returnBook)
router.route('/books').get(getCurrentBorrowedBooks)
router.route('/overdueBooks').post(getOverdueBooks)
router.route('/left/:bookId').get(getBooksLeft)

module.exports = router
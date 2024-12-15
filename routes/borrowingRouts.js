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
 *   get:
 *     summary: Get all overdue books for a borrower
 *     tags: [Borrowing]
 *     parameters:
 *       - in: query
 *         name: currentDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: The current date to check overdue books.
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


/**
 * @swagger
 * tags:
 *   - name: Analysis
 *     description: Endpoints related to exporting overdue borrows and borrowing processes.
 */
/**
 * @swagger
 * /api/borrowing/overDueLastMonth:
 *   get:
 *     tags: [Analysis]
 *     summary: Export overdue borrows from the last month.
 *     description: This endpoint exports all overdue borrowing records from the previous month.
 *     responses:
 *       200:
 *         description: Successfully exported overdue borrows from the last month.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       400:
 *         description: Error occurred while exporting overdue borrows.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Export overdue borrows failed: <error message>"
 */

/**
 * @swagger
 * /api/borrowing/processesLastMonth:
 *   get:
 *     tags: [Analysis]
 *     summary: Export borrowing processes from the last month.
 *     description: This endpoint exports all borrowing processes from the previous month.
 *     responses:
 *       200:
 *         description: Successfully exported borrowing processes from the last month.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: true
 *       400:
 *         description: Error occurred while exporting borrowing processes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Export borrowing processes failed: <error message>"
 */

const { checkoutBook,
    returnBook,
    getCurrentBorrowedBooks,
    getOverdueBooks,
    getBooksLeft,
    exportOverdueBorrowsLastMonth,
    exportBorrowingProcessesLastMonth

} = require('../controllers/borrowingController')

const router = require('express').Router()

router.route('/').post(checkoutBook)
router.route('/return').put(returnBook)
router.route('/books').get(getCurrentBorrowedBooks)
router.route('/overdueBooks').get(getOverdueBooks)
router.route('/left/:bookId').get(getBooksLeft)
router.route('/overDueLastMonth').get(exportOverdueBorrowsLastMonth)
router.route('/processesLastMonth').get(exportBorrowingProcessesLastMonth)

module.exports = router
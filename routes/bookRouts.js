/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Operations related to books
 */

/**
 * @swagger
 * /api/book:
 *   post:
 *     summary: Add a new book
 *     description: Create a new book entry in the system.
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *               isbn:
 *                 type: string
 *                 example: "9780743273565"
 *               available_quantity:
 *                 type: integer
 *                 example: 5
 *               shelf_location:
 *                 type: string
 *                 example: "Shelf A3"
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 book_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "The Great Gatsby"
 *                 author:
 *                   type: string
 *                   example: "F. Scott Fitzgerald"
 *                 isbn:
 *                   type: string
 *                   example: "9780743273565"
 *                 available_quantity:
 *                   type: integer
 *                   example: 5
 *                 shelf_location:
 *                   type: string
 *                   example: "Shelf A3"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error adding the book"
 */

/**
 * @swagger
 * /api/book/{book_id}:
 *   put:
 *     summary: Update a book
 *     description: Update the details of an existing book.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *               isbn:
 *                 type: string
 *                 example: "9780743273565"
 *               available_quantity:
 *                 type: integer
 *                 example: 5
 *               shelf_location:
 *                 type: string
 *                 example: "Shelf A3"
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 book_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "The Great Gatsby"
 *                 author:
 *                   type: string
 *                   example: "F. Scott Fitzgerald"
 *                 isbn:
 *                   type: string
 *                   example: "9780743273565"
 *                 available_quantity:
 *                   type: integer
 *                   example: 5
 *                 shelf_location:
 *                   type: string
 *                   example: "Shelf A3"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating the book"
 */

/**
 * @swagger
 * /api/book/{book_id}:
 *   delete:
 *     summary: Delete a book
 *     description: Soft delete a book by setting the `is_deleted` flag to true.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to be deleted
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 book_id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error deleting the book"
 */

/**
 * @swagger
 * /api/book:
 *   get:
 *     summary: List all books
 *     description: Retrieve a list of all available books.
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   book_id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "The Great Gatsby"
 *                   author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *                   isbn:
 *                     type: string
 *                     example: "9780743273565"
 *                   available_quantity:
 *                     type: integer
 *                     example: 5
 *                   shelf_location:
 *                     type: string
 *                     example: "Shelf A3"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching books"
 */

/**
 * @swagger
 * /api/book/search:
 *   get:
 *     summary: Search books by title
 *     description: Search for books by partial or full title.
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: text
 *         required: true
 *         schema:
 *           type: string
 *         description: Title or part of the title to search for
 *     responses:
 *       200:
 *         description: A list of books matching the search
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   book_id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "The Great Gatsby"
 *                   author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *                   isbn:
 *                     type: string
 *                     example: "9780743273565"
 *                   available_quantity:
 *                     type: integer
 *                     example: 5
 *                   shelf_location:
 *                     type: string
 *                     example: "Shelf A3"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error searching for books"
 */


const { addBook,updateBook,deleteBook,listBooks,searchBooks} = require('../controllers/bookController')

const router = require('express').Router()

router.route('/').post(addBook)
router.route('/:book_id').put(updateBook)
router.route('/:book_id').delete(deleteBook)
router.route('/').get(listBooks)
router.route('/search').get(searchBooks)

module.exports = router
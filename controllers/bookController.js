const BookService = require('../services/bookService');

// Add a new book
const addBook = async (req, res) => {
    const { title, author, isbn, available_quantity, shelf_location } = req.body;
    try {
        const newBook = await BookService.addBook(title, author, isbn, available_quantity, shelf_location);
        res.status(201).json(newBook);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

// Update a book's details
const updateBook = async (req, res) => {
    const book_id = req.params.book_id;  // Get book_id from URL parameter
    const updatedData = req.body;  // Get updated data from request body
    try {
        const updatedBook = await BookService.updateBook(book_id, updatedData);
        res.status(200).json(updatedBook);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    const { book_id } = req.params;  // Get book_id from URL parameter
    try {
        const deletedBook = await BookService.deleteBook(book_id);
        res.status(200).json(deletedBook);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

// List all books
const listBooks = async (req, res) => {
    try {
        const books = await BookService.getAllBooks();
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

// Search for a book by title, author, or ISBN
const searchBooks = async (req, res) => {
    const { text } = req.query;  // Get search query from the request query string
    try {
        const books = await BookService.searchBooks(text);
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    addBook,
    updateBook,
    deleteBook,
    listBooks,
    searchBooks
};

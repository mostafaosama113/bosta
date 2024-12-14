const BookService = require('../services/bookService');

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

const updateBook = async (req, res) => {
    const book_id = req.params.book_id;
    const updatedData = req.body;
    try {
        const updatedBook = await BookService.updateBook(book_id, updatedData);
        res.status(200).json(updatedBook);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

const deleteBook = async (req, res) => {
    const { book_id } = req.params; 
    try {
        const deletedBook = await BookService.deleteBook(book_id);
        res.status(200).json(deletedBook);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

const listBooks = async (req, res) => {
    try {
        const books = await BookService.getAllBooks();
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

const searchBooks = async (req, res) => {
    const { text } = req.query; 
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

const BorrowingService = require('../services/borrowingService');

const checkoutBook = async (req, res) => {
    const borrowerId = req.id; // Get borrowerId from jwt
    const {bookId, dueDate } = req.body;
    try {
        const result = await BorrowingService.checkoutBook(borrowerId, bookId, dueDate);
        res.status(201).json(result);
    } catch (err) {
        console.error('Error in checkoutBook controller:', err);
        res.status(400).json({ message: err.message });
    }
};

const returnBook = async (req, res) => {
    const {borrowingId , returnDate } = req.body;
    try {
        const result = await BorrowingService.returnBook(borrowingId, returnDate);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error in returnBook controller:', err);
        res.status(400).json({ message: err.message });
    }
};

const getCurrentBorrowedBooks = async (req, res) => {
    const borrowerId = req.id; // Get borrowerId from jwt
    try {
        const result = await BorrowingService.getCurrentBorrowedBooks(borrowerId);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error in getCurrentBorrowedBooks controller:', err);
        res.status(400).json({ message: err.message });
    }
};

const getOverdueBooks = async (req, res) => {
    const borrowerId = req.id
    
    const { currentDate } = req.query;
    try {
        const result = await BorrowingService.getOverdueBooks(borrowerId, currentDate);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error in getOverdueBooks controller:', err);
        res.status(400).json({ message: err.message });
    }
};

const getBooksLeft = async (req, res) => {
    const { bookId } = req.params;
    try {
        const result = await BorrowingService.getBooksLeft(bookId);
        res.status(200).json({'count' : result});
    } catch (err) {
        console.error('Error in getBooksLeft controller:', err);
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    checkoutBook,
    returnBook,
    getCurrentBorrowedBooks,
    getOverdueBooks,
    getBooksLeft
};

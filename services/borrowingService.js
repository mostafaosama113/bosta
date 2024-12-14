const BorrowingProcess = require('../models/borrowingProcessModel');
const Book = require('../models/bookModel');

class BorrowingService {
    static async checkoutBook(borrowerId, bookId, dueDate) {
        try {
            const booksLeft = await BorrowingProcess.findBooksLeft(bookId);

            if (booksLeft <= 0) {
                throw new Error('No available copies left for this book.');
            }
            const borrowingRecord = await BorrowingProcess.create(borrowerId, bookId, dueDate);
            return borrowingRecord;
        } catch (err) {
            console.error('Error during book checkout:', err);
            throw err;
        }
    }

    static async returnBook(borrowingId, returnDate) {
        try {
            const updatedRecord = await BorrowingProcess.update(borrowingId, { return_date: returnDate });
            return updatedRecord;
        } catch (err) {
            console.error('Error during book return:', err);
            throw err;
        }
    }

    static async getCurrentBorrowedBooks(borrowerId) {
        try {
            const borrowedBooks = await BorrowingProcess.findByBorrowerIdWithDetails(borrowerId, false);
            return borrowedBooks;
        } catch (err) {
            console.error('Error fetching current borrowed books:', err);
            throw err;
        }
    }

    static async getOverdueBooks(borrowerId, currentDate) {
        try {
            const overdueBooks = await BorrowingProcess.findOverdueByBorrowerIdWithDetails(borrowerId, currentDate);
            return overdueBooks;
        } catch (err) {
            console.error('Error fetching overdue books:', err);
            throw err;
        }
    }

    static async getBooksLeft(bookId) {
        try {
            const booksLeft = await BorrowingProcess.findBooksLeft(bookId);
            return booksLeft;
        } catch (err) {
            console.error('Error fetching books left:', err);
            throw err;
        }
    }
}

module.exports = BorrowingService;
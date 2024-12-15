const BorrowingProcess = require('../models/borrowingProcessModel');
const Book = require('../models/bookModel');

class BorrowingService {
    static async checkoutBook(borrowerId, bookId, dueDate) {
        if(!borrowerId || !bookId || !dueDate){
            throw new Error('All fields are required');
        }
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
        if(!borrowerId || !returnDate){
            throw new Error('All fields are required');
        }
        try {
            const updatedRecord = await BorrowingProcess.update(borrowingId, { return_date: returnDate });
            return updatedRecord;
        } catch (err) {
            console.error('Error during book return:', err);
            throw err;
        }
    }

    static async getCurrentBorrowedBooks(borrowerId) {
        if(!borrowerId){
            throw new Error('All fields are required');
        }
        try {
            const borrowedBooks = await BorrowingProcess.findByBorrowerIdWithDetails(borrowerId, false);
            return borrowedBooks;
        } catch (err) {
            console.error('Error fetching current borrowed books:', err);
            throw err;
        }
    }

    static async getOverdueBooks(borrowerId, currentDate) {
        if(!borrowerId || !currentDate){
            throw new Error('All fields are required');
        }
        try {
            const overdueBooks = await BorrowingProcess.findOverdueByBorrowerIdWithDetails(borrowerId, currentDate);
            return overdueBooks;
        } catch (err) {
            console.error('Error fetching overdue books:', err);
            throw err;
        }
    }

    static async getBooksLeft(bookId) {
        if(!bookId){
            throw new Error('All fields are required');
        }
        try {
            const booksLeft = await BorrowingProcess.findBooksLeft(bookId);
            return booksLeft;
        } catch (err) {
            console.error('Error fetching books left:', err);
            throw err;
        }
    }
    static async exportOverdueBorrowsLastMonth() {
        try {
            const overdueBorrows = await BorrowingProcess.exportOverdueBorrowsLastMonth();
            return overdueBorrows;
        } catch (err) {
            throw new Error(`Failed to export overdue borrows of the last month: ${err.message}`);
        }
    }

    static async exportBorrowingProcessesLastMonth() {
        try {
            const borrowingProcesses = await BorrowingProcess.exportBorrowingProcessesLastMonth();
            return borrowingProcesses;
        } catch (err) {
            throw new Error(`Failed to export borrowing processes of the last month: ${err.message}`);
        }
    }
}

module.exports = BorrowingService;
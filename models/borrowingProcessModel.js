const client = require('../clients/postgresClient');
const Borrower = require('./borrowerModel');
const Book = require('./bookModel');

class BorrowingProcess {
    // Borrow a book
    static async borrow(borrower_id, book_id, due_date) {
        const query = `
            INSERT INTO borrowing_process (borrower_id, book_id, due_date)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [borrower_id, book_id, due_date];
        try {
            const res = await client.query(query, values);
            return res.rows[0];  // Return the borrowing process record
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error borrowing book');
        }
    }

    // Return a book
    static async returnBook(borrowing_id, return_date) {
        const query = `
            UPDATE borrowing_process
            SET return_date = $1
            WHERE borrowing_id = $2;
        `;
        const values = [return_date, borrowing_id];
        try {
            await client.query(query, values);
            return { borrowing_id, return_date };  // Return the borrowing record with the return date
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error returning book');
        }
    }

    // Get all borrowed books by a borrower
    static async getBorrowedBooks(borrower_id) {
        const query = `
            SELECT * FROM borrowing_process
            WHERE borrower_id = $1 AND is_deleted = FALSE;
        `;
        const values = [borrower_id];
        try {
            const res = await client.query(query, values);
            return res.rows;  // Return all borrowing records for the borrower
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error fetching borrowed books');
        }
    }

    // Soft delete a borrowing process
    static async delete(borrowing_id) {
        const query = `
            UPDATE borrowing_process
            SET is_deleted = TRUE
            WHERE borrowing_id = $1;
        `;
        const values = [borrowing_id];
        try {
            await client.query(query, values);
            return { borrowing_id };  // Return the borrowing_id of the soft-deleted borrowing record
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error deleting borrowing process');
        }
    }
}

module.exports = BorrowingProcess;

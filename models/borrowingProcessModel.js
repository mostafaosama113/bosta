const client = require('../clients/postgresClient');

class BorrowingProcess {
    // Create a borrowing record
    static async create(borrowerId, bookId, dueDate) {
        const query = `
            INSERT INTO Borrowing_Process (borrower_id, book_id, due_date)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [borrowerId, bookId, dueDate];

        try {
            const result = await client.query(query, values);
            return result.rows[0];
        } catch (err) {
            console.error('Error creating borrowing record:', err);
            throw new Error('Error creating borrowing record');
        }
    }

    // Find a borrowing record by ID with borrower and book details
    static async findByIdWithDetails(borrowingId) {
        const query = `
            SELECT bp.*, b.title, b.author, br.first_name, br.last_name
            FROM Borrowing_Process bp
            JOIN Books b ON bp.book_id = b.book_id
            JOIN Borrowers br ON bp.borrower_id = br.borrower_id
            WHERE bp.borrowing_id = $1 AND bp.is_deleted = FALSE;
        `;
        try {
            const result = await client.query(query, [borrowingId]);
            return result.rows[0];
        } catch (err) {
            console.error('Error finding borrowing record with details:', err);
            throw new Error('Error finding borrowing record with details');
        }
    }

    // Update a borrowing record
    static async update(borrowingId, updatedData) {
        const setClauses = Object.keys(updatedData)
            .map((key, index) => `${key} = $${index + 2}`)
            .join(', ');

        const query = `
            UPDATE Borrowing_Process
            SET ${setClauses}
            WHERE borrowing_id = $1 AND is_deleted = FALSE
            RETURNING *;
        `;

        const values = [borrowingId, ...Object.values(updatedData)];

        try {
            const result = await client.query(query, values);
            return result.rows[0];
        } catch (err) {
            console.error('Error updating borrowing record:', err);
            throw new Error('Error updating borrowing record');
        }
    }

    // Find all borrowing records for a borrower (active or all) with book details
    static async findByBorrowerIdWithDetails(borrowerId, includeReturned = true) {
        const query = `
            SELECT bp.*, b.title, b.author
            FROM Borrowing_Process bp
            JOIN Books b ON bp.book_id = b.book_id
            WHERE bp.borrower_id = $1 AND bp.is_deleted = FALSE
            ${includeReturned ? '' : 'AND bp.return_date IS NULL'};
        `;

        try {
            const result = await client.query(query, [borrowerId]);
            return result.rows;
        } catch (err) {
            console.error('Error finding borrowing records with details:', err);
            throw new Error('Error finding borrowing records with details');
        }
    }

    // Find overdue books for a borrower with book details
    static async findOverdueByBorrowerIdWithDetails(borrowerId, currentDate) {
        const query = `
            SELECT bp.*, b.title, b.author
            FROM Borrowing_Process bp
            JOIN Books b ON bp.book_id = b.book_id
            WHERE bp.borrower_id = $1 AND bp.due_date < $2 AND bp.return_date IS NULL AND bp.is_deleted = FALSE;
        `;

        try {
            const result = await client.query(query, [borrowerId, currentDate]);
            return result.rows;
        } catch (err) {
            console.error('Error finding overdue books with details:', err);
            throw new Error('Error finding overdue books with details');
        }
    }
    // Find the number of books left in stock
    static async findBooksLeft(bookId) {
        const query = `
            SELECT b.available_quantity - COUNT(bp.book_id) AS books_left
            FROM Books b
            LEFT JOIN Borrowing_Process bp ON b.book_id = bp.book_id AND bp.return_date IS NULL AND bp.is_deleted = FALSE
            WHERE b.book_id = $1
            GROUP BY b.available_quantity;
        `;

        try {
            const result = await client.query(query, [bookId]);
            return result.rows[0]?.books_left || 0;
        } catch (err) {
            console.error('Error finding books left:', err);
            throw new Error('Error finding books left');
        }
    }
}

module.exports = BorrowingProcess;

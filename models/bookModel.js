const client = require('../clients/postgresClient');

class Book {
    // Create a new book
    static async create(title, author, isbn, available_quantity, shelf_location) {
        const query = `
            INSERT INTO books (title, author, isbn, available_quantity, shelf_location)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [title, author, isbn, available_quantity, shelf_location];
        try {
            const res = await client.query(query, values);
            return res.rows[0];  // Return the newly created book
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error creating book');
        }
    }

    // Get all books
    static async getAll() {
        const query = 'SELECT * FROM books WHERE is_deleted = FALSE;';
        try {
            const res = await client.query(query);
            return res.rows;  // Return all available books
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error fetching books');
        }
    }

    // Soft delete a book
    static async delete(book_id) {
        const query = `
            UPDATE books
            SET is_deleted = TRUE
            WHERE book_id = $1;
        `;
        const values = [book_id];
        try {
            await client.query(query, values);
            return { book_id };  // Return the book_id of the soft-deleted book
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error deleting book');
        }
    }
}

module.exports = Book;

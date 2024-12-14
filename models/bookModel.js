const client = require('../clients/postgresClient');

class Book {
    static async create(title, author, isbn, available_quantity, shelf_location) {
        const query = `
            INSERT INTO books (title, author, isbn, available_quantity, shelf_location)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [title, author, isbn, available_quantity, shelf_location]; 
        try {
            const res = await client.query(query, values);
            return res.rows[0]; 
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
            return res.rows;
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error fetching books');
        }
    }

    static async delete(book_id) {
        const query = `
            UPDATE books
            SET is_deleted = TRUE
            WHERE book_id = $1;
        `;
        const values = [book_id];
        try {
            await client.query(query, values);
            return { book_id };
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error deleting book');
        }
    }
    static async searchByTitle(title) {
        const query = 'SELECT * FROM books WHERE title ILIKE $1 AND is_deleted = FALSE;';
        const values = [`%${title}%`];  // Using ILIKE for case-insensitive search
        try {
            const res = await client.query(query, values);
            return res.rows; 
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error searching books by title');
        }
    }
   
    static async update(book_id, updatedData) {
        let query = 'UPDATE books SET';
        let values = [];
        let counter = 1;

        for (let key in updatedData) {
            if (updatedData[key]) {
                query += ` ${key} = $${counter},`;
                values.push(updatedData[key]);
                counter++;
            }
        }

        query = query.slice(0, -1);
        query += ` WHERE book_id = $${counter} RETURNING *;`;
        values.push(book_id); 

        try {
            const res = await client.query(query, values);
            return res.rows[0]; 
        } catch (err) {
            console.error(err.stack);
            throw new Error('Error updating book');
        }
    }

}

module.exports = Book;

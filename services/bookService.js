const Book = require('../models/bookModel');

class BookService {
    // Add a new book with details
    static async addBook(title, author, isbn, available_quantity, shelf_location) {
        try {
            const newBook = await Book.create(title, author, isbn, available_quantity, shelf_location);
            return newBook;
        } catch (err) {
            console.error(err);
            throw new Error('Error adding the book');
        }
    }

    // Update a book's details
    static async updateBook(book_id, updatedData) {
        try {
            // Update the book in the database
            const updatedBook = await Book.update(book_id, updatedData);
            return updatedBook;
        } catch (err) {
            throw new Error("Error updating the book");
        }
    }

    // Delete a book
    static async deleteBook(book_id) {
        try {
            const result = await Book.delete(book_id);
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('Error deleting the book');
        }
    }

    // List all books
    static async getAllBooks() {
        try {
            const books = await Book.getAll();
            return books;
        } catch (err) {
            console.error(err);
            throw new Error('Error fetching books');
        }
    }

    // Search for a book by title, author, or ISBN
    static async searchBooks(query) {
        try {
            const books = await Book.searchByTitle(query);
            return books;
        } catch (err) {
            console.error(err);
            throw new Error('Error searching for books');
        }
    }
}

module.exports = BookService;

const Book = require('../models/bookModel');

class BookService {
    static async addBook(title, author, isbn, available_quantity, shelf_location) {
        if(!title || !author || !isbn || !available_quantity || !shelf_location){
            throw new Error('All fields are required');
        }
        try {
            const newBook = await Book.create(title, author, isbn, available_quantity, shelf_location);
            return newBook;
        } catch (err) {
            console.error(err);
            throw new Error('Error adding the book');
        }
    }

    static async updateBook(book_id, updatedData) {
        if(!book_id || !updatedData){
            throw new Error('All fields are required');
        }
        try {
            const updatedBook = await Book.update(book_id, updatedData);
            return updatedBook;
        } catch (err) {
            throw new Error("Error updating the book");
        }
    }

    static async deleteBook(book_id) {
        if(!book_id){
            throw new Error('All fields are required');
        }
        try {
            const result = await Book.delete(book_id);
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('Error deleting the book');
        }
    }

    static async getAllBooks() {
        try {
            const books = await Book.getAll();
            return books;
        } catch (err) {
            console.error(err);
            throw new Error('Error fetching books');
        }
    }

    static async searchBooks(query) {
        if(!query){
            throw new Error('All fields are required');
        }
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

const chai = require("chai");
const { expect } = chai;
var sinon = require("sinon");

const Book = require('../models/bookModel');

const BookService = require("../services/bookService");

const expectedBookFromTitle = { title: "Book", ISBN: "12345" , author : "author"};
sinon.stub(Book, "searchByTitle").resolves(expectedBookFromTitle);

const expectedBooks = [ 
    { title: "Book1", ISBN: "12345" , author : "author1"},
    { title: "Book2", ISBN: "22345" , author : "author2"}
];
sinon.stub(Book, "getAll").resolves(expectedBooks);

describe("BookService Tests", () => {
    describe("getAllBooks", () => {
        it("should return all books", async () => {
            const result = await BookService.getAllBooks();
            expect(result).to.deep.equal(expectedBooks);
        });
    });
    describe("searchForBook", () => {
        it("should return a book by title", async () => {
            const query = { title: "Book" };
            const result = await BookService.searchBooks(query);
            expect(result).to.deep.equal(expectedBookFromTitle);
        });
    });
});
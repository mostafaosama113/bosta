CREATE TABLE IF NOT EXISTS borrowers (
    borrower_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    registered_date DATE DEFAULT CURRENT_DATE,
    is_deleted BOOLEAN DEFAULT FALSE -- Soft delete flag
);

CREATE TABLE IF NOT EXISTS Books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150) NOT NULL,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    available_quantity INT NOT NULL CHECK (available_quantity >= 0),
    shelf_location VARCHAR(50),
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS Borrowing_Process (
    borrowing_id SERIAL PRIMARY KEY,
    borrower_id INT NOT NULL,
    book_id INT NOT NULL,
    borrowed_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,
    is_deleted BOOLEAN DEFAULT FALSE 
);


INSERT INTO borrowers (first_name, last_name, email, password) 
VALUES 
('John', 'Doe', 'john.doe@example.com', 'password123'),
('Jane', 'Smith', 'jane.smith@example.com', 'password456'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'password789');

INSERT INTO Books (title, author, isbn, available_quantity, shelf_location) 
VALUES 
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 5, 'A1'),
('1984', 'George Orwell', '9780451524935', 10, 'B2'),
('To Kill a Mockingbird', 'Harper Lee', '9780061120084', 3, 'C3');

INSERT INTO Borrowing_Process (borrower_id, book_id, due_date, return_date) 
VALUES 
(1, 1, '2024-12-21', NULL),
(2, 2, '2024-12-15', '2024-12-10'),
(3, 3, '2024-12-20', NULL);
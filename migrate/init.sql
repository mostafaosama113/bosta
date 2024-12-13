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

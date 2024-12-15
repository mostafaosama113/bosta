
# Bosta - Library Management System

## Project Overview

Bosta is a simple library management system designed to efficiently manage books and borrowers. It provides a set of features to manage books, borrowers, and reservations, while leveraging modern technologies for a robust and scalable solution.

## Technology Stack

Our solution is built with cutting-edge technologies to ensure reliability and performance:

- **JavaScript (with Static Typing)**: Enhancing the robustness of the application with TypeScript.
- **Express**: A minimalistic and fast web framework for Node.js, powering the backend.
- **PostgreSQL**: A reliable relational database management system for storing book and borrower data.
- **Docker**: Used for containerizing the application for a consistent and isolated development environment.

## System Features

The library management system includes the following primary features:

- **Add Books**: Allows you to add books with details such as title, author, ISBN, available quantity, and shelf location.
- **Modify Books**: Update book details or remove books from the system.
- **Search Books**: Search for books by title only to locate available inventory.
- **Register Borrowers**: Register borrowers with essential details like name, email, and registration date.
- **Modify Borrowers**: Update borrower details or remove them from the system.
- **Reservations**: Track which books are currently borrowed and allow borrowers to return books.
   - **Export Borrowing Processes for Last Month**: The system can export all borrowing process data for the last month.
   - **Export Overdue Borrows for Last Month**: The system can export all overdue borrows for the last month.

### Analysis

- **Data Storage:** The system relies on PostgreSQL to store all data, including books and borrowers, with an emphasis on efficient retrieval for search and listing operations.
- **Rate Limiting:** To avoid overloading the system, rate limiting is applied to two key endpoints, ensuring smooth performance even under high usage.
- **Authentication and Security:** Basic authentication is implemented to restrict unauthorized access. SQL injection protection is provided by using parameterized queries to ensure the safety of user input.
- **Error Handling:** The system gracefully handles errors and provides meaningful feedback to users, helping identify and resolve issues quickly.

## Requirements

To set up the system locally, ensure you have the following installed:

- **Docker** and **Docker Compose**: For containerization of the application.
- **Git**: For cloning the repository and managing the project's source code.

## Installation Guide

Follow the steps below to set up the project on your local machine:

1. Ensure that **Docker**, **Docker Compose**, and **Git** are installed on your system.
2. Clone the repository:
   ```bash
   git clone https://github.com/mostafaosama113/bosta
   ```
3. Navigate to the project directory:
   ```bash
   cd bosta
   ```
4. Start the containers:
   ```bash
   docker-compose up -d
   ```

The application will now be listening for requests at [http://localhost:3000/](http://localhost:3000/).

You can access the API documentation at [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

## Docker Containers

The application uses the following Docker containers:

- **PostgreSQL**: Stores all the data related to books and borrowers.
- **Node.js (Express)**: Handles backend logic and serves the API.

## Additional Features

- **Security**: The application uses raw SQL queries, which are protected against SQL injection attacks by ensuring that input values are treated as data, not executable commands. This approach leverages parameterized queries to safeguard the system from malicious input.

- **Soft Delete**: Instead of permanently deleting records, a soft delete is implemented by updating a column, making it possible to retain data for future use if needed.

---

## Completed Tasks

### Functional Requirements:
1. **Books:**
   - Added a book with details like title, author, ISBN, available quantity, and shelf location.
   - Updated a book's details.
   - Deleted a book.
   - Listed all books.
   - Enabled searching for a book by title.

2. **Borrowers:**
   - Registered a borrower with details like name, email, and registered date.
   - Updated borrower’s details.
   - Deleted a borrower.
   - Listed all borrowers.

3. **Borrowing Process:**
   - A borrower can check out a book, and the system tracks which books are checked out and by whom.
   - A borrower can return a book.
   - A borrower can check the books they currently have.
   - The system tracks due dates for the books and lists books that are overdue.

### Bonus Features:
1. **Rate Limiting:** Implemented rate limiting for the API to prevent abuse on two selected endpoints.
2. **Dockerization:** Dockerized the application using Docker Compose.
3. **Basic Authentication:** Implemented basic authentication for the API.
4. **Unit Tests:** Added unit tests for one module (the module for book management).


# Library Management API

This API is designed to manage the borrowing and analysis of books in a library system.

## API Endpoints

### **Borrowers**

#### 1. **Register a new borrower**
- **Method:** `POST`
- **URL:** `/api/borrower/register`

#### 2. **Log in an existing borrower**
- **Method:** `POST`
- **URL:** `/api/borrower/login`

#### 3. **Update an existing borrower's information**
- **Method:** `PUT`
- **URL:** `/api/borrower`

#### 4. **Delete a borrower**
- **Method:** `DELETE`
- **URL:** `/api/borrower`

#### 5. **Get all borrowers**
- **Method:** `GET`
- **URL:** `/api/borrower`

---

### **Borrowing**

#### 1. **Checkout a book**
- **Method:** `POST`
- **URL:** `/api/borrowing/`

#### 2. **Return a borrowed book**
- **Method:** `PUT`
- **URL:** `/api/borrowing/return`

#### 3. **Get all current borrowed books**
- **Method:** `GET`
- **URL:** `/api/borrowing/books`

#### 4. **Get all overdue books for a borrower**
- **Method:** `GET`
- **URL:** `/api/borrowing/overdueBooks`
- **Query parameter:** `currentDate` (required, date format)

#### 5. **Get the number of available copies left for a book**
- **Method:** `GET`
- **URL:** `/api/borrowing/left/{bookId}`

---

### **Analysis**

#### 1. **Export overdue borrows from the last month**
- **Method:** `GET`
- **URL:** `/api/borrowing/overDueLastMonth`

#### 2. **Export borrowing processes from the last month**
- **Method:** `GET`
- **URL:** `/api/borrowing/processesLastMonth`

---

### API Documentation

- **Borrowing API Tag**: Managing the borrowing process.

#### **Borrowing Endpoints**

1. **Checkout a book**
    - **Method:** `POST`
    - **Request Body:**
        ```json
        {
            "bookId": "string",
            "dueDate": "date"
        }
        ```
    - **Responses:**
        - `201`: Successfully checked out the book.
        - `400`: Error during book checkout.

2. **Return a borrowed book**
    - **Method:** `PUT`
    - **Request Body:**
        ```json
        {
            "borrowingId": "string",
            "returnDate": "date"
        }
        ```
    - **Responses:**
        - `200`: Successfully returned the book.
        - `400`: Error during book return.

3. **Get all current borrowed books**
    - **Method:** `GET`
    - **Responses:**
        - `200`: List of current borrowed books.
        - `400`: Error fetching current borrowed books.

4. **Get all overdue books for a borrower**
    - **Method:** `GET`
    - **Query Parameter:** `currentDate` (required, date format)
    - **Responses:**
        - `200`: List of overdue books.
        - `400`: Error fetching overdue books.

5. **Get the number of available copies left for a book**
    - **Method:** `GET`
    - **Parameters:**
        - `bookId` (required)
    - **Responses:**
        - `200`: Number of available copies.
        - `400`: Error fetching books left.

#### **Analysis Endpoints**

1. **Export overdue borrows from the last month**
    - **Method:** `GET`
    - **Responses:**
        - `200`: Successfully exported overdue borrows from the last month.
        - `400`: Error occurred while exporting overdue borrows.

2. **Export borrowing processes from the last month**
    - **Method:** `GET`
    - **Responses:**
        - `200`: Successfully exported borrowing processes from the last month.
        - `400`: Error occurred while exporting borrowing processes.

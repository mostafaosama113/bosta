# Bosta - Library Management System

## Project Overview

Bosta is a simple library management system designed to efficiently manage books and borrowers. It provides a set of features to manage books, borrowers, and reservations, while leveraging modern technologies for a robust and scalable solution.

## Technology Stack

Our solution is built with cutting-edge technologies to ensure reliability and performance:

- **JavaScript (with Static Typing)**: Enhancing the robustness of the application with TypeScript.
- **Express**: A minimalistic and fast web framework for Node.js, powering the backend.
- **PostgreSQL**: A reliable relational database management system for storing book and borrower data.
- **Docker**: Used for containerizing the application for a consistent and isolated development environment.
- **Rate Limiter**: Controls the number of requests made per minute to prevent overloading the system.

## System Features

The library management system includes the following primary features:

- **Add Books**: Allows you to add books with details such as title, author, ISBN, available quantity, and shelf location.
- **Modify Books**: Update book details or remove books from the system.
- **Search Books**: Search for books by title, author, or ISBN to locate available inventory.
- **Register Borrowers**: Register borrowers with essential details like name, email, and registration date.
- **Modify Borrowers**: Update borrower details or remove them from the system.
- **Reservations**: Track which books are currently borrowed and allow borrowers to return books.

## Requirements

To set up the system locally, ensure you have the following installed:

- **Docker**: For containerization of the application.

## Installation Guide

Follow the steps below to set up the project on your local machine:

1. Ensure that **Docker** and **Docker Compose** are installed on your system.
2. Clone the repository:
   ```bash
   gh repo clone mostafaosama113/bosta
   ```
3. Navigate to the project directory:
   ```bash
   cd bosta
   ```
4. Build the Docker image:
   ```bash
   docker build -t my-node-app .
   ```
5. Start the containers:
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

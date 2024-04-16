# Bookshelf API

This is a simple RESTful API for managing a collection of books.

## Introduction

The Bookshelf API provides endpoints to perform CRUD operations on a collection of books. It allows users to add new books, retrieve all books or specific books, edit existing books, and delete books.

## Features
Add a new book
Retrieve all books or specific books based on name, reading status, or completion status
Retrieve a specific book by ID
Edit an existing book
Delete a book

## Requirements
* Node.js
* npm (Node Package Manager)
* @hapi/hapi package
* nanoid package

## Endpoints
* POST /books - Add a new book
* GET /books - Retrieve all books or filter books by name, reading status, or completion status
* GET /books/{bookId} - Retrieve a specific book by ID
* PUT /books/{bookId} - Edit an existing book
* DELETE /books/{bookId} - Delete a book

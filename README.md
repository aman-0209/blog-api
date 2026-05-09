# Blog API

A REST API built with Node.js, Express, PostgreSQL and Prisma.

## Live API

https://blog-api-9h4i.onrender.com

## Features

- JWT Authentication (register & login)
- Posts CRUD
- Comments
- Authorization (only edit/delete your own content)
- Pagination
- Zod Input Validation

## Tech Stack

- Node.js & Express
- PostgreSQL & Prisma ORM
- JWT & bcrypt
- Zod
- dotenv

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repo
   git clone https://github.com/aman-0209/blog-api.git

2. Install dependencies
   npm install

3. Set up environment variables
   cp .env.example .env
   Add your DATABASE_URL and JWT_SECRET

4. Push database schema
   npx prisma db push

5. Start the server
   node src/index.js

## API Endpoints

### Auth

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login and get token |

### Posts

| Method | Endpoint       | Description                   |
| ------ | -------------- | ----------------------------- |
| GET    | /api/posts     | Get all posts (paginated)     |
| GET    | /api/posts/:id | Get a single post             |
| POST   | /api/posts     | Create a post (auth required) |
| PATCH  | /api/posts/:id | Update a post (auth required) |
| DELETE | /api/posts/:id | Delete a post (auth required) |

### Comments

| Method | Endpoint                               | Description                      |
| ------ | -------------------------------------- | -------------------------------- |
| GET    | /api/posts/:postId/comments            | Get all comments                 |
| POST   | /api/posts/:postId/comments            | Add a comment (auth required)    |
| DELETE | /api/posts/:postId/comments/:commentId | Delete a comment (auth required) |

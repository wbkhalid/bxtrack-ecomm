# E-Commerce Platform

This project is a basic e-commerce platform built with **React** for the frontend and **Express** for the backend. It features user authentication, product management (CRUD), cart and order processing, and a secure API connected to a **MongoDB** database.

## Table of Contents
- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Technologies Used](#technologies-used)

## Project Overview
The e-commerce platform provides:

- A **responsive frontend** where users can browse products, add them to the cart, and place orders.
- **User authentication**: Signup, login, and JWT-based session management.
- **Admin features** to create, update, and delete products.
- **Cart and order management** for users.
- A **backend API** that handles product, user, and order-related requests.
- **MongoDB** as the database for persistent storage.

## Setup Instructions

### Prerequisites:
1. **Node.js** (version 16 or higher)
2. **MongoDB** (either local or use MongoDB Atlas)
3. **NPM** or **Yarn** (to install dependencies)

### Steps:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/wbkhalid/bxtrack-ecomm.git
   cd bxtrack-ecomm

2. **Frontend**:
   ```bash
   cd frontend
   npm run dev

2. **Frontend**:
   ```bash
   cd backend
   npm run dev
   
## Technologies Used

Frontend:
- React: For building the UI.
- Tailwind CSS: Component library for styling.
- React Router: For client-side routing.
- Redux: State management.
- Axios: HTTP client for API requests.

Backend:
- Express: Backend framework for creating RESTful APIs.
- MongoDB: NoSQL database for storing users, products, and orders.
- Mongoose: Object Data Modeling (ODM) library for MongoDB.
- Bcrypt: password encoding
- JWT: For secure authentication.

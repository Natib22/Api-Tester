
---

# API Tester

Built a high-speed API testing tool using the Model-View-Controller (MVC) pattern. This project allows users to securely test API endpoints, with support for multiple request types and JWT-based authorization. It is designed to offer faster response times and greater ease of use compared to other tools, with the app having tested over 100 endpoints.

## Core Features

- **Request Types**: Supports multiple request methods, including GET, POST, PUT, DELETE, etc.
- **Headers and Authorization**: Includes support for custom headers and JWT authentication.
- **Endpoint History**: Saves and retrieves previously tested endpoints, making it easy to re-test and monitor requests.
- **MVC Architecture**: Built with the Model-View-Controller (MVC) pattern for modularity and maintainability.
- **High-Speed Performance**: Optimized for faster response times and ease of use compared to traditional API testing tools.

## Tech Stack

### Frontend

- **Next.js** (v14.2.14)
- **React** (v18)
- **Redux Toolkit** (v2.2.8)
- **React Hook Form** (v7.53.1)
- **Tailwind CSS** (v3.4.1)
- **DaisyUI** (v4.12.12)
- **NextAuth.js** (v4.24.10)

### Backend

- **Express** (v4.21.1)
- **MongoDB** with **Mongoose** (v8.7.3)
- **JSON Web Token (JWT)** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment configuration
- **Validator** for data validation

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Natib22/apitester.git
   cd apitester
   ```

2. **Install Dependencies**:

   - **Frontend**:

     ```bash
     cd frontend
     npm install
     ```

   - **Backend**:

     ```bash
     cd backend
     npm install
     ```



4. **Environment Variables**:

   Create `.env` files in both the `frontend` and `backend` directories. See [Environment Variables](#environment-variables) for details.

## Environment Variables

### Backend (`backend/.env`)

- `PORT`: Port for backend server (e.g., 5000)
- `MONGO_URI`: MongoDB URI for database connection
- `JWT_SECRET`: Secret key for JWT signing
- `COOKIE_SECRET`: Secret key for cookies

### Frontend (`frontend/.env.local`)

- `NEXT_PUBLIC_API_URL`: Base URL for API endpoints


## Usage

### Development

1. **Run the Backend**:

   ```bash
   cd backend
   npm run dev
   ```

2. **Run the Frontend**:

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend should be running at `http://localhost:3000` and the backend at `http://localhost:5500`.

### Production

1. **Build the Frontend**:

   ```bash
   cd frontend
   npm run build
   npm start
   ```

2. **Serve the Backend**:

   ```bash
   cd backend
   npm start
   ```

## Folder Structure

```plaintext
apitester/
├── frontend/
│   ├── public/               # Public assets
│   ├── src/                  # Main application code
│   ├── .env.local            # Environment variables for frontend
│   └── package.json          # Frontend dependencies and scripts
└── backend/
    ├── models/               # Mongoose models
    ├── routes/               # Express routes
    ├── middlewares/          # JWT authentication middleware
    ├── server.js             # Main server file
    ├── .env                  # Environment variables for backend
    └── package.json          # Backend dependencies and scripts
```

## Scripts

### Frontend

- `npm run dev`: Start the development server.
- `npm run build`: Build for production.
- `npm start`: Start the production server.
- `npm run lint`: Run ESLint checks.

### Backend

- `npm run dev`: Start the backend with Nodemon for development.
- `npm start`: Run the backend in production mode.

## License

This project is licensed under the MIT License.

---


# 🛒 E-Commerce Platform

A full-stack E-Commerce web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

The application provides user authentication, product listing, and product management with a React frontend and Express REST API.

## 🌐 Live Demo

- **Frontend:** https://e-comm-platform-flax.vercel.app
- **Backend:** https://ecomm-platform-backend-5uld.onrender.com

## ✨ Features

- User registration and login.
- JWT-based authentication.
- Access token and refresh token authentication.
- HTTP-only cookies for refresh token storage.
- Automatic access token refresh.
- Protected API routes.
- Display all available products.
- View individual product details.
- Create new products.
- Update existing products.
- Delete products.
- MongoDB Atlas database integration.
- Responsive user interface.
- React Router navigation.

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- TanStack React Query
- React Hook Form
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Cookie Parser
- Express Validator
- CORS

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Version Control: Git & GitHub


## 🔗 API Documentation

**Base URL (Local):**
```text
http://localhost:3000
```

**Base URL (Production):**
```text
https://ecomm-platform-backend-5uld.onrender.com
```

### Authentication APIs

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get logged-in user details | Yes |
| POST | `/api/auth/refresh-token` | Generate a new access token | Refresh cookie |
| POST | `/api/auth/logout` | Logout user | Yes |

### Product APIs

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/:id` | Get a single product | No |
| POST | `/api/products` | Create a new product | Yes |
| PUT | `/api/products/:id` | Update a product | Yes |
| DELETE | `/api/products/:id` | Delete a product | Yes |

### Authentication Notes

- Protected endpoints require a valid access token in the Authorization header.
- Access tokens are sent using the Bearer token format.
- Refresh tokens are stored in HTTP-only cookies.
- The refresh-token endpoint uses the cookie to generate a new access token.
- Login and refresh-token requests must support credentials.

Example Authorization header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB Atlas account or a local MongoDB database
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/AbuTurab7/E_comm_platform.git
```

Navigate to the project directory:

```bash
cd E_comm_platform
```

### 2. Backend Setup

Navigate to the Backend folder:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the Backend folder:

```env
PORT=3000
NODE_ENV=development

CLIENT_URL=http://localhost:5173

MONGO_URI=your_mongodb_connection_string

ACCESS_SECRET=your_access_token_secret
REFRESH_SECRET=your_refresh_token_secret
```

Start the backend development server:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:3000
```

### 3. Frontend Setup

Open another terminal from the project root:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.development` file inside the Frontend folder:

```env
VITE_API_URL=
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

### 4. Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `NODE_ENV` | Application environment |
| `CLIENT_URL` | Frontend URL allowed by CORS |
| `MONGO_URI` | MongoDB connection string |
| `ACCESS_SECRET` | Secret key for access tokens |
| `REFRESH_SECRET` | Secret key for refresh tokens |
| `VITE_API_URL` | Backend API base URL |

**Important:** Never upload `.env` files, database credentials, or JWT secrets to GitHub.

## 🚀 Deployment

The application is deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

Production environment variables are configured separately on the hosting platforms.

## 👨‍💻 Author

**Abu Turab**

---

⭐ If you find this project useful, consider giving it a star!
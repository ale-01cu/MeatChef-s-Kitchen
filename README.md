# MeatChef's Kitchen

MeatChef's Kitchen is a comprehensive full-stack application designed as an online platform for a premium butcher shop. It combines an e-commerce system for meat products with a learning management system for cooking courses. The platform serves various user roles, including customers, staff, teachers, and administrators, each with tailored permissions and functionalities.

The project is divided into two main parts:
- **Backend:** A robust RESTful API built with FastAPI, handling business logic, data persistence, and user authentication.
- **Frontend:** A modern, responsive single-page application (SPA) built with React and Vite, providing a rich user interface and experience.

---

## Features

### General
- **Role-Based Access Control:** Differentiated user experiences for Clients, Staff, Teachers, and Superusers.
- **Authentication:** Secure user registration and JWT-based login system.
- **User Profiles:** Users can view and manage their profile information, including updating their avatar.

### E-Commerce (Meats)
- **Product Catalog:** Browse and search for meat products.
- **Categorization:** Products are organized into categories for easy navigation.
- **Shopping Cart:** Add products to a cart, update quantities, and place orders.
- **Standard Orders:** A complete checkout process for standard product purchases.
- **Custom Orders:** Users can place orders with custom descriptions and quantities.
- **Order Management:** Staff and admins can view and manage pending and processed orders.

### Learning Platform (Courses)
- **Course Listing:** View and search for available cooking courses.
- **Course Details:** Access detailed information for each course, including video content.
- **Video Streaming:** Integrated video player for course content.
- **Course Management:** Teachers and admins can create, update, and delete courses.
- **Favorites:** Users can mark courses as favorites for easy access.

### Admin & Staff Features
- **User Management:** Admins can create, view, update, and delete users and their roles.
- **Sales Dashboard:** Admins can view sales statistics, including the most sold products and top buyers.
- **Order Processing:** Staff can manage the status of all incoming orders (standard and custom).

---

## Tech Stack

| Area      | Technology                                                              |
|-----------|-------------------------------------------------------------------------|
| **Backend**   | Python, FastAPI, SQLAlchemy, Pydantic, PostgreSQL, JWT, Uvicorn         |
| **Frontend**  | React, Vite, NextUI, Tailwind CSS, Wouter, Formik, Yup, React Toastify |
| **Testing**   | Pytest (Backend)                                                        |

---

## Project Structure

The project is organized into two main directories: `backend` and `frontend`.

### Backend Structure (`/backend`)
```
/backend
├── app/
│   ├── cruds/        # CRUD database operations
│   ├── errors/       # Custom exception classes
│   ├── middlewares/  # Request middleware (auth, permissions)
│   ├── models/       # SQLAlchemy database models
│   ├── routers/      # API endpoint definitions (FastAPI routers)
│   ├── schemas/      # Pydantic data validation schemas
│   └── utils/        # Utility functions (password hashing, JWT, file handling)
├── media/          # Directory for storing user-uploaded files (images, videos)
├── settings/       # Project and database configuration
├── tests/          # Backend tests
└── main.py         # Main FastAPI application entrypoint
```

### Frontend Structure (`/frontend`)
```
/frontend
├── public/         # Static assets
└── src/
    ├── assets/       # Static assets like SVGs
    ├── components/   # Reusable React components
    ├── contexts/     # React Context providers (e.g., AuthContext)
    ├── hooks/        # Custom React hooks (e.g., useAuth, useRoles)
    ├── pages/        # Page components corresponding to routes
    ├── permissions/  # Frontend permission checking logic
    ├── routes/       # Application routing configuration (Wouter)
    ├── services/     # Functions for making API calls to the backend
    ├── utils/        # Utility functions and constants
    └── validations/  # Form validation schemas (Yup)
```

---

## Setup and Installation

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL

### Backend Setup
1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Database Configuration:**
    - Ensure your PostgreSQL server is running.
    - Update the database connection string in `backend/settings/db.py` if necessary.
    ```python
    # backend/settings/db.py
    SQLALCHEMY_DATABASE_URL = "postgresql://user:password@host:port/dbname"
    ```
5.  **Run the server:**
    The application uses `uvicorn` to run the FastAPI server.
    ```bash
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```
    The backend API will be available at `http://localhost:8000`.

### Frontend Setup
1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173`.

---

## API Endpoints

The backend provides a RESTful API with the following primary resources:

-   `/login`, `/register`: User authentication.
-   `/users`: User management (CRUD for admins).
-   `/profile`: User profile data.
-   `/meat-products`: E-commerce products (CRUD).
-   `/category`: Product categories (CRUD).
-   `/course`: Course management (CRUD).
-   `/standard-order`: Handling of standard product orders.
-   `/custom-order`: Handling of custom user orders.
-   `/sales`: Sales statistics and analytics.

Each endpoint is protected by role-based permissions where applicable.

## Frontend Scripts

The following scripts are available in the `frontend` directory:

-   `npm run dev`: Starts the Vite development server.
-   `npm run build`: Builds the application for production.
-   `npm run lint`: Lints the codebase using ESLint.
-   `npm run preview`: Serves the production build locally.
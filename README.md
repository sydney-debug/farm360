# Farm360 - Farm Management System

Farm360 is a comprehensive farm management application built with the PERN stack (PostgreSQL, Express, React, Node.js). It helps farmers, managers, and veterinarians manage farm operations efficiently.

## Features

- User authentication with role-based access (Farmer, Manager, Veterinarian)
- Animal and calf tracking
- Veterinarian directory with geolocation and contact sharing
- Animal and crop health records with attachment support
- Inventory management
- Sales tracking
- Expense management
- Profit/loss reporting

## Project Structure

```
farm360/
├── backend/           # Node.js + Express backend
│   ├── config/        # Configuration files
│   ├── controllers/   # Request handlers
│   ├── db/            # Database migrations and seeds
│   ├── middleware/    # Express middleware
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   └── utils/         # Utility functions
│
├── frontend/          # Vanilla HTML/CSS/JS frontend
│   ├── assets/        # Static assets (images, fonts)
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript files
│   └── index.html     # Main HTML file
│
└── docs/              # Documentation
    └── operations.md  # Operations documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Git

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/farm360.git
   cd farm360
   ```

2. Set up the backend
   ```
   cd backend
   npm install
   cp .env.example .env  # Create and configure your environment variables
   npm run migrate       # Run database migrations
   npm run seed          # Seed the database with initial data
   ```

3. Set up the frontend
   ```
   cd ../frontend
   # No installation needed for vanilla HTML/CSS/JS
   ```

4. Start the development servers
   ```
   # In the backend directory
   npm run dev
   
   # For the frontend, you can use any static file server
   # For example, with Node.js http-server:
   npx http-server ../frontend
   ```

## Deployment

### Backend (Railway)

1. Create a new project on Railway
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy the backend service

### Frontend (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Configure environment variables to point to your Railway backend
4. Deploy the frontend

## License

This project is licensed under the MIT License - see the LICENSE file for details.
# Personal Finance Tracker

A comprehensive mobile application for personal finance management, featuring a React Native frontend and Node.js/Express backend. This application helps users track their income, expenses, budgets, and financial goals on the go.

## Project Overview

The Personal Finance Tracker is a full-stack mobile application that enables users to:
- Manage income and expenses
- Set and track budgets
- Visualize financial data through charts and graphs
- Handle recurring transactions
- Receive budget alerts
- Access their financial data securely

## Technology Stack

### Backend
- Node.js with Express
- MongoDB (Atlas)
- JWT for authentication
- Jest for testing

### Frontend (Mobile)
- React Native
- Expo
- Axios for API communication
- React Navigation
- Victory Native for data visualization

## Project Structure

```
finance-tracker/
├── finance-tracker-backend/    # Node.js/Express backend
│   ├── config/                # Configuration files
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── tests/              # Test files
│   └── utils/              # Utility functions
│
└── finance-tracker-mobile/   # React Native mobile app
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── screens/       # Screen components
    │   ├── navigation/    # Navigation configuration
    │   ├── services/     # API services
    │   ├── store/        # State management
    │   └── utils/        # Utility functions
    └── assets/          # Images and fonts
```

## Features

### User Management
- User registration and login
- JWT-based authentication
- Secure password handling
- Profile management

### Transaction Management
- CRUD operations for transactions
- Transaction categorization
- Recurring transactions
- Transaction history and search

### Budget Management
- Budget setting by category
- Spending limits
- Budget alerts
- Progress tracking

### Data Visualization
- Income vs Expenses charts
- Category-wise spending breakdown
- Budget progress visualization
- Monthly/yearly trends

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd finance-tracker-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Mobile App Setup

1. Navigate to the mobile app directory:
   ```bash
   cd finance-tracker-mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details

### Transaction Endpoints
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions/:id` - Get single transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction

### Budget Endpoints
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create a budget
- `PUT /api/budgets/:id` - Update a budget
- `DELETE /api/budgets/:id` - Delete a budget
- `GET /api/budgets/alerts` - Get budget alerts

## Testing

### Backend Testing
```bash
cd finance-tracker-backend
npm test
```

### Mobile App Testing
```bash
cd finance-tracker-mobile
npm test
```

## Deployment

### Backend Deployment
The backend is deployed on [platform] and can be accessed at [URL].

### Mobile App Deployment
- iOS: TestFlight link [to be added]
- Android: Google Play internal testing link [to be added]
- Expo: [Expo link to be added]

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
# Subscription Tracker 🚀

A powerful and intuitive subscription management system built with Node.js, Express, and MongoDB. Keep track of all your subscriptions in one place, get renewal reminders, and manage your expenses effectively.

![Subscription Tracker](https://img.shields.io/badge/version-1.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)
![Express](https://img.shields.io/badge/Express-4.x-green)
![Arcjet](https://img.shields.io/badge/Arcjet-1.0.0-blue)

## ✨ Features

- **User Authentication**
  - Secure signup and login with JWT
  - Role-based access control (Admin & User)
  - Password hashing with bcrypt

- **Subscription Management**
  - Add, edit, and delete subscriptions
  - Track subscription status (active, cancelled, expired)
  - Set custom renewal frequencies (daily, weekly, monthly, yearly)
  - Multiple currency support (USD, EUR, GBP, INR)

- **Smart Features**
  - Automatic renewal date calculation
  - Upcoming renewal notifications
  - Subscription categorization
  - Payment method tracking

- **Security**
  - JWT-based authentication
  - Protected routes
  - Input validation
  - Error handling middleware
  - Arcjet-powered security features:
    - Rate limiting (5 requests per 10 seconds)
    - Bot detection and protection
    - IP-based request tracking
    - Shield mode for production protection

## 🛠️ Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - bcrypt for password hashing
  - Arcjet for API security and rate limiting

- **Development Tools**
  - ESLint for code linting
  - Nodemon for development
  - dotenv for environment variables

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## 🚀 Installation

1. Clone the repository
```bash
git clone https://github.com/vivek-2567/Subscription-Tracker-Backend.git
cd subscription-tracker
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
NODE_ENV=<production/dev>
PORT=5500
DB_URI=<your mongo db uri>
JWT_SECRET=
JWT_EXPIRES_IN="1d"
ARCJET_KEY=<arcjet key>
```

4. Start the development server
```bash
npm run dev
```

## 🌐 Deployment

The backend is deployed and can be accessed at [https://subscription-tracker-backend.onrender.com](https://subscription-tracker-backend.onrender.com)

## 📚 API Documentation

### Authentication

- `POST /api/v1/auth/sign-up` - Register a new user
- `POST /api/v1/auth/sign-in` - Login user
- `POST /api/v1/auth/sign-out` - Logout user

### Subscriptions

- `POST /api/v1/subscriptions` - Create a new subscription
- `GET /api/v1/subscriptions` - Get all subscriptions (Admin only)
- `GET /api/v1/subscriptions/user` - Get user's subscriptions
- `GET /api/v1/subscriptions/:id` - Get subscription by ID
- `PUT /api/v1/subscriptions/:id` - Update subscription
- `DELETE /api/v1/subscriptions/:id` - Delete subscription
- `PUT /api/v1/subscriptions/:id/cancel` - Cancel subscription
- `GET /api/v1/subscriptions/upcoming` - Get upcoming renewals

### Users

- `GET /api/v1/users` - Get all users (Admin only)
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## 📦 Project Structure

```
subscription-tracker/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── database/         # Database connection
├── middlewares/      # Custom middlewares
├── models/           # Mongoose models
├── routes/           # API routes
├── .env              # Environment variables
├── .gitignore        # Git ignore file
├── app.js            # Main application file
├── package.json      # Project dependencies
└── README.md         # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Arcjet](https://arcjet.com/) for API security and protection

## 📞 Contact

If you have any feedback please reach out to me @ vivekgoel0207@gmail.com



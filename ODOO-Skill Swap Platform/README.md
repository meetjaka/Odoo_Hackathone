# Skill Swap Platform

A full-stack web application that allows users to exchange skills with each other. Users can offer their skills and request skills from others, creating a community of skill sharing.

## Features

- **User Authentication**: Register, login, and manage user profiles
- **Skill Management**: Add, view, and manage skills offered and wanted
- **User Discovery**: Browse and search for users with specific skills
- **Request System**: Send and manage skill swap requests
- **Rating System**: Rate users after completing skill exchanges
- **Real-time Updates**: Live updates for requests and user data
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **CORS** for cross-origin requests

### Frontend
- **React** with TypeScript
- **React Router** for navigation
- **Axios** for API communication
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd skill-swap-platform
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp config.env.example config.env
# Edit config.env with your MongoDB URI and JWT secret

# Start MongoDB (if running locally)
# Make sure MongoDB is running on localhost:27017

# Seed the database with initial data
node seed.js

# Start the development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## Environment Variables

Create a `config.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skill-swap
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Users
- `GET /api/users` - Get all users (with pagination and filters)
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/name/:name` - Get user by name
- `POST /api/users/:id/rate` - Rate a user

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/categories` - Get skill categories
- `GET /api/skills/popular` - Get popular skills
- `POST /api/skills` - Create new skill (admin)
- `PUT /api/skills/:id/usage` - Update skill usage count

### Requests
- `GET /api/requests` - Get user's requests
- `POST /api/requests` - Create new request
- `PUT /api/requests/:id/status` - Update request status
- `PUT /api/requests/:id/complete` - Complete request with rating
- `GET /api/requests/:id` - Get request by ID

## Database Schema

### User Model
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `avatar` (String, optional)
- `bio` (String, optional)
- `location` (String, optional)
- `availability` (String, enum)
- `rating` (Number, default: 0)
- `totalRatings` (Number, default: 0)
- `skillsOffered` (Array of Strings)
- `skillsWanted` (Array of Strings)
- `isVerified` (Boolean, default: false)
- `isActive` (Boolean, default: true)

### Skill Model
- `name` (String, required, unique)
- `category` (String, required, enum)
- `description` (String, optional)
- `isActive` (Boolean, default: true)
- `usageCount` (Number, default: 0)

### Request Model
- `fromUser` (ObjectId, ref: User, required)
- `toUser` (ObjectId, ref: User, required)
- `skillsOffered` (Array of Strings, required)
- `skillsWanted` (Array of Strings, required)
- `message` (String, optional)
- `status` (String, enum: pending, accepted, rejected, completed, cancelled)
- `responseMessage` (String, optional)
- `completedAt` (Date, optional)
- `rating` (Number, optional)
- `review` (String, optional)

## Usage

1. **Register/Login**: Create an account or sign in
2. **Complete Profile**: Add your skills offered and wanted
3. **Browse Users**: Search for users with skills you want
4. **Send Requests**: Request skill exchanges from other users
5. **Manage Requests**: Accept, reject, or complete incoming requests
6. **Rate Users**: Rate users after completing exchanges

## Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server
```

### Database Seeding
```bash
cd backend
node seed.js  # Populates database with sample data
```

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in environment variables
2. Use a production MongoDB instance
3. Set a strong JWT secret
4. Use a process manager like PM2

### Frontend
1. Build the application: `npm run build`
2. Serve the built files using a web server like Nginx
3. Update API base URL for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team. 
#!/bin/bash

echo "🚀 Setting up Skill Swap Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Backend setup
echo "📦 Setting up backend..."
cd backend

# Install dependencies
echo "Installing backend dependencies..."
npm install

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if ! node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/skill-swap').then(() => { console.log('MongoDB is running'); process.exit(0); }).catch(() => { console.log('MongoDB is not running'); process.exit(1); });" 2>/dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   You can install MongoDB locally or use MongoDB Atlas."
    echo "   For local installation: https://docs.mongodb.com/manual/installation/"
    echo "   For MongoDB Atlas: https://www.mongodb.com/cloud/atlas"
fi

# Seed the database
echo "🌱 Seeding database with initial data..."
node seed.js

echo "✅ Backend setup complete!"

# Frontend setup
echo "📦 Setting up frontend..."
cd ../frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install

echo "✅ Frontend setup complete!"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "1. Start MongoDB (if not already running)"
echo "2. Start the backend: cd backend && npm run dev"
echo "3. Start the frontend: cd frontend && npm run dev"
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:5173"
echo ""
echo "Default test accounts:"
echo "- marc@example.com / password123"
echo "- michell@example.com / password123"
echo "- joe@example.com / password123" 
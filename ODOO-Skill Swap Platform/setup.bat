@echo off
echo 🚀 Setting up Skill Swap Platform...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Backend setup
echo 📦 Setting up backend...
cd backend

REM Install dependencies
echo Installing backend dependencies...
call npm install

REM Check if MongoDB is running
echo Checking MongoDB connection...
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/skill-swap').then(() => { console.log('MongoDB is running'); process.exit(0); }).catch(() => { console.log('MongoDB is not running'); process.exit(1); });" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  MongoDB is not running. Please start MongoDB first.
    echo    You can install MongoDB locally or use MongoDB Atlas.
    echo    For local installation: https://docs.mongodb.com/manual/installation/
    echo    For MongoDB Atlas: https://www.mongodb.com/cloud/atlas
)

REM Seed the database
echo 🌱 Seeding database with initial data...
call node seed.js

echo ✅ Backend setup complete!

REM Frontend setup
echo 📦 Setting up frontend...
cd ..\frontend

REM Install dependencies
echo Installing frontend dependencies...
call npm install

echo ✅ Frontend setup complete!

echo.
echo 🎉 Setup complete!
echo.
echo To start the application:
echo 1. Start MongoDB (if not already running)
echo 2. Start the backend: cd backend ^&^& npm run dev
echo 3. Start the frontend: cd frontend ^&^& npm run dev
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.
echo Default test accounts:
echo - marc@example.com / password123
echo - michell@example.com / password123
echo - joe@example.com / password123
pause 
@echo off
REM Colors (Windows batch doesn't support ANSI directly, using title for feedback)
title Budgeting App Backend Setup

echo.
echo =====================================
echo  Budgeting App Backend Setup
echo =====================================
echo.

REM Check Node.js
node -v >nul 2>&1
if errorlevel 1 (
  echo ERROR: Node.js not found. Please install Node.js 18+
  pause
  exit /b 1
)

echo OK: Node.js found: 
node -v

REM Check pnpm
pnpm -v >nul 2>&1
if errorlevel 1 (
  echo.
  echo Installing pnpm...
  npm install -g pnpm
)

echo OK: pnpm found: 
pnpm -v
echo.

REM Navigate to backend
cd backend
if errorlevel 1 (
  echo ERROR: backend folder not found
  pause
  exit /b 1
)

REM Install dependencies
echo.
echo Installing dependencies...
call pnpm install

REM Generate Prisma
echo.
echo Generating Prisma client...
call pnpm run prisma:generate

REM Create .env if not exists
if not exist .env (
  echo.
  echo Creating .env file...
  copy .env.example .env
  echo WARNING: Please update .env with your database credentials
  echo.
)

REM Ask about migrations
echo.
set /p migrate="Do you want to run database migrations now? (y/n): "
if /i "%migrate%"=="y" (
  echo.
  echo Running migrations...
  call pnpm run prisma:migrate
  
  set /p seed="Do you want to seed sample data? (y/n): "
  if /i "%seed%"=="y" (
    call pnpm run seed
  )
)

echo.
echo =====================================
echo  Setup Complete!
echo =====================================
echo.
echo To start the development server:
echo   cd backend
echo   pnpm run dev
echo.
echo Backend will run at: http://localhost:5000
echo.
pause

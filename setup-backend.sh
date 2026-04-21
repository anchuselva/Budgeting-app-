#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up Budgeting App Backend${NC}\n"

# Check Node.js
if ! command -v node &> /dev/null; then
  echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node -v)${NC}"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
  echo -e "${BLUE}📦 Installing pnpm...${NC}"
  npm install -g pnpm
fi

echo -e "${GREEN}✅ pnpm found: $(pnpm -v)${NC}\n"

# Navigate to backend
cd backend || exit 1

# Install dependencies
echo -e "${BLUE}📥 Installing dependencies...${NC}"
pnpm install

# Generate Prisma
echo -e "${BLUE}🔧 Generating Prisma client...${NC}"
pnpm run prisma:generate

# Create .env if not exists
if [ ! -f .env ]; then
  echo -e "${BLUE}📝 Creating .env file...${NC}"
  cp .env.example .env
  echo -e "${BLUE}⚠️  Please update .env with your database credentials${NC}\n"
fi

# Check database
read -p "Do you want to run database migrations now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${BLUE}🗄️  Running migrations...${NC}"
  pnpm run prisma:migrate
  
  read -p "Do you want to seed sample data? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    pnpm run seed
  fi
fi

echo -e "\n${GREEN}✅ Setup complete!${NC}"
echo -e "${BLUE}📖 To start the development server:${NC}"
echo -e "  ${GREEN}cd backend${NC}"
echo -e "  ${GREEN}pnpm run dev${NC}\n"
echo -e "${BLUE}🌐 Backend will run at: http://localhost:5000${NC}\n"

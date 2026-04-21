FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Generate Prisma client
RUN pnpm run prisma:generate

# Build TypeScript
RUN pnpm run build

# Expose port
EXPOSE 5000

# Start server
CMD ["pnpm", "start"]

FROM node:22-alpine

# Set the working directory
WORKDIR /app

COPY . /app

# Install dependencies
RUN npm install

# Init prisma generators
RUN npm run db generate

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ['npx', 'next', 'start', '-p', '3000', '--hostname', '0.0.0.0']
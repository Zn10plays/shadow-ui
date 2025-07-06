FROM node:22-alpine

# Set the working directory
WORKDIR /app

COPY . /app

# Init prisma generators
RUN npm run db generate

# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ["npx", "next", "start", "-H", "invadev.net", "-p", "80"]
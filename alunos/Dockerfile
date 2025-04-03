FROM node:18-alpine 

WORKDIR /app

# Copy everything from the current directory to /app in the container
COPY . /app

# Install http-server globally
RUN npm install -g http-server

# Expose port 80 (inside container)
EXPOSE 80

# Start the server and serve files from /app
CMD ["http-server", "/app", "-p", "80"]

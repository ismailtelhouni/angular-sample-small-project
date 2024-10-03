# Stage 1: Build the Angular application
FROM node:18.19 AS build

# Set the working directory
WORKDIR / app

# Install project dependencies
COPY package *. json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built Angular app from the previous stage
COPY --from=build /app/dist/angular-sample-small-project /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD [" nginx " , " - g " , " daemon off ;"]
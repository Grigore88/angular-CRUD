# Step 1: Use a Node image to build the app
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Step 2: Use an Nginx image to serve the app
FROM nginx:alpine
#COPY nginx.conf /etc/nginx/conf.d/default.conf 
# Ensure your custom config is used
COPY --from=build /app/dist/primul /usr/share/nginx/html

# Copy the Angular build output to the Nginx html directory
   COPY --from=build /app/dist/primul /usr/share/nginx/html
   #COPY nginx.conf /etc/nginx/nginx.conf
# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

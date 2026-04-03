# Step 1: Use Nginx to serve the static files
FROM nginx:alpine

# Step 2: Copy your code into the Nginx server folder
COPY . /usr/share/nginx/html

# Step 3: Expose port 80 for the web traffic
EXPOSE 80

# Step 4: Run Nginx
CMD ["nginx", "-g", "daemon off;"]
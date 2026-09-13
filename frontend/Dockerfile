
FROM node:22-alpine AS build

WORKDIR /app


COPY package*.json ./

# Install dependencies
RUN npm install


COPY . .

# Build Vite application
RUN npm run build -- --mode docker



FROM nginx:alpine


RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


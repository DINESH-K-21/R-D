# Stage 1 - Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_AUTH_API_URL
ARG VITE_PRODUCT_API_URL
ENV VITE_AUTH_API_URL=$VITE_AUTH_API_URL
ENV VITE_PRODUCT_API_URL=$VITE_PRODUCT_API_URL
RUN npm run build

# Stage 2 - Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 7090
CMD ["nginx", "-g", "daemon off;"]
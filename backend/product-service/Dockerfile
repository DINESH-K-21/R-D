FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

# Rest of the code - itha munnadiye copy pannunga
COPY . .

EXPOSE 5002

# Container start aagum bodhu: migrate + seed + server start
CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && node src/index.js"]
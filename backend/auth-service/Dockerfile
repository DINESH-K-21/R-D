FROM node:20

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci

# Prisma schema copy pannu - generate ku thevai
COPY prisma ./prisma

# Prisma client generate pannu
RUN npx prisma generate

# Rest of the code
COPY . .

EXPOSE 5001

# Container start aagum bodhu migration run panni, appuram server start pannu
CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]
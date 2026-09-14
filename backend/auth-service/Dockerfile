FROM node:22

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci

# Prisma schema copy pannu - generate ku thevai
COPY prisma ./prisma

# ENV DATABASE_URL=postgresql://auth_user:auth_password@auth_postgres:5432/auth_db

# Prisma client generate pannu
RUN npx prisma generate

# Rest of the code
COPY . .

EXPOSE 5001

# Container start aagum bodhu migration run panni, appuram server start pannu
CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]
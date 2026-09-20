FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./

RUN npx prisma generate

COPY . .

EXPOSE 5002

CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && node src/index.js"]
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./

RUN npx prisma generate

COPY . .

EXPOSE 5001

CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]


# MAISON — Minimal E-commerce Project

React + Vite frontend, two independent Node/Express microservices (auth-service, product-service),
Prisma ORM against PostgreSQL (use pgAdmin to create the databases / inspect data). No Docker, no Nginx —
everything runs directly with Node during development.

```
ecommerce-project/
├── backend/
│   ├── auth-service/       # register, login, JWT, /me   -> port 5001
│   └── product-service/    # products, categories, CRUD  -> port 5002
└── frontend/                # React + Vite + Tailwind     -> port 5173
```

## 1. Create the databases (in pgAdmin)

Create two databases on your existing Postgres server:
- `ecommerce_auth`
- `ecommerce_product`

(Two separate databases keep each microservice independent — you can point them at the
same DB instead if you prefer; just reuse one connection string.)

## 2. Auth service

```bash
cd backend/auth-service
cp .env.example .env      # edit DATABASE_URL with your pgAdmin/Postgres user + password
npm install
npx prisma migrate dev --name init   # creates the User table
npm run dev                # http://localhost:5001
```

## 3. Product service

```bash
cd backend/product-service
cp .env.example .env      # edit DATABASE_URL
npm install
npx prisma migrate dev --name init   # creates Product + Category tables
npm run seed                # optional: adds sample categories/products
npm run dev                 # http://localhost:5002
```

## 4. Frontend

```bash
cd frontend
cp .env.example .env      # defaults already point at localhost:5001 / 5002
npm install
npm run dev                 # http://localhost:5173
```

## API overview

**auth-service** (`/api/auth`)
- `POST /register` — { name, email, password }
- `POST /login` — { email, password }
- `GET /me` — requires `Authorization: Bearer <token>`

**product-service** (`/api/products`)
- `GET /` — list, supports `?category=Men` and `?search=shirt`
- `GET /categories`
- `GET /:id`
- `POST /` , `PUT /:id`, `DELETE /:id` — basic CRUD (no auth guard by default — add
  `verifyToken` from auth-service style middleware if you want to lock these down later)

## Notes

- ORM: Prisma. Schema files live in `prisma/schema.prisma` in each service; running
  `npx prisma migrate dev` creates the tables and generates the client.
- To view/edit data with a GUI you already have pgAdmin — Prisma just needs the `DATABASE_URL`.
- No Docker/Nginx/reverse proxy — services run as three separate `npm run dev` processes
  during development, talking directly to Postgres and to each other over plain HTTP/CORS.
- Cart state is stored in localStorage (no cart microservice) to keep this minimal.

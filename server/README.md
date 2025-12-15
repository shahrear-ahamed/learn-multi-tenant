# Multi-Tenant Task Tracker Server

## Prerequisites

- Node.js (v18+)
- PostgreSQL Database (Supabase or local)

## Setup

1.  **Environment Variables**:
    Ensure your `.env` file contains:

    ```env
    DATABASE_URL="postgres://user:pass@host:port/dbname?pgbouncer=true"
    DIRECT_URL="postgres://user:pass@host:port/dbname"
    ```

    - `DATABASE_URL`: Connection string for the application (Transaction Pool if using Supabase).
    - `DIRECT_URL`: Connection string for migrations (Session Pool / Direct connection).

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Generate Prisma Client**:

    ```bash
    npx prisma generate
    ```

4.  **Database Migration**:
    ```bash
    npx prisma migrate dev --name init
    ```

## Running the App

- **Development**:

  ```bash
  npm run start:dev
  ```

- **Production**:
  ```bash
  npm run build
  npm run start:prod
  ```

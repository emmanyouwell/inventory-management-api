# Inventory Management with Advanced Filtering API

## Prerequisites
| Tool/Software | Minimum Version | Purpose |
|:------------|:---------|:--------------|
| Node JS |18.x| Required to run the backend application |
| PostgreSQL | 15.x | Required to create and manage the database |

## Dependencies 
| Dependency | Version | Purpose |
|:-----------|:----------------|:---------|
|dotenv | ^17.2.3 | Load environment variables from `.env` |
| express | ^5.1.0 | Web framework for building the backend API |
| knex | ^3.1.0 | SQL query builder for database operations |
| pg | ^8.16.3 | PostgreSQL client for Node.js |
| nodemon (dev) | ^3.1.10 | Auto-restart server on file changes (development only) |

## Project Setup
**1. Clone the repository**
```bash
git clone https://github.com/emmanyouwell/inventory-management-api.git
cd inventory-management-api
```
**2. Install Dependencies**
```bash
npm install
```
**3. Create a PostgreSQL Database**
```bash
# example
createdb -U <username> <database_name>

# Using default user
createdb -U postgres inventory
```
_Note: This will prompt you to enter your password_

**4. Configure Environment Variables**

Rename `.env.example` to `.env`, then update your PostgreSQL credentials:
```bash
## DATABASE CONFIGURATION

DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=inventory
DB_USER=your_username
DB_PASSWORD=your_password
```
**5. Run Migrations**
```bash
npm run db:migrate
```

**6. Seed the Database**
```bash
npm run db:seed
```

**7. Run the server**
```bash
npm run start:dev
```



// lib/db.ts
import { Pool } from "pg";

// Create a pool of connections to the PostgreSQL database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use the environment variable for the database connection string
});

export default pool;

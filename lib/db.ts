import { Pool } from "pg";

/*
Change the connection string to process.env.DATABASE_URL for production, and back to the hard coded string for local dev
*/
const pool = new Pool({
    // connectionString: process.env.DATABASE_URL,
    connectionString: "postgresql://postgres:postgres@localhost:5432/JobAppDB",
});
export default pool;

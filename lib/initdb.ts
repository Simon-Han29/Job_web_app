import pool from "./db";

async function initDB() {
    const dropTablesQ = `
        DROP TABLE IF EXISTS job_applications;
        DROP TABLE IF EXISTS users;
    `;

    const createUsersTableQ = `
        CREATE TABLE IF NOT EXISTS users (
            uid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL
        );
    `;

    const createJobAppTableQ = `
        CREATE TABLE IF NOT EXISTS job_applications (
            job_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            uid UUID REFERENCES users(uid) ON DELETE CASCADE,
            job_title VARCHAR(255) NOT NULL,
            company VARCHAR(225) NOT NULL,
            date_applied VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL
        );
    `;

    try {
        await pool.query(dropTablesQ);
        await pool.query(createUsersTableQ);
        await pool.query(createJobAppTableQ);
        console.log("Tables created successfully");
    } catch (err) {
        console.error("Error initializing database:", err);
    }
}

initDB();

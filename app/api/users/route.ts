// app/api/users/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Import the database pool

// GET: Fetch all users from the database
export async function GET() {
    try {
        const { rows } = await pool.query("SELECT * FROM users"); // Query to fetch users
        return NextResponse.json(rows); // Return users as a JSON response
    } catch (error: unknown) {
        // Handle error of type `unknown`
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        // Fallback for unhandled error types
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}

// POST: Add a new user to the database
export async function POST(req: Request) {
    const { name, email } = await req.json(); // Parse the request body

    try {
        const { rows } = await pool.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
            [name, email] // Use parameterized queries to prevent SQL injection
        );
        return NextResponse.json(rows[0], { status: 201 }); // Return the created user as a response
    } catch (error: unknown) {
        // Handle error of type `unknown`
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        // Fallback for unhandled error types
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}

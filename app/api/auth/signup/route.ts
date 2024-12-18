import { NextResponse } from "next/server";
import pool from "@/lib/db";
export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        const isUserNameTaken = await isUsernameTaken(username);
        if (isUserNameTaken) {
            return NextResponse.json(
                { msg: "username is taken" },
                { status: 409 }
            );
        } else {
            const createNewUserQuery = `
            INSERT INTO users (username, password)
            VALUES ($1, $2)
        `;
            await pool.query(createNewUserQuery, [username, password]);
            return NextResponse.json(
                { msg: "user successfully created" },
                { status: 201 }
            );
        }
    } catch (err) {
        return NextResponse.json({ msg: `ERR: ${err}` }, { status: 500 });
    }
}

async function isUsernameTaken(username: string) {
    try {
        const q = `
        SELECT * FROM users
        WHERE username=$1
    `;
        const res = await pool.query(q, [username]);
        const rowCount = res.rowCount;
        if (rowCount && rowCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return true;
    }
}

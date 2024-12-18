import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { UserType } from "@/types/userTypes";
import jwt from "jsonwebtoken";
export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        const userDetails: UserType | null = await getUserByUsername(username);
        console.log(userDetails);
        if (userDetails === null) {
            return NextResponse.json(
                { msg: "No user with that username was found" },
                { status: 404 }
            );
        } else {
            if (userDetails.password === password) {
                const data = {
                    username: userDetails.username,
                    uid: userDetails.uid,
                };
                const token = jwt.sign(
                    data,
                    process.env.SECRET_KEY || "SECRETKEY"
                );
                return NextResponse.json(
                    { msg: "Login Successful", token },
                    { status: 201 }
                );
            } else {
                return NextResponse.json(
                    { msg: "Incorrect credentials" },
                    { status: 401 }
                );
            }
        }
    } catch (err) {
        return NextResponse.json({ msg: `ERR: ${err}` }, { status: 500 });
    }
}

async function getUserByUsername(username: string) {
    const q = `
        SELECT * FROM users
        WHERE username=$1
        LIMIT 1
    `;
    const res = await pool.query(q, [username]);
    if (res.rowCount === 0) {
        return null;
    } else {
        return res.rows[0];
    }
}

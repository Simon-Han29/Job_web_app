"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    // connectionString: process.env.DATABASE_URL,
    connectionString: "postgresql://postgres:postgres@localhost:5432/JobAppDB",
});
exports.default = pool;
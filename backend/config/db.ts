import knex from "knex";
import "dotenv/config";

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT} = process.env

export const db = knex(
    {
        client: 'pg',
        connection: {
            host: PGHOST,
            port: Number(PGPORT),
            user: PGUSER,
            database: PGDATABASE,
            password: PGPASSWORD,
            ssl: {rejectUnauthorized: false}
        },
        pool: {
            min: 2,
            max: 10,
            acquireTimeoutMillis: 30000,
            createTimeoutMillis: 30000,
            destroyTimeoutMillis: 5000,
            idleTimeoutMillis: 30000,
            reapIntervalMillis: 1000,
            createRetryIntervalMillis: 100
        }
    }
)
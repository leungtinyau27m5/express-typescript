import { Interface } from "readline"

interface DB {
    host: string;
    user: string;
    password: string;
    db: string
}

const db:DB = {
    host: process.env.DB_HOST || "",
    user: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    db: process.env.DB_DATABASE || "",
}

export default db
import postgres from "postgres";

const sql = postgres("postgres://user:user@192.168.1.15:5433/backend");

export default sql;

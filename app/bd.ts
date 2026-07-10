import { Pool } from "pg";

const global_pool = global as unknown as { pool: Pool };

export const pool =
  global_pool.pool ||
  new Pool({
    database: "agrotech1",
    host: "localhost",
    port: 5432,
    user: "loic",
    password: "loic",
    min:1,
    max:20,
  });

global_pool.pool = pool;

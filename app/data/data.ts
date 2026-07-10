import { pool } from "../bd";

export const query = await pool.query(
  "select * from utilisateurs order by date2 desc",
);
export const query2 = await pool.query("select * from utilisateurs order by id desc ");

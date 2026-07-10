import { pool } from "../bd";

export async function AfficheList(id:string) {
  const {rows}=await pool.query('select * from produits where id_proprietaire=$1',[id])
  return rows
}
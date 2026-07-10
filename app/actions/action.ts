"use server";
import { pool } from "../bd";

export async function deleteStock(id: string) {
  try {
    await pool.query("delete from produits where id_produit=$1", [id]);
    return true;
  } catch {
    return false;
  }
}


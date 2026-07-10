"use server";
import bcrypt from "bcryptjs";
import { pool } from "../bd";
import { User } from "../types/user";
import { headers } from "next/headers";

export const action = async (e:FormData) => {
  const r = e;
  const nom = r.get("nom") as string;
  const prenom = r.get("prenom") as string;
  const numero = r.get("numero") as unknown as number;
  const email = r.get("email") as string;
  const password = r.get("password") as string;

  const id = crypto.randomUUID();
  const hashed_password = await hashed(password);
  
  const j=await headers()
  
  console.log("headers: ",j.get('user-agent'));
  console.log("headers: ",j.get('host'));

  try {
    // const {rows} = (await pool.query(
    //   "insert into utilisateurs(id,nom,prenom,numero,email,password,role) values($1,$2,$3,$4,$5,$6,$7) returning *",
    //   [id, nom, prenom, numero, email, hashed_password,"acheteur"],
    // ));
    const { rows } = await pool.query("select * from utilisateurs limit 1");

    const b = rows[0] as User;
    console.log(b, b.numero, b.email);
    if (b.id) {
      return b;
    }
  } catch {
    return false;
  }
 
  
};

async function hashed(pass: string) {
  pass = pass + process.env.pepper;
  const crypt_pass = await await bcrypt.hash(pass, 10);
  const crypt = crypt_pass.replace(process.env.salt!, "");
  return crypt;
}

async function verifie(pass: string, hpass: string) {
  pass = pass + process.env.pepper;
  hpass = process.env.salt + hpass;
  return await bcrypt.compare(pass, hpass);
}

import { pool } from "@/app/bd";
import { User } from "@/app/types/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { strict } from "assert";

const secret = new TextEncoder().encode(process.env.SECRET_JWT);

export async function POST(req: NextRequest) {
  console.log(process.env.SECRET_JWT);

  const t = await req.headers;
  const a = await req.json();
  console.log(t.get("host"));
  console.log(a);
  console.log("nom: ", a.nom);
  const id = crypto.randomUUID();
  const hashed_password = await hashed(a.password);
  console.log(await hashed('agriculteur1'));
  console.log(await hashed('agriculteur2'));
  console.log(await hashed('livreur1'));
  console.log(await hashed('livreur2'));
  

  // const {payload} = await jwtVerify(aa, secret);
  // console.log("verify jwt: ", payload);

  const user: User = {
    id,
    nom: a.nom,
    email: a.email,
    password: hashed_password,
    numero: a.numero,
    prenom: a.prenom,
    role: a.role,
  };

  try {
    const { rows } = await pool.query(
      "insert into utilisateurs(id,nom,prenom,numero,email,password,role) values($1,$2,$3,$4,$5,$6,$7) returning *",
      [
        user.id,
        user.nom,
        user.prenom,
        user.numero,
        user.email,
        user.password,
        user.role,
      ],
    );
    const r = rows[0] as User;
    if (r) {
      return NextResponse.json({},{status:200})
    } else {
      throw new Error("l'utilisateur n'a pas été créé");
    }
  } catch (e) {
    return NextResponse.json(
      { erreur: e || "une erreur est survenu! désolé" },
      { status: 404 },
    );
  }

}


async function hashed(pass: string) {
  pass = pass + process.env.pepper;
  const crypt_pass = await bcrypt.hash(pass, 10);
  const crypt = crypt_pass.replace(process.env.salt!, "");
  return crypt;
}


import { pool } from "@/app/bd";
import { User } from "@/app/types/user";
import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.SECRET_JWT);

export async function POST(req: NextRequest) {
  //const a=await cookies()
  const b = await req.json();

  const num = b.numero as string;

  try {
    const { rows } = await pool.query(
      "select * from utilisateurs where numero=$1 limit 1",
      [num],
    );
    if (rows) {
      const r = rows[0] as User;
      console.log(b.password, r.password);

      const d = await verifie(b.password, r.password);
      if (d) {
        const aa = await new SignJWT({
          nom: r.nom,
          prenom: r.prenom,
          numero: r.prenom,
          email: r.email,
          id: r.id,
          role:r.role,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("1h")
          .sign(secret);
        console.log("token jwt: ", aa);

        const response = NextResponse.json(
          {
            id: r.id,
            role:r.role,
          },
          { status: 200 },
        );

        response.cookies.set("token_jwt", aa, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 60 * 5,
        });
        console.log(response.cookies.get("token_jwt"));

        return response;
      }
    }
  } catch (e) {
    return NextResponse.json(
      { error: e || "une erreur est survenue" },
      { status: 404 },
    );
  }
  return NextResponse.json({}, { status: 404 });
}

export async function GET(req: NextRequest) {
  // const a =  req.cookies;
  // const token = a.get("token_jwt")?.value;
  // const cc = await cookies();
  // console.log(a,cc,);

  try {
    const d = req.headers.get("getsetcookie");
    // console.log(d,cc.getAll());

    // console.log(a.get("token_jwt"));
    const token = d;

    if (token) {
      const verif = await jwtVerify(token, secret);
      // console.log(verif.payload);

      if (verif) {
        const { payload } = verif;

        return NextResponse.json(payload, { status: 200 });
        //return NextResponse.redirect(new URL('/login',req.url))
        //return NextResponse.json(JSON.stringify(payload),{status:200})
      }
    }
  } catch {
    return NextResponse.json({}, { status: 404 });
  }
  return NextResponse.json({}, { status: 404 });
}

async function verifie(pass: string, hpass: string) {
  pass = pass + process.env.pepper;
  hpass = process.env.salt + hpass;
  return await bcrypt.compare(pass, hpass);
}

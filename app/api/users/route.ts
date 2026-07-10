import { pool } from "@/app/bd";
//import { NextApiHandler, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET() {
  const query = await pool.query(
    "select * from utilisateurs order by date2 desc",
  );
  const query2 = await pool.query(
    "select * from utilisateurs order by id desc ",
  );

  return NextResponse.json(
    {
      data1: query,

      data2: query2,
    },
    { status: 200 },
  );
}

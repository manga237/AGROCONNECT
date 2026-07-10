import { pool } from "../bd";
import { query, query2 } from "./data";

export const dynamic = "force-dynamic";
export default async function Page() {
  const nom = "pool";
  const j = await pool.query(
    "insert into utilisateurs(nom) values ($1) returning *",
    [nom],
  );

  // const api=await fetch("http://localhost:3000/api/users").then(res=>res.json())
  // const {data1,data2}=api
  // const query=data1
  // const query2=data2

  const { rows, rowCount } = query;
  //console.log(query);
  console.log(rows[0].nom);
  console.log(rows[0].date);
  console.log(rows[1]);
  const rows2 = query2.rows;
  console.log(j.rows);
  const n = Math.random();
  const num = Math.round(n * 1000);
  const num2 = Math.round(2000 * n);
  console.log(num);
  console.log(rowCount);

  const name = rows[num].nom as string;

  //console.log(data1);

  return (
    <div>
      <p>
        SALUT JE SUIS {name.toUpperCase()} ET {rows2[num2].nom}{" "}
      </p>
      <p>
        LE NOMBRE FARE EST {num} ET {num2}{" "}
      </p>
    </div>
  );
}

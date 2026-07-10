import Link from "next/link";
import Salutation, { Container, Salut } from "./salutation";
import PageLogin from "./pagelogin";
import { redirect } from "next/navigation";
import { logi } from "./data/login";
import { cookies } from "next/headers";
import { refresh, revalidatePath } from "next/cache";
//import { redirect } from "next/navigation";

// export function Home() {
//   const prix: number = 1;
//   return (
//     <div>
//       <Salutation name="manga" />
//       <h1>{prix} $ </h1>
//       <Salutation />
//       <Salut age={15} />
//       <Container titre="container d'élément">
//         <p>fw ee</p>
//         <Salutation />
//       </Container>
//       <Link href="login" style={{ color: "white", background: "blue" }}>
//         ALLER À LOGIN
//       </Link>
//       <br />
//       <Link href="data" style={{ color: "white", background: "blue" }}>
//         ALLER À LA BD
//       </Link>
//     </div>
//   );
// }

export default async function Page() {
  const t = (await cookies()).get("token_jwt");
  let id = "/";
  let role;

  const a = await fetch("http://localhost:3000/api/login", {
    headers: {
      "Content-type": "application/json",
      getSetCookie: `${t?.value}`,
    },
    cache: "no-store",
  });
  if (a.status == 200) {
    const r = await a.json();
    console.log(r);

    id = `${r.id}`;
    role = r.role;
  }
  if (id != "/") {
    return <PageLogin url={id} role={role} />;
  }
  return <PageLogin />;
}

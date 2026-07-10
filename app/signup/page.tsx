import PageSign from "./pagesign";
import { cookies } from "next/headers";

export default async function Page() {
  const t = (await cookies()).get("token_jwt");

  const a = await fetch("http://localhost:3000/api/login", {
    headers: {
      "Content-type": "application/json",
      getSetCookie: `${t?.value}`,
    },
    cache: "no-store",
  });
  if (a.status == 200) {
    const r = await a.json();
    // redirect(`/user/`);
    return <PageSign url={`${r.id}`} />;
  }

  return <PageSign />;
}

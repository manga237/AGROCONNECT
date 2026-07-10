"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type props = { url?: string; role?: string };
export default function PageLogin({ url, role }: props) {
  const [user, setuser] = useState(false);
  const [mes, setmes] = useState("");
  const route = useRouter();

  useEffect(() => {
    if (url && role == "acheteur") {
      route.push(`/user/${url}`);
    } else if (url && role == "agriculteur") {
      route.push(`/farmer/${url}`);
    } else if (url && role == "livreur") {
      route.push(`/livreur/${url}`);
    }
  }, [url, route, role]);

  if (url) {
    return null; // on ne rend rien pendant la redirection
  }
  return (
    <div className="h-full bg-green-700 flex flex-col">
      <Toaster bool={user} message={mes} />
      <div className="w-full flex justify-center h-auto lg:h-100 ">
        <Image src="/images/image2.png" width={320} height={200} alt="" />
      </div>

      <div className="w-full flex flex-col items-center bg-amber-400 h-full">
        <p className="font-bold text-2xl mt-4">BIENVENUE,</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const r = new FormData(e.currentTarget);
            const login = {
              numero: r.get("numero"),
              password: r.get("password"),
            };

            const f = await fetch("/api/login", {
              method: "POST",
              body: JSON.stringify(login),
            });
            if (f.status == 200) {
              const a = await f.json();
              if (a.role == "acheteur") route.push(`/user/${a.id}`);
              else if (a.role == "agriculteur") route.push(`/farmer/${a.id}`);
              else if (a.role == "livreur") route.push(`/livreur/${a.id}`);
            } else {
              const i = setInterval(() => {
                setuser(true);
              }, 1);
              setTimeout(() => {
                clearInterval(i);
                setuser(false);
                setmes("mauvais");
              }, 2100);
            }
          }}
          className="flex flex-col gap-5 w-10/12 sm:w-2/3 mt-10"
        >
          <input
            className="rounded-sm bg-white border text-xl font-bold"
            style={{ padding: "1rem" }}
            type="text"
            inputMode="numeric"
            maxLength={9}
            minLength={9}
            name="numero"
            placeholder="Entrer votre Numéro de Téléphone"
          />
          <input
            className="rounded-sm bg-white border text-xl font-bold"
            style={{ padding: "1rem" }}
            type="password"
            name="password"
            placeholder="Entrer votre mot de passe"
          />

          <input
            className={`${!user ? "bg-blue-500 py-2 rounded-2xl text-white font-bold hover:bg-black" : "bg-gray-500 py-2 rounded-2xl text-white font-bold"}`}
            type="submit"
            value="Se Connecter"
          />
        </form>

        <div className="w-full flex justify-around mt-10">
          <Link
            href="/signup"
            className="font-black underline hover:text-blue-800"
          >
            S{"'"}Inscrire
          </Link>
          <Link href="/" className="font-black underline hover:text-blue-800">
            Mot de passe oublié
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Toaster({
  bool,
  message,
}: {
  bool: boolean;
  message?: string;
}) {
  if (bool && message == "bon") {
    return (
      <p className="absolute top-0 left-2/5 p-2 bg-blue-100 rounded-md box">
        Utilisateur créé avec succès
      </p>
    );
  }
  if (bool && message == "mauvais") {
    return (
      <p className="absolute top-0 left-1/5 p-2 bg-red-400 rounded-md box text-white md:left-2/5">
        numéro ou mot de passe incorrect
      </p>
    );
  }
  return null;
}

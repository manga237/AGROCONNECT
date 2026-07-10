"use client";
import Image from "next/image";
import Link from "next/link";
import { action } from "../data/form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { useRouter } from "next/navigation";

export default function PageSign({ url }: { url?: string }) {
  const [user, setuser] = useState(false);
  const [mes, setmes] = useState("");
  const s = "rounded-sm bg-white border text-xl font-bold p-2 w-full";
  const r = useRouter();

  useEffect(() => {
    if (url) r.push(`/user/${url}`);
  }, [r, url]);

  if (url) {
    return null;
  }
  return (
    <div className="h-full bg-green-700 flex flex-col ">
      <Toaster bool={user} message={mes} />

      <div className="w-full flex justify-center h-50 lg:h-100">
        <Image src="/images/image2.png" width={250} height={200} alt="" />
      </div>

      <div className="w-full flex flex-col items-center bg-amber-400 h-full pt-2">
        <p className="font-bold text-3xl text-white text-center">
          BIENVENUE CHEZ,
          <span className="text-green-700 text-shadow-md">Agro</span>
          <span className="text-orange-500  text-shadow-md">Connect</span>
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const t = new FormData(e.currentTarget);
            const sign = {
              nom: t.get("nom"),
              prenom: t.get("prenom"),
              numero: t.get("numero"),
              email: t.get("email"),
              password: t.get("password"),
              role: "acheteur",
            };

            //  const j = (await action(new FormData(e.currentTarget))) as User;
            const tp = await fetch("/api/signup", {
              method: "POST",
              body: JSON.stringify(sign),
              credentials: "same-origin",
            });
            console.log(tp.status);

            if (tp.status == 200) {
              //   const uu = await tp.json();
              const i = setInterval(() => {
                setuser(true);
                setmes("bon");
              }, 1);
              setTimeout(() => {
                clearInterval(i);
                r.push(`/`);
                setuser(false);
                console.log("fini");
              }, 4100);
            } else {
              const i = setInterval(() => {
                setuser(true);
                setmes("mauvais");
              }, 1);
              setTimeout(() => {
                clearInterval(i);
                setuser(false);
              }, 4100);
              console.log("ERREUR SALE FILS DE PUTE");
            }
          }}
          className="flex flex-col w-10/12 sm:w-2/3 mt-10"
        >
          <div
            className="grid mb-10 gap-2"
            style={{ gridTemplateColumns: "auto 1fr" }}
          >
            <label htmlFor="nom" className="text-2xl text-right">
              Nom:
            </label>
            <input
              className={`${s}`}
              type="text"
              name="nom"
              placeholder="Entrer votre nom"
              required
            />
            <label htmlFor="prenom" className="text-2xl text-right">
              Prénom:
            </label>
            <input
              className={`${s}`}
              type="text"
              name="prenom"
              placeholder="Entrer votre prénom"
              required
            />
            <label htmlFor="email" className="text-2xl text-nowrap text-right ">
              E-MAIL:
            </label>
            <input
              className={`${s}`}
              type="email"
              name="email"
              placeholder="Entrer votre email"
              required
            />
            <label
              htmlFor="numero"
              className="text-2xl text-nowrap text-right relative numbox "
            >
              Numéro:
            </label>
            <input
              className="rounded-sm bg-white border text-ms font-bold p-2 w-full pl-16"
              name="numero"
              inputMode="numeric"
              maxLength={9}
              minLength={9}
              type="text"
              placeholder="Entrer votre Numéro de Téléphone"
              required
            />
            <label
              htmlFor="numero"
              className="text-2xl text-nowrap text-right "
            >
              Mot de Passe:
            </label>
            <input
              name="password"
              className={`${s}`}
              type="password"
              placeholder="Entrer votre mot de passe"
              required
            />
          </div>

          <input
            className={`${!user ? "bg-blue-500 py-2 rounded-2xl text-white font-bold hover:bg-black" : "bg-gray-500 py-2 rounded-2xl text-white font-bold"}`}
            type="submit"
            value="S'inscrire"
            disabled={user}
          />
        </form>

        <div className="w-full flex justify-around mt-10">
          <p>
            Vous possédez déjà un compte,{" "}
            <Link href="/" className="font-black underline hover:text-blue-800">
              Se Connecter
            </Link>
          </p>
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
      <p className="absolute top-0 left-2/5 p-2 bg-red-400 rounded-md box text-white">
        Echec de la création du compte
      </p>
    );
  }
  return null;
}

"use client";
import { deleteStock } from "@/app/actions/action";
import { retireArgent } from "@/app/actions/retirerargent";
import AsideContent from "@/app/components/asideFarmer";
import {
  Produit,
  type_historique_agri_depot,
  type_historique_agri_retrait,
} from "@/app/types/user";
import { ArrowBigRightIcon, ArrowBigLeftIcon, X, Divide } from "lucide-react";
import Image from "next/image";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MainAccount({
  id,
  solde,
  depot,
  retrait,
}: {
  id: string;
  solde: string;
  depot: type_historique_agri_depot[];
  retrait: type_historique_agri_retrait[];
}) {
  const r = useRouter();
  //console.log(window.length);
  const [show, setshow] = useState(true);
  const [pay, setpay] = useState(false);

  return (
    <div className="flex h-full w-full">
      <AsideContent id={id} />
      <main className="m-2 w-full relative">
        <div
          className={
            pay
              ? "modal opacity-90 bg-gray-100 h-full w-full flex flex-col gap-2 justify-center items-center absolute z-50"
              : "hidden"
          }
          onClick={() => {
            const a = document.querySelector(".modal");
            a?.classList.toggle("modal-none");
          }}
        >
          <p
            onClick={(e) => {
              e.stopPropagation();
            }}
            className=" text-3xl p-5 rounded-xl bg-blue-400 font-bold text-white"
          >
            merci de patienter le temps que votre requête soit traiter
          </p>
        </div>
        <div className="flex gap-2">
          {show ? (
            <ArrowBigRightIcon
              className="arrow"
              size={36}
              onClick={() => {
                const a = document.querySelector("aside");
                a?.classList.remove("none");
                setshow(false);
              }}
            />
          ) : (
            <ArrowBigLeftIcon
              size={36}
              className="arrow"
              onClick={() => {
                const a = document.querySelector("aside");
                a?.classList.add("none");
                setshow(true);
              }}
            />
          )}

          <p className="text-center w-full font-bold">GESTION DU COMPTE</p>
        </div>
        <p className="text-4xl bg-green-500 p-3 text-white font-bold rounded-md">
          SOLDE : <span className="text-red-600">{solde} FCFA</span>
        </p>
        <button
          disabled={Number(solde) < 100 ? true : false}
          className={
            Number(solde) < 100
              ? "p-3 text-2xl bg-gray-500 font-bold text-white rounded-xl hover:cursor-pointer"
              : "p-3 text-2xl bg-blue-500 font-bold text-white rounded-xl hover:cursor-pointer hover:bg-blue-900 my-3"
          }
          onClick={async () => {
            setpay(true);
            try {
              const a = await fetch("https://demo.campay.net/api/withdraw/", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Token eeeb9724ef8b567ff16c7ebef93851d1851bacc8`,
                },
                body: JSON.stringify({
                  amount: "25",
                  // to: `237${user.numero}`,
                  to: `237692495185`,
                  currency: "XAF",
                  description: "retrait",
                }),
              });
              await new Promise((r) => setTimeout(r, 60000));
              if (!a.ok) {
                console.log("erreur de retrait: ", a.status);
              }
              const data = await a.json();
              if (data.reference) {
                const transaction = data.reference;
                const b = await fetch(
                  `https://demo.campay.net/api/transaction/${transaction}`,
                  {
                    headers: {
                      "Content-type": "application/json",
                      Authorization: `Token eeeb9724ef8b567ff16c7ebef93851d1851bacc8`,
                    },
                  },
                );
                await new Promise((r) => setTimeout(r, 30000));
                if (!b.ok) {
                  console.log("erreur de transaction: ", a.status);
                }
                setpay(false);
                const d = await b.json();
                console.log("status : ", d.status);
                if (d.status == "SUCCESSFUL") {
                  alert("retrait effectué avec succès");
                  await retireArgent(Number(solde), id, transaction);
                  await new Promise((r) => setTimeout(r, 5000));
                  r.refresh();
                } else {
                  alert("une erreur est survenue quelque part");
                }
              }
            } catch (error) {
              console.log("ERREUR: ", error);
            }
          }}
        >
          retirer argent
        </button>
        <div className="flex flex-col">
          <p className="text-2xl font-black mb-2">Historique de retrait</p>
          {depot.length == 0 && retrait.length == 0 ? (
            <p>{`Voud n'avez encore aucune transaction pour le moment`} </p>
          ) : depot.length != 0 ? (
            <div className="flex flex-col gap-2 ">
              {depot.map((d, i) => (
                <div
                  key={i}
                  className="border-2 border-green-400 rounded-md p-2 flex flex-col gap-3"
                >
                  <p>N° Transaction: {d.num_transaction} </p>
                  <p>
                    Dépôt éffectué le: {d.date.toLocaleDateString("fr-Fr")}{" "}
                  </p>
                  <p>
                    Montant:{" "}
                    <span className="text-green-400">+{d.montant} FCFA</span>
                  </p>
                </div>
              ))}
            </div>
          ) : null}
          {retrait.length != 0 ? (
            <div className="flex flex-col gap-2 my-2">
              {retrait.map((d, i) => (
                <div
                  key={i}
                  className="border-2 border-red-400 rounded-md p-2 flex flex-col gap-3"
                >
                  <p>N° Transaction: {d.num_transaction} </p>
                  <p>
                    retrait éffectué le:{" "}
                    {d.date.toLocaleDateString("fr-Fr")}{" "}
                  </p>
                  <p>
                    Montant:{" "}
                    <span className="text-red-400"> -{d.montant} FCFA</span>
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

"use client";

import { changeLivraison } from "@/app/actions/retirerargent";
import AsideContent from "@/app/components/asideLiv";
import { Livraison } from "@/app/types/user";
import {
  ArrowBigRightIcon,
  ArrowBigLeftIcon,
  Search,
  LocationEditIcon,
  LocationEdit,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MainContentLiv({
  id,
  livraison,
}: {
  id: string;
  livraison?: Livraison[];
}) {
  // console.log(id);
  //console.log(window.length);
  const [show, setshow] = useState(true);
  const r = useRouter();

  if (livraison) {
    const add = livraison[0].adresse_livraison.split(",");
    console.log(add);

    return (
      <div className="flex h-full w-full">
        <aside className="bg-amber-200 md:min-w-1/3 none">
          <div className="flex flex-col items-center">
            <Image src="/images/image2.png" width={250} height={200} alt="" />
            <div className="items-aside bg-green-300 flex flex-col h-full gap-3 text-center w-full px-3">
              <p
                onClick={() => {
                  r.push(`/livreur/${id}`);
                }}
              >
                LIVRAISON EN ATTENTE
              </p>
              <p
                onClick={() => {
                  r.push(`/livreur/${id}/wait`);
                }}
              >
                LIVRAISON EN COURS
              </p>
              <p
                onClick={() => {
                  r.push(`/livreur/${id}/history`);
                }}
              >
                HISTORIQUE DES LIVRAISONS
              </p>
            </div>
          </div>
        </aside>
        <main className="m-2 w-full">
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
          </div>
          <p className="ss">LISTE DE VOS LIVRAISONS EN COURS</p>
          <div className="flex gap-4 flex-col w-full ">
            {livraison.map((l, i) => (
              <div
                key={l.id_produit}
                className="border-2 bg-blue-100 p-2 w-full rounded-xl"
                onClick={() => {
                  const a = document.querySelector(`.div${i}`);
                  a?.classList.toggle("modal-none");
                }}
              >
                <div className="flex justify-around">
                  <p>Nom du payeur : {l.nom_payeur} </p>
                  <p className="font-black">
                    statut:
                    <span className="rounded-2xl p-1 bg-blue-400 text-white">
                      {l.statut.toUpperCase()}
                    </span>
                  </p>
                </div>

                <p>Nom du produit: {l.nom_produit} </p>
                <p>Numéro du payeur</p>
                <p>Date du paiement: {l.date.toLocaleString("fr-Fr")} </p>
                <p className="flex gap-4">
                  Votre adresse de livraison:{" "}
                  <a
                    className="text-red-400 flex gap-2 cursor-pointer"
                    onClick={() => {
                      const adr = l.adresse_livraison.split(",");
                      const url = `https://www.google.com/maps/search/?api=1&query=${adr[0]},${adr[1]}&query_place_id=votre_lieu_livraison`;
                      window.open(url, "_blank");
                    }}
                  >
                    consulter ici{" "}
                    <LocationEdit size={20} className="text-red-400" />{" "}
                  </a>{" "}
                </p>
                {/* <p>
                               Adresse de livraison: <i>{l.adresse_livraison} </i>{" "}
                             </p> */}
                <div
                  className={`modal-none border-t-2 border-gray-300 div${i}`}
                >
                  <button
                    onClick={async () => {
                      await changeLivraison(l.id_produit);
                      await new Promise((r) => setTimeout(r, 2000));
                      r.refresh();
                    }}
                    className="bg-green-400 p-1 my-1 font-bold text-amber-50 rounded-xl"
                  >
                    LIVRAISON TERMINÉE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full">
      <aside className="bg-amber-200 md:min-w-1/3 none">
        <div className="flex flex-col items-center">
          <Image src="/images/image2.png" width={250} height={200} alt="" />
          <div className="items-aside bg-green-300 flex flex-col h-full gap-3 text-center w-full px-3">
            <p
              onClick={() => {
                r.push(`/livreur/${id}`);
              }}
            >
              LIVRAISON EN ATTENTE
            </p>
            <p
              onClick={() => {
                r.push(`/livreur/${id}/wait`);
              }}
            >
              LIVRAISON EN COURS
            </p>
            <p
              onClick={() => {
                r.push(`/livreur/${id}/history`);
              }}
            >
              HISTORIQUE DES LIVRAISONS
            </p>
          </div>
        </div>
      </aside>
      <main className="m-2 w-full">
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

        </div>
        <p className="ss">LISTE DE VOS LIVRAISONS EN COURS </p>
        <div>{"Vous n'avez valider aucune livraison"} </div>
      </main>
    </div>
  );
}

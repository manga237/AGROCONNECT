"use client";

import AsideContent from "@/app/components/aside";
import { Produit, type_historique_acheteur } from "@/app/types/user";
import {
  ArrowBigRightIcon,
  Search,
  ArrowBigLeftIcon,
  Star,
  LocationEdit,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function MainContent({
  id,
  hist_produit,
}: {
  id: string;
  hist_produit?: type_historique_acheteur[];
}) {
  const [show, setshow] = useState(true);
  const r = useRouter();
  if (hist_produit?.length==0) {
    return (
      <div className="flex h-full w-full">
        <AsideContent id={id} />
        <main className="m-2 w-full">
          <div className="flex gap-2 ">
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

            <p>LISTE DES ARTICLES ACHETÉS</p>
          </div>
          <p>{`Vous n'avez encore acheté aucun article`} </p>
        </main>
      </div>
    );
  }

  hist_produit = hist_produit!.filter((h) => h.statut == "termine");
  console.log(hist_produit[0]);
  //console.log(window.length);

  return (
    <div className="flex h-full w-full">
      <AsideContent id={id} />
      <main className="m-2 w-full">
        <div className="flex gap-2 ">
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

          <p>HISTORIQUE DES PRODUITS LIVRÉS</p>
        </div>
        <div className="flex flex-col gap-4">
          {hist_produit.map((h, i) => (
            <div key={i} className="border-2 p-2 rounded-md">
              <div className="flex gap-1">
                <Image
                  src={`/uploads/${h.images_produit}`}
                  alt=""
                  width={200}
                  height={200}
                />
                <div className="flex flex-col">
                  <p>N° du produit: {h.id_produit} </p>
                  <p>Nom du produit: {h.nom_produit} </p>
                </div>
              </div>
             
              <p className="my-2 p-2 bg-green-300 rounded-md">Statut: {h.statut}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

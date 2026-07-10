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
    console.log("je suis la");
    
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

            <p>LISTE DE PRODUIT EN COURS DE LIVRAISON</p>
          </div>
          <p>{`Vous n'avez aucune produit en cours de livraison`} </p>
        </main>
      </div>
    );
  }
  hist_produit = hist_produit!.filter((h) => h.statut != "termine");
  console.log(hist_produit[0]);

  //console.log(window.length);
    console.log("je suis pas la");

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

        
        </div>
        <div className="flex flex-col gap-4">
          {hist_produit.map((h, i) => (
            <div key={i} className="border-2 m-2 rounded-md p-1 font-black">
              <div className="flex gap-1">
                <Image
                  src={`/uploads/${h.images_produit}`}
                  alt=""
                  width={200}
                  height={200}
                />
                <div className="flex flex-col">
                  <p>N° du produit: <span className="text-blue-400">{h.id_produit}</span> </p>
                  <p>Nom du produit: <span className="text-blue-400">{h.nom_produit}</span> </p>
                </div>
              </div>
              <p className="flex gap-4">
                Votre adresse de livraison:{" "}
                <a
                  className="text-red-400 flex gap-2 cursor-pointer"
                  onClick={() => {
                    const adr = h.adresse_livraison.split(",");
                    const url = `https://www.google.com/maps/search/?api=1&query=${adr[0]},${adr[1]}&query_place_id=votre_lieu_livraison`;
                    window.open(url, "_blank");
                  }}
                >
                  consulter ici{" "}
                  <LocationEdit size={20} className="text-red-400" />{" "}
                </a>{" "}
              </p>
              <p className="p-2 bg-gray-300 rounded-md w-fit">Statut: {h.statut}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

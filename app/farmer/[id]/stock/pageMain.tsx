"use client";
import { deleteStock } from "@/app/actions/action";
import AsideContent from "@/app/components/asideFarmer";
import { Produit } from "@/app/types/user";
import { ArrowBigRightIcon, ArrowBigLeftIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MainStock({
  id,
  liste,
}: {
  id: string;
  liste?: Produit[];
}) {
  const r = useRouter();
  //console.log(window.length);
  const [show, setshow] = useState(true);

  if (liste && liste.length!=0) {
    return (
      <div className="flex h-full w-full">
        <AsideContent id={id} />
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

            <p className="text-center w-full font-bold">
              LISTE DE VOS PRODUITS
            </p>
          </div>
          <div className="flex flex-col">
            {liste.map((l) => (
              <div key={l.id_produit} className="relative">
                <Image
                  src={`/uploads/${l.images}`}
                  width={250}
                  height={250}
                  alt=""
                />
                <p>Nom du Produit: {l.nom} </p>
                <p>
                  Quantité en stock: {l.quantite} {l.unite=="tas10"?"Tas de 10":l.unite=="tas5"?"Tas de 5":l.unite}
                </p>
                <p>Prix par unité {l.prix} FCFA </p>
                <X
                  onClick={async () => {
                    const a = confirm(
                      "êtes vous sûr de vouloir supprimer ce produit ?",
                    );
                    if (a) {
                      const b=await deleteStock(l.id_produit)
                      console.log(b);
                      r.refresh();
                    }
                  }}
                  size={32}
                  color="red"
                  className="absolute top-1/10 right-1/10 bg-gray-200 rounded-sm hover:cursor-pointer"
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full">
      <AsideContent id={id} />
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

          <p className="text-center w-full font-bold">LISTE DE VOS PRODUITS</p>
        </div>
        <p className="ss">{"VOUS N' AVEZ AUCUN PRODUIT SUR LE MARCHÉ"}</p>
      </main>
    </div>
  );
}

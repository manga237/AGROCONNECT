"use client";

import AsideContent from "@/app/components/aside";
import { Produit } from "@/app/types/user";
import {
  ArrowBigRightIcon,
  Search,
  ArrowBigLeftIcon,
  Star,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function MainContent({
  id,
  produits,
  produit_init,
}: {
  id: string;
  produits: Produit[];
  produit_init:Produit[]
}) {
  const produit2={...produits}
  
 // console.log(produit[0]);
  const [produit,setproduit]=useState(produits)
  const [show, setshow] = useState(true);
  const r = useRouter();
  //console.log(window.length);

  return (
    <div className="flex h-full w-full">
      <AsideContent id={id} />
      <main className="m-2 w-full">
        <div className="flex gap-2 mb-3">
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

          <input
            className="text-xl border-blue-500 border-2 rounded-xl px-2 w-full md:text-3xl"
            type="text"
            name="search"
             onChange={(ch)=>{
              if(ch.currentTarget.value==""){
                setproduit(produit_init)
              }else{
               const aa= produit.filter(e=>e.nom.includes(ch.currentTarget.value))
               setproduit(aa)
              }
             }}
            id=""
            placeholder="rechercher un produit"
          />
          <Search size={32} color="blue" />
        </div>
        <div className="grid gap-3 grid-cols-2 xl:grid-cols-3 lg:grid-cols-4">
          {produit.map((p) => (
            <div
              onClick={() => {
                r.push(`/user/${id}/produit/${p.id_produit}`);
              }}
              className="h-70"
              key={p.id_produit}
            >
              <div className="h-50">
                <Image
                  className="h-full w-full"
                  src={`/uploads/${p.images}`}
                  height={300}
                  width={260}
                  alt=""
                />
              </div>

              <p>{p.nom} </p>
              <p>
                {p.prix} FCFA /{p.unite}{" "}
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star
                    key={i}
                    className={`${i < p.nb_reviews! ? "fill-amber-500 text-amber-500" : "text-amber-500"} `}
                  />
                ))}{" "}
                <span> ({p.nb_reviews}) </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

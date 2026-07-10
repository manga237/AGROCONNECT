"use client";

import { UploadFileFarmer } from "@/app/actions/actionFarmer";
import AsideContent from "@/app/components/asideFarmer";
import { ArrowBigLeftIcon, ArrowBigRightIcon, Search } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function MainContentFarm({ id }: { id: string }) {
  console.log(id);
  const p = usePathname();
  console.log(p);

  //console.log(window.length);
  const [show, setshow] = useState(true);

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

          <p className="text-center w-full font-bold">AJOUTER UN PRODUIT</p>
        </div>
        <p className="ss">SALUT JE SUIS LE MAIN FARMER</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const a = await UploadFileFarmer(new FormData(e.currentTarget), id);
            if (a) {
              const b = document.querySelector(".message") as HTMLDivElement;
              const c = document.querySelector(".erreur") as HTMLDivElement;
              b.style.display = "block";
              c.style.display = "none";
            } else {
              const b = document.querySelector(".erreur") as HTMLDivElement;
              const c = document.querySelector(".message") as HTMLDivElement;
              b.style.display = "block";
              c.style.display = "none";
            }
          }}
          className="flex flex-col gap-5"
        >
          <label htmlFor="nom">Entrer le nom du produit</label>
          <input
            type="text"
            className="border-2 border-blue-400"
            name="nom"
            placeholder="entrer le nom du produit"
          />
          <label htmlFor="desciption">
            Entrer une description pour votre produit
          </label>
          <textarea
            rows={3}
            name="description"
            id=""
            className="border-2 border-blue-400"
            placeholder="entrer votre description"
          ></textarea>
          <label htmlFor="choix">{"Choisir l'unité"} </label>
          <select name="choix" id="choix" defaultValue="">
            <option value="" disabled>
              -- choisir une catégorie --
            </option>
            <option value="litre">Litre (L)</option>
            <option value="tas10">tas de 10</option>
            <option value="tas5">tas de 5</option>
            <option value="kg">Kilogramme (Kg)</option>
            <option value="piece">pièce</option>
            <option value="regime">régime</option>
          </select>
          <label htmlFor="prix">Prix par unité en FCFA</label>
          <input
            name="prix"
            type="number"
            inputMode="numeric"
            className="border-2 border-blue-400 "
            placeholder="entrer le prix"
          />
          <label htmlFor="quantite">Quantité en stock</label>
          <input
            type="number"
            name="quantite"
            className="border-2 border-blue-400"
          />
          <label htmlFor="images">
            Choisir les images correspondant à votre produit
          </label>
          <input
            className="bg-neutral-300 hover:cursor-pointer"
            type="file"
            name="images"
            accept="image/*"
          />
          <input
            type="submit"
            value="AJOUTER AU MAGASIN"
            className="text-white font-bold bg-blue-500 rounded-xl hover:bg-blue-700 "
          />
          <div className="message text-green-400" style={{ display: "none" }}>
            Produit enregistré avec succès
          </div>
          <div className="erreur text-red-400" style={{ display: "none" }}>
            Erreur survenue quelque part{" "}
          </div>
        </form>
      </main>
    </div>
  );
}

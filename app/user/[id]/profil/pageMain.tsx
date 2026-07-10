"use client";

import { UploadFileFarmer } from "@/app/actions/actionFarmer";
import AsideContent from "@/app/components/aside";
import { User } from "@/app/types/user";
import {
  ArrowBigLeftIcon,
  ArrowBigRightIcon,
  Search,
  UserCircle2,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function MainContentFarm({ user }: { user: User }) {
  //console.log(window.length);
  const [show, setshow] = useState(true);

  return (
    <div className="flex h-full w-full">
      <AsideContent id={user.id} />
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

          <p className="text-center w-full font-bold">INFORMATIONS DU COMPTE</p>
        </div>
        <UserCircle2 className="w-full my-5 h-70 bg-blue-300" size={50} />
        <div className="flex flex-col gap-4 text-3xl font-bold">
          <p>
            Nom: <span className="text-blue-500">{user.nom}</span>
          </p>
          <p>
            Prenom: <span>{user.prenom}</span>{" "}
          </p>
          <p>
            Numero: <span>{user.numero}</span>{" "}
          </p>
          <p>E-MAIL: {user.email}</p>
        </div>
      </main>
    </div>
  );
}

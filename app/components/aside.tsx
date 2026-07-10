import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AsideContent({ id }: { id: string }) {
  const r = useRouter();
  return (
    <aside className="bg-amber-200 md:min-w-1/3 none">
      <div className="flex flex-col items-center">
        <Image src="/images/image2.png" width={250} height={200} alt="" />
        <div className="items-aside bg-green-300 flex flex-col h-full gap-3 text-center w-full">
          <p
            onClick={() => {
              r.push(`/user/${id}`);
            }}
          >
            ACHAT
          </p>
          <p
            onClick={() => {
              r.push(`/user/${id}/encours`);
            }}
          >
            LIVRAISON EN COURS
          </p>
          <p
            onClick={() => {
              r.push(`/user/${id}/history`);
            }}
          >
            HISTORIQUE DES COURSES
          </p>
          <p onClick={() => {
              r.push(`/user/${id}/profil`);
            }}>PROFIL</p>
        </div>
      </div>
    </aside>
  );
}

import Image from "next/image";

export default function AsideContent() {
  return (
    <aside className="bg-amber-200 md:min-w-1/3 none">
      <div className="flex flex-col items-center">
        <Image src="/images/image2.png" width={250} height={200} alt="" />
        <div className="items-aside bg-green-300 flex flex-col h-full gap-3 text-center w-full px-3">
          <p>LIVRAISON EN ATTENTE</p>
          <p>LIVRAISON EN COURS</p>
          <p>HISTORIQUE DES LIVRAISONS</p>
        </div>
      </div>
    </aside>
  );
}

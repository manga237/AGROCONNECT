// "use client";

// import AsideContent from "@/app/components/aside";
// import { Produit } from "@/app/types/user";
// import {
//   ArrowBigRightIcon,
//   Search,
//   ArrowBigLeftIcon,
//   Star,
//   CheckCircleIcon,
//   LocateFixedIcon,
//   X,
// } from "lucide-react";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function MainContentProduit({
//   id,
//   produit,
// }: {
//   id: string;
//   produit: Produit;
// }) {
//   console.log(produit);
//   const [position, setposition] = useState({ latitude: 0, longitude: 0 });

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       return;
//     }
//     const watcher = navigator.geolocation.watchPosition(
//       (pos) => {
//         setposition({
//           latitude: pos.coords.latitude,
//           longitude: pos.coords.longitude,
//         });
//       },
//       (err) => {
//         console.log(err);
//       },
//       { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
//     );
//     return () => navigator.geolocation.clearWatch(watcher);
//   }, [position.latitude, position.longitude]);

//   const [prix, setprix] = useState(produit.prix);
//   const [val, setval] = useState(0);
//   const [show, setshow] = useState(true);
//   const p = usePathname();
//   const r = useRouter();
//   //console.log(window.length);

//   return (
//     <div className="flex h-full w-full">
//       <AsideContent id={id} />
//       <main className="m-2 w-full relative">
//         <div
//           className="flex flex-col modal modal-none absolute h-full w-full bg-gray-100 opacity-90 justify-center"
//           onClick={() => {
//             const a = document.querySelector(".modal");
//             a?.classList.toggle("modal-none");
//           }}
//         >
//           <form
//             action=""
//             onSubmit={async (e) => {
//               e.preventDefault();
//               const a = new FormData(e.currentTarget);
//               console.log(a.get("numpay"));
//               console.log(a.get("quantite"));
//             }}
//           >
//             <div
//               className="bg-blue-600 flex flex-col gap-3 relative text-amber-50 font-black"
//               onClick={(e) => {
//                 e.stopPropagation();
//               }}
//             >
//               <X
//                 onClick={() => {
//                   const a = document.querySelector(".modal");
//                   a?.classList.toggle("modal-none");
//                 }}
//                 strokeWidth={5}
//                 size={32}
//                 className="text-red-500 font-bold absolute top-2 right-5 cursor-pointer"
//               />
//               <p>Montant: {prix} FCFA</p>
//               <div className="flex gap-3">
//                 <p>Quantité: </p>{" "}
//                 <input
//                   required
//                   name="quantite"
//                   className="border-2 border-black rounded-md"
//                   type="number"
//                   inputMode="numeric"
//                   max={produit.quantite}
//                   defaultValue={val}
//                   onChange={(e) => {
//                     console.log("oui ", e.currentTarget.valueAsNumber);
//                     if (
//                       e.currentTarget.valueAsNumber >= 0 &&
//                       e.currentTarget.valueAsNumber <= produit.quantite
//                     )
//                       setval(Number(e.currentTarget.value));
//                     if (Number(e.currentTarget.value) >= 0) {
//                       setprix(produit.prix * Number(e.currentTarget.value));
//                     }
//                   }}
//                 />
//               </div>
//               <p>
//                 Disponible: {produit.quantite} {produit.unite}{" "}
//               </p>
//               <div className="flex flex-col gap-2 p-2">
//                 <p>Adresse de livraison:</p>
//                 <div className="flex gap-3">
//                   <p>Localisation en direct: </p>
//                   <p
//                     className="text-red-400 flex gap-2 cursor-pointer"
//                     onClick={() => {
//                       const url = `https://www.google.com/maps/search/?api=1&query=${position.latitude},${position.longitude}&query_place_id=votre_lieu_livraison`;
//                       window.open(url, "_blank");
//                     }}
//                   >
//                     cliquer pour voir{" "}
//                     <LocateFixedIcon strokeWidth={3} fill="" size={30} />
//                   </p>
//                 </div>
//                 <p>
//                   Position actuelle : {position.latitude}, {position.longitude}
//                 </p>

//                 <div className="flex flex-col ">
//                   <p>Mode de paiement disponible</p>
//                   <div className="flex gap-2 bg-blue-100 w-fit p-5">
//                     <Image
//                       src={"/images/mtn.jpeg"}
//                       alt=""
//                       width={200}
//                       height={200}
//                     />
//                     <Image
//                       src={"/images/orange.webp"}
//                       alt=""
//                       width={200}
//                       height={200}
//                     />
//                   </div>
//                 </div>
//                 <p>Numéro du payeur: </p>
//                 <input
//                   name="numpay"
//                   inputMode="numeric"
//                   min={0}
//                   maxLength={9}
//                   type="text"
//                   className="border-2"
//                   placeholder="entrer le numéro qui va payer"
//                   required
//                 />
//                 <input
//                   className="bg-green-400 font-bold text-2xl text-amber-50 hover:bg-green-800 p-2 rounded-md flex gap-2 w-fit"
//                   type="submit"
//                   value="Acheter"
//                 />
//                 <button
//                   onSubmit={async () => {
//                     // console.log(process.env.TOKEN_CAMPAY);
//                     console.log("clic");

//                     const a = await fetch(
//                       "https://demo.campay.net/api/collect/",
//                       {
//                         method: "POST",
//                         headers: {
//                           "Content-type": "application/json",
//                           Authorization: `Token eeeb9724ef8b567ff16c7ebef93851d1851bacc8`,
//                         },
//                         body: JSON.stringify({
//                           amount: "10",
//                           from: "237692495185",
//                           currency: "XAF",
//                           description: "retrait",
//                         }),
//                       },
//                     );
//                     const data = await a.json();
//                     if (data.reference) {
//                       setTimeout(async () => {
//                         const i = data.reference;
//                         const b = await fetch(
//                           `https://demo.campay.net/api/transaction/${i}`,
//                           {
//                             headers: {
//                               "Content-type": "application/json",
//                               Authorization: `Token eeeb9724ef8b567ff16c7ebef93851d1851bacc8`,
//                             },
//                           },
//                         );
//                         const d = await b.json();
//                         console.log("status : ", d.status);
//                       }, 10000);
//                     }

//                     console.log(data);
//                   }}
//                   className="bg-green-400 font-bold text-2xl text-amber-50 hover:bg-green-800 p-2 rounded-md flex gap-2 w-fit"
//                 >
//                   Acheter <CheckCircleIcon size={32} />
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//         {/* <div
//           className="bg-gray-50 opacity-10 h-full w-full flex justify-center items-center modal modal-none absolute"
//           onClick={() => {
//             const a = document.querySelector(".modal");
//             a?.classList.toggle("modal-none");
//           }}
//         >
//           <p
//             className="text-3xl p-5 rounded-2xl bg-blue-400"
//             onClick={(e) => {
//               e.stopPropagation();
//             }}
//           >
//             message box au dessus de tous
//           </p>
//         </div> */}
//         <div className="flex gap-2 ">
//           {show ? (
//             <ArrowBigRightIcon
//               className="arrow"
//               size={36}
//               onClick={() => {
//                 const a = document.querySelector("aside");
//                 a?.classList.remove("none");
//                 setshow(false);
//               }}
//             />
//           ) : (
//             <ArrowBigLeftIcon
//               size={36}
//               className="arrow"
//               onClick={() => {
//                 const a = document.querySelector("aside");
//                 a?.classList.add("none");
//                 setshow(true);
//               }}
//             />
//           )}

//           <div>PRODUIT</div>
//         </div>
//         <div>
//           <Image
//             className="w-full"
//             src={`/uploads/${produit.images}`}
//             height={250}
//             width={250}
//             alt=""
//           />
//           <p>
//             {produit.prix} FCFA par {produit.unite}{" "}
//           </p>
//         </div>
//         <div>{produit.nom}</div>
//         <div className="p-2 border-2 border-amber-100 rounded-xl my-2">
//           <p>{produit.description} </p>
//         </div>
//         <button
//           onClick={() => {
//             const a = document.querySelector(".modal");
//             a?.classList.toggle("modal-none");
//           }}
//           className="bg-green-400 font-bold text-2xl text-amber-50 hover:bg-green-800 p-2 rounded-md flex gap-2"
//         >
//           Commander maintenant <CheckCircleIcon size={32} />
//         </button>
//       </main>
//     </div>
//   );
// }
// /*
// const a = await fetch("https://demo.campay.net/api/balance", {
//                 headers: {
//                   "Content-type": "application/json",
//                   "Authorization": `Token eeeb9724ef8b567ff16c7ebef93851d1851bacc8`,
//                 },
//               });
// */

// /*
 
// const a = await fetch("https://demo.campay.net/api/collect/", {
//                 method: "POST",
//                 headers: {
//                   "Content-type": "application/json",
//                   Authorization: `Token eeeb9724ef8b567ff16c7ebef93851d1851bacc8`,
//                 },
//                 body: JSON.stringify({
//                   amount: "25",
//                   from: "237692495185",
//                   currency: "XAF",
//                   description: "test",
//                 }),
//               });
//  */

// /*
//  const a = await fetch("https://demo.campay.net/api/withdraw/", {
//                 method: "POST",
//                 headers: {
//                   "Content-type": "application/json",
//                   Authorization: `Token eeeb9724ef8b567ff16c7ebef93851d1851bacc8`,
//                 },
//                 body: JSON.stringify({
//                   amount: "25",
//                   to: "237692495185",
//                   currency: "XAF",
//                   description: "retrait",
//                 }),
//               });
// */

// /*
//   <button
//                 onSubmit={async () => {
//                   // console.log(process.env.TOKEN_CAMPAY);
//                   console.log("clic");

//                   const a = await fetch(
//                     "https://demo.campay.net/api/collect/",
//                     {
//                       method: "POST",
//                       headers: {
//                         "Content-type": "application/json",
//                         Authorization: `Token eeeb9724ef8b567ff16c7ebef93851d1851bacc8`,
//                       },
//                       body: JSON.stringify({
//                         amount: "10",
//                         from: "237692495185",
//                         currency: "XAF",
//                         description: "retrait",
//                       }),
//                     },
//                   );
//                   const data = await a.json();
//                   if (data.reference) {
//                     setTimeout(async () => {
//                       const i = data.reference;
//                       const b = await fetch(
//                         `https://demo.campay.net/api/transaction/${i}`,
//                         {
//                           headers: {
//                             "Content-type": "application/json",
//                             Authorization: `Token eeeb9724ef8b567ff16c7ebef93851d1851bacc8`,
//                           },
//                         },
//                       );
//                       const d = await b.json();
//                       console.log("status : ", d.status);
//                     }, 10000);
//                   }

//                   console.log(data);
//                 }}
//                 className="bg-green-400 font-bold text-2xl text-amber-50 hover:bg-green-800 p-2 rounded-md flex gap-2 w-fit"
//               >
//                 Acheter <CheckCircleIcon size={32} />
//               </button>
// */

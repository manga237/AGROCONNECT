import { pool } from "@/app/bd";
import MainContentProduit from "./pageMain";
import { Produit } from "@/app/types/user";

type props={ params:{
  id_produit:string;
  id:string
} }
export default async function Page({params}:props) {
  const {id_produit,id}= await params;
   const {rows}=await pool.query("select * from produits where id_produit=$1",[id_produit]) 
   console.log(id,id_produit);
   
    return (
      <MainContentProduit id={id} produit={rows[0] as Produit} />
    );
}
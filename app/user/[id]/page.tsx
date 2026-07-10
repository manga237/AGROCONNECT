
import { pool } from "@/app/bd";
import MainContent from "./PageMain";
import { Produit } from "@/app/types/user";
type props={
  params:{
    id:string
  }
}
export default async function Page({params}:props) {
 // const { id } = useParams();
 const {id}= await params;
 const {rows}=await pool.query("select * from produits") 
  return (
    <MainContent id={id} produits={rows} produit_init={rows} />
  );
}

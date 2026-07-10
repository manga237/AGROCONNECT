import { pool } from "@/app/bd";
import MainContentLiv from "./pageMain";
type props={
  params:{
    id:string
  }
}
export default async function Page({params}:props) {
 // const { id } = useParams();
 const {id}= await params;
 const {rows}=await pool.query("select * from livraison_livreur where statut=$1 and id=$2",["termine",id])
console.log(rows);

 if(rows.length==0){
   return (
     <MainContentLiv id={id} />
   );
 }
 return (
     <MainContentLiv id={id} livraison={rows} />
   );

}
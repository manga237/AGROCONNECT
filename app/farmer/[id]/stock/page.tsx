import { AfficheList } from "@/app/actions/actionAffichStock";
import MainStock from "./pageMain";

type props={
  params:{
    id:string
  }
}
export default async function Page({params}:props) {
 // const { id } = useParams();
 const {id}= await params;
 const a= await AfficheList(id)
 if(a){
  return (
    <MainStock id={id} liste={a} />

  );
 }
  return (
    <MainStock id={id} />

  );
}

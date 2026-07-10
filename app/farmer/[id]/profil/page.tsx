import { getUSer } from "@/app/actions/recupereruser";
import MainContentFarm from "./pageMain";
type props={
  params:{
    id:string
  }
}
export default async function Page({params}:props) {
 // const { id } = useParams();
 const {id}= await params;
const user=await getUSer(id)
 return (
    <MainContentFarm user={user} />
  );
}

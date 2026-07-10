
import MainContentFarm from "./pageMain";
type props={
  params:{
    id:string
  }
}
export default async function Page({params}:props) {
 // const { id } = useParams();
 const {id}= await params;
  return (
    <MainContentFarm id={id} />
  );
}

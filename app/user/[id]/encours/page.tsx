import { pool } from "@/app/bd";
import MainContentProduit from "./pageMain";
import { type_historique_acheteur } from "@/app/types/user";

type props = {
  params: {
    id: string;
  };
};
export default async function Page({ params }: props) {
  const { id } = await params;
  console.log(id);
  
  const { rows, rowCount } = await pool.query(
    "select * from historique_acheteur where id_utilisateur=$1",
    [id],
  );
  console.log(rowCount,rows);
  
  //console.log(id,id_produit);
  if (rowCount == 0) {
    <MainContentProduit id={id} />;
  }
  return (
    <MainContentProduit
      id={id}
      hist_produit={rows as type_historique_acheteur[]}
    />
  );
}

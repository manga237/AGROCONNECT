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
  const { rows, rowCount } = await pool.query(
    "select * from historique_acheteur where id_utilisateur=$1",
    [id],
  );
  if (rowCount == 0) {
    <MainContentProduit id={id} />;
  }
  //console.log(id,id_produit);

  return (
    <MainContentProduit
      id={id}
      hist_produit={rows as type_historique_acheteur[]}
    />
  );
}

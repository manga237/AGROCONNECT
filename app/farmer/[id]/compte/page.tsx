import { AfficheList } from "@/app/actions/actionAffichStock";
import MainStock from "./pageMain";
import MainAccount from "./pageMain";
import { pool } from "@/app/bd";
import {
  type_historique_agri_depot,
  type_historique_agri_retrait,
} from "@/app/types/user";

type props = {
  params: {
    id: string;
  };
};
export default async function Page({ params }: props) {
  // const { id } = useParams();
  const { id } = await params;
  const { rows } = await pool.query(
    "select solde from compte where id=$1 limit 1",
    [id],
  );
  console.log(rows);
  const rows1 = await pool.query(
    "select * from historique_agriculteur_depot where id=$1 order by date desc",[id]
  );
  const rows2 = await pool.query(
    "select * from historique_agriculteur_retrait where id=$1 order by date desc",[id]
  );

  return (
    <MainAccount
      id={id}
      solde={rows[0].solde}
      depot={rows1.rows as type_historique_agri_depot[]}
      retrait={rows2.rows as type_historique_agri_retrait[]}
    />
  );
}

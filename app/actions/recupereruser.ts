import { pool } from "../bd";
import { Produit, User } from "../types/user";

export async function getUSerFromIdProduit(id: string) {
  const { rows } = await pool.query(
    "select * from utilisateurs where id=(select id_proprietaire from produits where id_produit=$1)",
    [id],
  );
  return rows[0] as User;
}
export async function getUSer(id: string) {
  const { rows } = await pool.query("select * from utilisateurs where id=$1", [
    id,
  ]);
  return rows[0] as User;
}
export async function getProduit(id: string) {
  const { rows } = await pool.query(
    "select * from produits where id_produit=$1",
    [id],
  );
  return rows[0] as Produit;
}
export async function getSoldeFromProduit(id: string) {
  const { rows } = await pool.query(
    "select solde from compte where id=(select id from utilisateurs where id=(select id_proprietaire from produits where id_produit=$1))",
    [id],
  );

  return rows[0].solde as number;
}
export async function getSolde(id: string) {
  const { rows } = await pool.query("select solde from compte where id=$1", [
    id,
  ]);
  // console.log("***************************************************************",rows[0],rows);

  return rows[0].solde as number;
}
//select * from utilisateurs where id=(select id_proprietaire from produits where id_produit=$1)
export async function setSolde(
  user: User,
  agriculteur: User,
  montant: number,
  id_produit: string,
  lat: number,
  long: number,
  transaction_id: string,
  quantite: number,
) {
  let quantite_f = await pool.query(
    "select quantite from produits where id_produit=$1",
    [id_produit],
  );
  quantite_f = quantite_f.rows[0].quantite;
  const q = Number(quantite_f) - quantite;
  const rows5 = await pool.query(
    "update produits set quantite=$1 where id_produit=$2 returning *",
    [q, id_produit],
  );
  const solde = await getSolde(agriculteur.id);
  const montant_depot = montant + solde;
  const { rows } = await pool.query(
    "update compte set solde=$1 where id=$2 returning *",
    [montant, agriculteur.id],
  );
  const adresse_livraison = `${lat},${long}`;
  const produit = await getProduit(id_produit);
  const rows4 = await pool.query(
    "insert into historique_agriculteur_depot(num_transaction,num_payeur,montant,id) values ($1,$2,$3,$4) returning *",
    [transaction_id, user.numero, montant_depot,agriculteur.id],
  );
  const rows3 = await pool.query(
    "insert into livraison_livreur(id_produit,nom_produit,adresse_livraison,nom_payeur,num_payeur,statut) values($1,$2,$3,$4,$5,$6) returning *",
    [
      produit.id_produit,
      produit.nom,
      adresse_livraison,
      user.nom,
      user.numero,
      "attente",
    ],
  );
  const rows2 = await pool.query(
    "insert into historique_acheteur(id_produit,nom_produit,adresse_livraison,statut,images_produit,id_utilisateur) values($1,$2,$3,$4,$5,$6) returning *",
    [
      produit.id_produit,
      produit.nom,
      adresse_livraison,
      "attente",
      produit.images,
      user.id,
    ],
  );
  if (
    (rows[0].montant =
      montant &&
      rows2.rows.length != 0 &&
      rows3.rows.length != 0 &&
      rows4.rows.length != 0 &&
      rows5.rows.length != 0)
  ) {
    return true;
  }
  return false;
}

"use server";
import { log } from "console";
//
/*
équivalent à quand un agriculteur clique sur retirer argent dans son compte.
lorsque celui-ci 
* il spécifie la somme qu'il veut retirer
* on retire cette somme de son compte en lançant la transaction
* on ajoute la transaction dans la liste des transactions éffectués sur le compte de l'agriculteur
* (N° transaction, date de retrait, montant,)

*/

import { pool } from "../bd";
import { getUSer, getUSerFromIdProduit } from "./recupereruser";

export async function retireArgent(
  montant: number,
  id: string,
  transaction: string,
) {
  // const user = await getUSer(id);

  const { rows } = await pool.query(
    "update compte set solde=$1 where id=$2 returning *",
    [0, id],
  );
  const rows1 = await pool.query(
    "insert into historique_agriculteur_retrait(num_transaction,montant,id) values($1,$2,$3) returning *",
    [transaction, montant, id],
  );

  if (rows[0].solde && rows1.rows.length != 0) {
    console.log("tout s'est bien passé");
  }
}

export async function changeAttente(id: string, id_livreur: string) {
  const { rows } = await pool.query(
    "update livraison_livreur set statut=$1 where id_produit=$2 returning *",
    ["livraison", id],
  );
  const rows2 = await pool.query(
    "update livraison_livreur set id=$1 where id_produit=$2 returning *",
    [id_livreur, id],
  );
  // const user = await getUSerFromIdProduit(id);
  const rows1 = await pool.query(
    "update historique_acheteur set statut=$1 where id_produit=$2 returning *",
    ["livraison", id],
  );
  if (rows1.rows.length != 0 && rows2.rows.length != 0 && rows.length != 0) {
    console.log("tout s'est bien passé");
  } else {
    console.log("quelque chose a mal tourné");
  }
  
}

export async function changeLivraison(id: string) {
  const { rows } = await pool.query(
    "update livraison_livreur set statut=$1 where id_produit=$2 returning *",
    ["termine", id],
  );

  // const user = await getUSerFromIdProduit(id);
  const rows1 = await pool.query(
    "update historique_acheteur set statut=$1 where id_produit=$2 returning *",
    ["termine", id],
  );
  if (rows1.rows.length != 0 && rows.length != 0) {
    console.log("tout s'est bien passé");
  } else {
    console.log("quelque chose a mal tourné");
  }
  
}
/*
ici, quand un utilisateur a payé une facture avec succès:
* on ajoute le produit dans la liste des produits en attente de livraison
* pour chacun on spécifie (nom du produit, adresse de livraison, N° du payeur, nom du payeur)
* possibilité de cliquer sur valider la livraison lorsque celui-ci veut livrer le produit.


*/

import { pool } from "../bd";
import { User } from "../types/user";

/*
  lorsque le livreur aura valider la livraison, le statut du produit passera à (livraison en cours) dans l'historique de livraison en attente du payeur, et la livraison passera dans l'historique de livraison en cours du livreur
 - lorsque celui-ci sera arrivé à destination, il pourra cliquer sur livraison terminé et le statut de la livraison passera à terminé chez le client et le livreur
  */

/*


lorsque le produit passera à terminer chez le client, il pourra noter le produit sur 5 puis envoyer 
 * puis le review se mettra à jour dans la liste des produits et on ajoutera le review dans la liste des reviews (id produit, reviews)


*/

export async function validate_livraison(id_produit: string) {
  const { rows } = await pool.query(
    "select * from utilisateurs where id=(select id_proprietaire from produits where id_produit=$1)",
    [id_produit],
  );
  const user = rows[0] as User;
  const rows1 = await pool.query(
    "update historique_acheteur set statut=$1 where id_utilisateur=$2 returning *",
    ["livraison", user.id],
  );
  const rows2 = await pool.query(
    "update livraison_livreur set statut=$1 where id_produit=$2",
    ["livraison", id_produit],
  );
  if (rows1.rowCount!=0 && rows2.rowCount != 0) {
    return true;
  }
  return false;
}

export async function terminate_livraison(id_produit: string) {
  const { rows } = await pool.query(
    "select * from utilisateurs where id=(select id_proprietaire from produits where id_produit=$1)",
    [id_produit],
  );
  const user = rows[0] as User;
  const rows1 = await pool.query(
    "update historique_acheteur set statut=$1 where id_utilisateur=$2 returning *",
    ["termine", user.id],
  );
  const rows2 = await pool.query(
    "update livraison_livreur set statut=$1 where id_produit=$2",
    ["termine", id_produit],
  );
  if (rows1.rowCount!=0 && rows2.rowCount != 0) {
    return true;
  }
  return false;
}


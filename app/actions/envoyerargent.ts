"use server";
/*
ici, c'est quand un acheteur achète un produit, 
la somme spécifié lors de l'achat part dans le compte de l'agriculteur
 * on récupère le solde de l'agriculteur
 * on l'incrémente de l'argent qu'on vient de prendre sur l'achat 
 * dans l'historique des transactions de l'agriculteur, on ajoute la transaction (N° transaction, N° payeur, date, montant)
 
* le produit s'ajoutera dans l'historique des livraisons en attente du client, avec (id produit,nom du produit, adresse de livraison,statut,image) avec un statut en attente

*/

import { getUSer, getUSerFromIdProduit, setSolde } from "./recupereruser";

export async function achatProduit(
  id_acheteur: string,
  montant: number,
  id_produit: string,
  latitude: number,
  longitude: number,
  transaction: string,
  quantite:number
) {
  try {
    const user = await getUSer(id_acheteur);
    const agri = await getUSerFromIdProduit(id_produit);

    const a = await setSolde(
      user,
      agri,
      montant,
      id_produit,
      latitude,
      longitude,
      transaction,
      quantite
    );
    if (a == true) {
      console.log("tout s'est bien passé");
    } else {
      console.log("erreur quelque part");
    }
  } catch (error) {
    console.log(error);
  }
}

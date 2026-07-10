export type User = {
  id: string;
  nom: string;
  prenom: string;
  numero: string;
  email: string;
  password: string;
  role: "acheteur" | "agriculteur" | "livreur";
};

export type Produit = {
  id_produit: string;
  nom: string;
  description: string;
  quantite: number;
  unite?: "litre" | "kg" | "piece" | "regime" | "tas5" | "tas10";
  id_proprietaire: string;
  prix: number;
  images: string;
  nb_reviews?: number;
};

export type Livraison = {
  id_produit: string;
  nom_produit: string;
  adresse_livraison: string;
  nom_payeur: string;
  num_payeur: string;
  statut: "attente" | "livraison" | "termine";
  date: Date;
};
export type type_historique_acheteur = {
  id_produit: string;
  nom_produit: string;
  adresse_livraison: string;
  statut: "attente" | "livraison" | "termine";
  images_produit: string;
  date: string;
  id_utilisateur:string
};
export type type_historique_agri_depot={
  num_transaction:string
  date:Date
  montant:string
  num_payeur:string
  id:string
}

export type type_historique_agri_retrait={
  num_transaction:string
  date:Date
  montant:string
  id:string
}

/*
{
  id_produit: '6c3b4b73-71d7-4f92-b39f-8bfcd0bb3265',
  nom: '',
  description: ',b ',
  quantite: '65',
  unite: 'tas10',
  id_proprietaire: 'c6c0f4c0-9f5d-4a3e-9b4c-8d3e7f1b27c2',
  prix: '',
  images: '2581ade2329e40aab928b13e6aa1d24d.jpg'
}
*/

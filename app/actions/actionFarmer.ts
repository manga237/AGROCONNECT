"use server";

import bcrypt from "bcryptjs";
import { writeFile } from "fs/promises";
import path from "path";
import { pool } from "../bd";
import { Produit } from "../types/user";

export async function UploadFileFarmer(f: FormData,id:string) {
  const a = f.getAll("images") as File[];
  const v = a.filter((f) => f.size > 0);
  
  
  console.log(a);
  console.log(f.get('description'));
  
  if (v.length != 0) {
    const images=[]
    for (const file of a) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // console.log(buffer,arrayBuffer);
      // console.log(file);

      // console.log(process.cwd());
      let file_name = crypto.randomUUID();
      file_name = file_name.replaceAll("-", "") + "." + file.name.split(".")[1];
      console.log(file_name);
      const filepath = path.join(process.cwd(), "public", "uploads", file_name); 
      // filepath=await hashed(filepath.split('.')[0])
      images.push(file_name)

      await writeFile(filepath, buffer);
    }

  const produit:Produit={
    id_produit:crypto.randomUUID(),
    nom:f.get('nom') as string,
    description:f.get("description") as string,
    id_proprietaire:id,
    prix:f.get('prix') as unknown as number,
    quantite:f.get('quantite') as unknown as number,
    unite:f.get('choix') as "litre" | "kg" | "piece" | "regime" | "tas5" | "tas10",
    images:images.join(',')
  }
   // console.log(images.join(','));
    //console.log(produit);
    
    
     try {
       const {rows} =await pool.query('insert into produits(id_produit,nom,description,quantite,unite,id_proprietaire,prix,images) values($1,$2,$3,$4,$5,$6,$7,$8) returning *',[produit.id_produit,produit.nom,produit.description,produit.quantite,produit.unite,produit.id_proprietaire,produit.prix,produit.images])
       console.log(rows);
       return true;

     } catch  {
      return false
     }
      



  }
  return false;

}


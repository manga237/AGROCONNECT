import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AgroConnect APP",
    short_name: "AgroConnect",
    display: "standalone",
    start_url: "/",
    description: "Merci de Choisir AgroConnect, notre appli qui vous permet d'éffectuer des Achats directement depuis les agriculteurs et ceux à moindre coût sans avoir de taxe",
    background_color: "#ffffff",
    theme_color: "#088A26",
    icons: [
      {
        src: "images/agro192.png",
        sizes: "192x192",
        type: "/image/png",
        purpose: "any",
      },
      {
        src: "images/agro512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
     screenshots: [
       {
         src: "images/agro400x540.png",
         sizes: "400x540",
         type: "image/png",
         form_factor: "narrow",
         label: "image sur grand écran",
       },
       {
         src: "images/agro1280x1280.png",
         sizes: "1280x1280",
         type: "image/png",
         form_factor: "wide",
         label: "image sur mobile",
       },
     ],
  };
}

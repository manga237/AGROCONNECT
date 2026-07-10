import type { NextConfig } from "next";
import {withSerwist} from "@serwist/turbopack";

// const withSerwiste = withSerwist({
//   swDest: "public/sw.ts",
//   swSrc: "app/sw.ts",
//   disable: false,
// });

const nextConfig: NextConfig = { 
   experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  /* config options here */
};

export default withSerwist(nextConfig);

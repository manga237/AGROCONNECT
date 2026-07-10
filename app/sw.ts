import { defaultCache } from "@serwist/turbopack/worker";
import { NetworkFirst, Serwist } from "serwist";
import type { SerwistGlobalConfig, PrecacheEntry } from "serwist";

declare global {
  interface WorkerGlobalScope extends ServiceWorker, SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: WorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  navigationPreload: true,
  clientsClaim: true,
  precacheOptions: { concurrency: 10 },
  // runtimeCaching: [
  //   {
  //     matcher({ url }) {
  //       console.log("FETCH DE DATA SUR: ",url);
  //       return url.pathname.startsWith("/data");
  //     },
  //     handler: new NetworkFirst(),
  //   },
  //   ...defaultCache,
  // ],
  runtimeCaching: [
    {
      matcher({ request }) {
        return request.destination === "document";
      },
      handler: async ({ request }) => {
        try {
          const response = await fetch(request);

          if (!response.ok) {
            throw new Error("Erreur lié au tunnel");
          }

          return response;
        } catch (error) {
          const cachedResponse = await caches.match(request);

          if (cachedResponse) {
            return cachedResponse;
          }

          const offline_secours = await caches.match("/offline");
          if (offline_secours) {
            return offline_secours;
          }
          throw error;
        }
      },
    },
    ...defaultCache,
  ],
  //runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: "/offline",
        matcher({ request }) {
          console.log("YOUR OFFLINE");
          return request.destination === "document";
        },
      },
    ],
  },
});

// self.addEventListener("install", () => {
//   self.skipWaiting();
// });

serwist.addEventListeners();

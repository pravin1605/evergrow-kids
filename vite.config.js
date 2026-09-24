import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "icons/icon-192.png",
        "icons/icon-512.png",
      ],

      manifest: {
        id: "/",
        name: "EverGrow Kids",
        short_name: "EverGrow Kids",

        description:
          "EverGrow Kids - Learn, Play and Grow.",

        theme_color: "#ffffff",
        background_color: "#ffffff",

        display: "standalone",
        orientation: "portrait",

        start_url: "/",
        scope: "/",

        categories: [
          "education",
          "kids",
          "games",
        ],

        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },

      workbox: {
        navigateFallback: "/index.html",

        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,mp3,wav,ogg}",
        ],
      },

      devOptions: {
        enabled: true,
      },
    }),
  ],
});
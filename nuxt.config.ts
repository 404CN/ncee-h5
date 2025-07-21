// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.example.com'
    }
  },
  site: {
    url: 'https://www.ncee.cc',
    name: 'NCEE DATABASE',
  },
  sitemap: {
    sources: [
      'https://www.ncee.cc/sitemap.xml',
    ]
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui-pro', '@nuxtjs/sitemap'],
  css: [
    "~/assets/style/main.css",
  ],
  ui: {
    fonts: false
  },
})
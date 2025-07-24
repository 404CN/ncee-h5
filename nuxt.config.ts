// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      assetBase: process.env.NUXT_PUBLIC_AEEET_BASE,
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
  image: {
    domains: [process.env.NUXT_PUBLIC_AEEET_DOMAIN!],
    provider: 'ipx',
    // ipx: {
    //   baseURL: ''
    // }
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui-pro', '@nuxtjs/sitemap', '@nuxt/image'],
  css: [
    "~/assets/style/main.css",
  ],
  ui: {
    fonts: false
  },
})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.css',
  ],
  runtimeConfig: {
    public: {
      apiUrl:'https://mock-api.binaryboxtuts.com',
      apiKey:'binarybox_api_key_VzO8M31mfzUAW58MBuDkyVX68IWufWJWW7m5BqqSi3FSXHHwKeHjuXQzOC7QdACzffplQ93npFb6Q3sMQLeImXxkz3IHQDkWy1yt'

    },
  

    modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],
    axios: {
      proxy: true,
      baseURL: 'https://api.doppcall.com',
    },
    proxy: {
      '/api/': {
        target: 'https://api.doppcall.com',
        pathRewrite: { '^/api/': '' },
        changeOrigin: true
      }
    }
  },
})
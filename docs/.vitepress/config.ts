import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TP2 - Revue de Code",
  description: "Site pour la revue de code à chaque semaine.",
  base: "/appweb-trpr02/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Accueil', link: '/' }
    ],

    sidebar: [
      {
        text: 'Revue du code à',
        items: [
          { text: 'Mikaël Charette', link: '/mikael-charette' },
          { text: 'Zachary Vandermeerschen', link: '/zachary-vandermeerschen' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

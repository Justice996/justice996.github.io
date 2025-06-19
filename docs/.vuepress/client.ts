// @ts-ignore
import { defineClientConfig } from 'vuepress/client'
// @ts-ignore
import Home from './Layouts/Home.vue'
// // @ts-ignore
import Snake from './Layouts/Snake.vue'
import { setupSnowFall } from "vuepress-theme-hope/presets/snowFall.js";


export default defineClientConfig({
    enhance: ({ app, router, siteData }) => {
      },
    setup() {
      setupSnowFall();
    },
    rootComponents: [],
    layouts: {
        Home,
        Snake
    }
})

import { defineClientConfig } from '@vuepress/client'
import Home from './Layouts/Home.vue'

export default defineClientConfig({
    enhance({ app, router, siteData }) {},
    setup() {},
    rootComponents: [],
    layouts: {
        Home,
    }
})

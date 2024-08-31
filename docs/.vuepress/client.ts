// @ts-ignore
import { defineClientConfig } from '@vuepress/client'
// @ts-ignore
import Home from './Layouts/Home.vue'
// @ts-ignore
import Snake from './Layouts/Snake.vue'

// @ts-ignore
import { defineGiscusConfig } from "vuepress-plugin-comment2/client";
// @ts-ignore
import Layout from "./Layouts/Layout.vue";

defineGiscusConfig({
    repo: "Justice996/justice996.github.io",
    repoId: "R_kgDOJ1ivvQ",
    category: "Announcements",
    categoryId: "DIC_kwDOJ1ivvc4CZHRk",
});

export default defineClientConfig({
    enhance({ app, router, siteData }) {},
    setup() {},
    rootComponents: [],
    layouts: {
        Home,
        Layout,
        Snake
    }
})

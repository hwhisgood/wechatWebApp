import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import svgIcon from "@/components/SvgIcon/index.vue";
import "amfe-flexible/index.js";
import "./permission";
import Fastclick from "fastclick";
import { setupWechatAuth } from '@/configs/wechatAuth'

Fastclick(document.body)
const app = createApp(App);

setupWechatAuth(app)
app.use(createPinia());
app.use(router);
app.component("svg-icon", svgIcon);
app.mount("#app");

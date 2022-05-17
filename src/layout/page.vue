<template>
  <div class="app-container">
    <div class="app-header" v-if="showNavBar">
      <NavBar :title="title" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div :class="showNavBar ? 'app-body-noTabBar' : 'app-body-noNavBar-noTabBar'">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { NavBar } from "vant";
import { useRoute, useRouter } from "vue-router";
import { useSettingStore } from "@/stores/setting";

const route = useRoute();
const router = useRouter();
const settingStore = useSettingStore();

const showNavBar = computed(() => (route.meta.isNavBar == undefined ? settingStore.isNavBar : route.meta.isNavBar))
const title = computed(() => (route.query.title ? route.query.title : route.meta.title))

function onClickLeft() {
  router.go(-1);
}

</script>

<style>
</style>
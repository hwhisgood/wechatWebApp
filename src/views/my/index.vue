<template>
  <div class="my-page">
    <!-- 顶部资料卡 -->
    <userPanel></userPanel>

    <!-- 底部操作栏 -->
    <CellGroup inset>
      <Cell is-link title="更绑用户" @click="router.push({ path: '/my/changeBoundClient' })" size="large"></Cell>
      <Cell is-link title="报表字体大小" @click="() => isShowfontSizeOption = true" size="large"></Cell>
      <Cell is-link title="推荐数据报表" @click="router.push({ path: '/my/profile2' })" size="large"></Cell>
      <Cell title="当前版本" size="large">v1.0.0</Cell>
      <Cell is-link clickable title="退出登录" @click="onLogout" size="large"></Cell>
    </CellGroup>

    <!-- 弹窗 -->
    <ActionSheet v-model:show="isShowfontSizeOption" :actions="fontSizeOption" cancel-text="取消" close-on-click-action
      @cancel="onCancel" />
  </div>
</template>

<script setup name="My">
import { Cell, CellGroup, ActionSheet } from "vant";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import userPanel from './userPanel/index.vue'
import { ref } from "vue";

const userStore = useUserStore();
const router = useRouter();

const isShowfontSizeOption = ref(false)
const fontSizeOption = [
  { name: '大' },
  { name: '中' },
  { name: '小' },]

function onCancel() {
  isShowfontSizeOption.value = false
}
function onLogout() {
  userStore.LogOut().then(() => {
    router.push({ path: "/login" });
  });
}
</script>

<style lang="scss" scoped>
</style>>
<template>
  <div class="my-page">
    <!-- 顶部资料卡 -->
    <userPanel></userPanel>

    <!-- 底部操作栏 -->
    <CellGroup inset>
      <Cell is-link title="更绑用户" @click="router.push({ path: '/my/changeBoundClient' })" size="large"></Cell>
      <Cell is-link title="报表字体大小" @click="() => isShowfontSizeOption = true" size="large"></Cell>
      <Cell is-link title="推荐数据报表" size="large" @click="() => isShowShareModa = true"></Cell>
      <Cell title="当前版本" size="large">v1.0.0</Cell>
      <Cell is-link clickable title="退出登录" @click="onLogout" size="large"></Cell>
    </CellGroup>

    <!-- 弹窗 -->
    <ActionSheet v-model:show="isShowfontSizeOption" :actions="fontSizeOption" cancel-text="取消" close-on-click-action
      @cancel="onCancel" @select="onSelect" />
  </div>
  <!-- 分享指引 -->
  <div class="share-moda" v-if="isShowShareModa">
    <div class="flex-center">
      <div class="share-text">
        点击“
        <svg-icon name="icon_more" width="24px" height="24px" color="#fff" @click="() => isShowShareModa = false">
        </svg-icon>
        ”,选择“发送给朋友”，分享小程序
        <svg-icon name="icon_delectcontent" width="24px" height="24px" fill="#fff"
          @click="() => isShowShareModa = false">
        </svg-icon>
        <div class="triangle-block"></div>
      </div>
    </div>
  </div>
</template>

<script setup name="My">
import { Cell, CellGroup, ActionSheet } from "vant";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useSettingStore } from "@/stores/setting";
import userPanel from './userPanel/index.vue'
import { ref } from "vue";

const userStore = useUserStore();
const settingStore = useSettingStore();
const router = useRouter();

const isShowfontSizeOption = ref(false)
const isShowShareModa = ref(false)  // 显示分享指引

const fontSizeOption = [
  { name: '大', key: "big" },
  { name: '中', key: "middle" },
  { name: '小', key: "small" },]

function onCancel() {
  isShowfontSizeOption.value = false
}
function onLogout() {
  userStore.LogOut().then(() => {
    router.push({ path: "/login" });
  });
}
function onSelect(item) {
  settingStore.setTableFontSize(item.key)
}
</script>

<style lang="scss" >
.share-moda {
  position: fixed;
  // top: var(--van-nav-bar-height);
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .4);
  z-index: 9999
}

.share-text {
  background: #fff;
  color: #333;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  background: #fff;
  border-radius: 4px;
  padding: 14px 8px;
  position: relative;

  .triangle-block {
    position: absolute;
    top: -20px;
    right: 60px;
    border: 0.26667rem solid #fff;
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
  }
}

.flex-center {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  // padding: 0 20px;
  box-sizing: border-box;
}
</style>
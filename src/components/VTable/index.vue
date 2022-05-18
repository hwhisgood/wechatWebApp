<template>
  <div class="v-table">
    <div class="v-header" :style="getHeaderWidth">
      <div v-for="(item, index) in option.columns" :key="index" class="v-header-item"
        :style="{ width: (item.width || cellWidth) + 'px' }">
        <span class="v-header-title">{{ item.fieldName }}</span>
        <svg-icon name="Sort" width="20px" height="20px" @click="onSortClick({ item, index })"
          style="margin-left: 10px;">
        </svg-icon>
      </div>
    </div>

    <div class="scroll-content">
      <div class="v-content" :style="`width:${getHeaderWidth}px;height:${getContentHeight}px`">
        <div v-for="(item, index) in tableData" :key="index" class="v-content-block">
          <div v-for="(context, i) in option.columns" :key="i" class="v-content-item ellipsis-lines"
            :style="{ width: (context.width || cellWidth) + 'px' }">
            <slot name="columns" v-bind="{ item, context }">
              {{ item[context.fieldName] }}
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="VTableComponet">
import { nextTick, onMounted, watch } from "vue";
import { computed } from "@vue/reactivity";
import _ from "lodash";
import waterMark from '@/plugins/waterMaker'
import { useUserStore } from "@/stores/user";
import { useSettingStore } from "@/stores/setting";

const userStore = useUserStore();
const settingStore = useSettingStore();
const cellWidth = 135;
const emits = defineEmits(["sortClick"]);
const props = defineProps({
  tableData: {
    type: Array,
    default: [],
  },
  option: {
    type: Object,
    default: () => { }
  },
});

const setFontSize = () => {
  const fontSize = settingStore.tableFontSize
  switch (fontSize) {
    case 'small':
      document.querySelector(".v-header").style.setProperty("--tableFontSize", "12px")
      document.querySelector(".scroll-content").style.setProperty("--tableFontSize", "12px")
      break;
    case 'middle':
      document.querySelector(".v-header").style.setProperty("--tableFontSize", "14px")
      document.querySelector(".scroll-content").style.setProperty("--tableFontSize", "14px")
      break;
    case 'big':
      document.querySelector(".v-header").style.setProperty("--tableFontSize", "16px")
      document.querySelector(".scroll-content").style.setProperty("--tableFontSize", "16px")
      break;
    default:
      break;
  }
}

onMounted(() => {
  nextTick(() => setFontSize())
  if (!props.tableData.length) return;
  getHeaderWidth();
  warterMakerInit();
});

const getContentHeight = computed(() => {
  if (!props.tableData.length) return ''
  let height = _.multiply(props.tableData.length, 44);
  return height
})
/**
 * 水印初始化
 */
function warterMakerInit() {
  waterMark.init(
    {
      parentDomName: '.v-content', // 父节点dom选择器名字
      show: true, // 水印开关
      color: 'rgba(0, 0, 0, 0.1)', // 水印色值
      title: `${userStore.userName}(${userStore.userNo})`, // 显示的水印文本
      width: 200, // 水印宽高
      height: 150,
      fontNum: 16, // 水印字体大小
      rotate: -20, // 旋转角度
      zIndex: 1,
    }
  )
}
/**
 * 获取头部宽度
 */
function getHeaderWidth() {
  let widthArray = props.option.columns && props.option.columns.length && props.option.columns.map((item) => {
    return item.width ? item.width : cellWidth;
  });
  return `${_.sum(widthArray)}`;
}
/**
 * 暴露头部点击事件
 * @param {*} item 
 */
function onSortClick({ item, index }) {
  // 手动添加排序
  item.asc = ('asc') in item ? !item.asc : false
  emits("sortClick", { item, index });
}
</script>

<style lang="scss" scoped>
:root {
  --tableFontSize: 12px;
}

.v-table {
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  font-size: var(--tableFontSize, 12px);
}

.v-header {
  position: absolute;
  top: 0;
  left: 0;
  background: #F8F8F8;
  display: flex;
  flex-wrap: nowrap;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;

  &-title {
    color: $xsa-table-color;
    font-size: var(--tableFontSize, 12px);
  }


  &-item {
    box-sizing: border-box;
    padding: 0 6px;
    font-size: medium;
    min-width: 100px;
    border: $border-default;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}

.scroll-content {
  position: absolute;
  top: 40px;
  left: 0;
  height: 100vh;
  overflow-x: scroll;
  overflow-y: auto;
  margin-bottom: 50px;
  padding-right: 20px;
}

.v-content {
  box-sizing: border-box;

  &-block {
    font-size: medium;
    display: flex;

background-color: #fff;
  }

  &-block:nth-child(2n) {
    background-color: #F8F8F8;
  }

  &-item {
    box-sizing: border-box;
    padding: 0 6px;
    font-size: var(--tableFontSize, 12px);
    min-width: 100px;
    border: $border-default;
    min-height: 40px;
    // line-height: 40px;
    border-top: 0;
    border-right: 0;
  }

  &-item:last-of-type {
    border-right: $border-default;
  }
}
</style>

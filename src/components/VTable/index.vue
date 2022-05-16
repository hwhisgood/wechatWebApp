<template>
  <div class="v-table" id="VTable" ref="VTable">
    <div class="v-header" :style="getHeaderWidth">
      <div v-for="(item, index) in option.columns" :key="index" class="v-header-item"
        :style="{ width: (item.width || cellWidth) + 'px' }">
        <!-- :style="'width:' + item.width ? item.width : '' + 'px'" -->
        <span class="v-header-title">{{ item.label }}</span>
        <svg-icon name="Sort" width="20px" height="20px" v-if="item.sort" @click="onSortClick(item)"
          style="margin-left: 10px;">
        </svg-icon>
      </div>
    </div>

    <div class="scroll-content">
      <div class="v-content" :style="`width:${getHeaderWidth}px;height:${getContentHeight}px`">
        <div v-for="(item, index) in tableData" :key="index" class="v-content-block">
          <div v-for="(context, i) in option.columns" :key="i" class="v-content-item"
            :style="{ width: (context.width || cellWidth) + 'px' }">
            {{ item[context.tableDataprop] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="VTableComponet">
import { onMounted, watch, ref } from "vue";
import { computed } from "@vue/reactivity";
import _ from "lodash";
import waterMark from '@/plugins/waterMaker'
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const VTable = ref(null)
const cellWidth = 120;
const emits = defineEmits(["sortClick"]);
const props = defineProps({
  tableData: {
    type: Array,
    default: [],
  },
  option: {
    type: Object,
    default: {
      columns: [
        {
          label: "", // String
          props: "", // String
          sort: false, // Boolean
          width: 0, // Number
        },
      ],
    },
  },
});

onMounted(() => {
  getHeaderWidth();
  warterMakerInit();
});

const getContentHeight = computed(() => {
  if (!props.tableData.length) return ''
  let height = _.multiply(props.tableData.length, 40);
  return height + 350
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
      title: `${userStore.getUserName}(${userStore.getUserNo})`, // 显示的水印文本
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
  let widthArray = props.option.columns.map((item) => {
    return item.width ? item.width : cellWidth;
  });
  return `${_.sum(widthArray)}`;
}
/**
 * 暴露头部点击时间
 * @param {*} item 
 */
function onSortClick(item) {
  emits("sortClick", item);
}
</script>

<style lang="scss" scoped>
.v-table {
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
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
  // box-shadow: 0px 10px 5px #888888;

  &-title {
    color: $xsa-table-color;
    font-size: $xsa-table-fontSize;
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
  height: 100%;
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
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  &-block:nth-child(2n) {
    background-color: #F8F8F8;
  }

  &-item {
    box-sizing: border-box;
    padding: 0 6px;
    font-size: $xsa-table-fontSize;
    min-width: 100px;
    border: $border-default;
    border-top: 0;
    border-right: 0;
  }

  &-item:last-of-type {
    border-right: $border-default;
  }
}
</style>

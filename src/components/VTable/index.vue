<template>
  <div class="v-table">
    <div class="v-header" :style="getHeaderWidth">
      <div v-for="(item, index) in option.column" :key="index" class="v-header-item"
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
          <div v-for="(context, i) in option.column" :key="i" class="v-content-item"
            :style="{ width: (context.width || cellWidth) + 'px' }">
            {{ item[context.tableDataprop] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="VTableComponet">
import { onMounted, watch } from "vue";
import { computed } from "@vue/reactivity";
import _ from "lodash";
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
      column: [
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
});

const getContentHeight = computed(() => {
  if (!props.tableData.length) return ''
  let height = _.multiply(props.tableData.length, 40);
  return height + 350
})

function getHeaderWidth() {
  let widthArray = props.option.column.map((item) => {
    return item.width ? item.width : cellWidth;
  });
  return `${_.sum(widthArray)}`;
}


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

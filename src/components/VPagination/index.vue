<template>
  <div class="pageBox">
    <button class="preBtn" @click="onPreBtnClick" :disabled="canClickPreBtn"
      :class="canClickPreBtn ? 'disabled-btn' : 'btn-active'">
      {{ preText }}
    </button>
    <button class="curPage" @click="onCurPageClick" :disabled="canClickPageBtn" :class="canClickPageBtn ? '' : ''">
      {{ currentPageIndex }}
    </button>
    <button class="nextBtn" @click="onNextBtnClick" :disabled="canClickNextBtn"
      :class="canClickNextBtn ? 'disabled-btn' : 'btn-active'">
      {{ nextText }}
    </button>
  </div>
  <Popup v-model:show="isShowPagePicker" round position="bottom">
    <Picker title="选择页码" :columns="columns" @confirm="onPickerConfirm" @cancel="onPickerCancel" />
  </Popup>
</template>

<script setup name="VPaginationComponent">
import { watch } from "vue";
import { reactive, ref, toRef } from "@vue/reactivity";
import { Popup, Picker, Toast } from "vant";
import _ from "lodash";
import { computed } from "@vue/runtime-core";
const emits = defineEmits(["preClick", "curPageChange", "nextClick"]);
const props = defineProps({
  preText: {
    type: String,
    default: "上一页",
  },
  nextText: {
    type: String,
    default: "下一页",
  },
  curPageIndex: {
    type: [String, Number],
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 20,
  },
  pageIndex: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 0,
  },
  totalPage: {
    type: Number,
    default: 0,
  },
});
let canClickPreBtn = ref(true);     // 上一页按钮
let canClickNextBtn = ref(false);   // 下一页按钮
let canClickPageBtn = ref(false);   // 选页面按钮
let isShowPagePicker = ref(false);  // 选页面弹窗
let currentPageIndex = ref(props.curPageIndex); // 当前页数
let pageInfo = reactive({
  pageIndex: props.pageIndex,
  pageSize: props.pageSize,
});
// let pageTotals = _.floor(_.divide(total.value, pageSize.value)); // 总共页数
// // picker数组
const columns = computed(() => {
  let _columns = Array.from(Array(props.totalPage), (i, index) => index + 1);
  console.log(_columns)
  return _columns;
});

watch(
  () => currentPageIndex.value,
  (val, old) => {
    emits("curPageChange", pageInfo);
    if (val <= 1) {
      canClickPreBtn.value = true;
    } else if (val >= props.totalPage) {
      canClickNextBtn.value = true;
      canClickPreBtn.value = false;
    } else {
      canClickPreBtn.value = false;
      canClickNextBtn.value = false;
      false;
    }
  }
);

// 上一页
function onPreBtnClick() {
  if (pageInfo.pageIndex <= 1) {
    return (currentPageIndex.value = pageInfo.pageIndex = 1);
  } else {
    pageInfo.pageIndex--;
    currentPageIndex.value = pageInfo.pageIndex;
  }
  emits("preClick", pageInfo);
}

// 下一页
function onNextBtnClick() {
  // let computedPageIndex = _.floor(_.divide(props.total, props.pageSize));
  console.log(pageInfo.pageIndex);
  console.log(props.totalPage);

  if (pageInfo.pageIndex >= props.totalPage) {
    Toast('已经是最后一页！')
    return;
  }
  pageInfo.pageIndex++;
  currentPageIndex.value = pageInfo.pageIndex;
  emits("nextClick", pageInfo);
}

//弹出选择窗
function onCurPageClick() {
  isShowPagePicker.value = !isShowPagePicker.value;
}

function onPickerConfirm(pageIndex) {
  currentPageIndex.value = pageInfo.pageIndex = pageIndex;
  onPickerCancel();
}
function onPickerCancel() {
  isShowPagePicker.value = false;
}
</script>

<style scoped lang="scss">
.pageBox {
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  &>button {
    //   flex: 1;
    text-align: center;
    font-size: 18px;
    border: none;
    padding: 0;
    margin: 0;
  }

  .preBtn,
  .nextBtn {
    flex: 1;
    height: 100%;
    line-height: 50px;
    font-size: 16px;
    color: #00CD96;
    background: #fff;
  }

  .btn-active {
    &:active {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .disabled-btn {
    color: #ccc;
  }

  .curPage {
    box-sizing: border-box;
    padding: 0 12px;
    font-size: 16px;
    color: #333;
    border-radius: 4px;
    //   width: 44px;
    height: 32px;
    line-height: 32px;
    //   background-color: rgba(0, 0, 0, 0.5);
    //   color: #fff;
    //   border-radius: 4px;
    //   &:active {
    //     background: rgba(0, 0, 0, 0.6);
    //   }
  }
}
</style>

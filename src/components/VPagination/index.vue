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
import { reactive, ref } from "@vue/reactivity";
import { Popup, Picker } from "vant";
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
    default: 10,
  },
  pageIndex: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 0,
  },
});
let canClickPreBtn = ref(true);
let canClickNextBtn = ref(false);
let canClickPageBtn = ref(false);
let isShowPagePicker = ref(false);

let currentPageIndex = ref(props.curPageIndex); //用来显示的当前页数
let totalPages = ref(0); // 总页数

let pageTotals = _.floor(_.divide(props.total, props.pageSize)); // 总共页数
// picker数组
const columns = computed(() => {
  let _columns = Array.from(Array(pageTotals), (i, index) => index + 1);
  return _columns;
});

watch(
  () => currentPageIndex.value,
  (val, old) => {
    emits("curPageChange", pageInfo);
    if (val <= 1) {
      canClickPreBtn.value = true;
    } else if (val >= pageTotals) {
      canClickNextBtn.value = true;
      canClickPreBtn.value = false;
    } else {
      canClickPreBtn.value = false;
      canClickNextBtn.value = false;
      false;
    }
  }
);
// 统一页面信息
let pageInfo = reactive({
  pageIndex: props.pageIndex,
  pageSize: props.pageSize,
});
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

function onNextBtnClick() {
  let computedPageIndex = _.floor(_.divide(props.total, props.pageSize));
  if (pageInfo.pageIndex >= computedPageIndex) {
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

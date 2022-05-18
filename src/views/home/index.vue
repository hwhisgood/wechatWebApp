<template>
  <ConfigProvider :theme-vars="themeVars">
    <div class="header-search-box">
      <div>
        <DropdownMenu>
          <DropdownItem v-model="activeClass" :options="reportClass" @change="onDropdownItemChange"
            :title="activeClassTitle" />
        </DropdownMenu>
      </div>
      <form action="/">
        <Search v-model.trim="searchValue" shape="round" background="#fff" placeholder="数据报表名称输入"
          class="header-search-input" @search="onSearch">
        </Search>
      </form>
    </div>
    <div class="content">
      <List v-model:loading="isLoading" :finished="isFinished" finished-text="已经到底了" v-model:error="isError"
        error-text="请求失败，点击重新加载" :immediate-check="false" @load="onScrollRefresh" offset="0">
        <CardItem v-for="item in reportList" :key="item.id" :cardName="item.name" @click="goReportDetailPage(item)">
        </CardItem>
      </List>

      <Empty v-if="!reportList.length" image-size="64px" description="搜索为空" class="empty-class">
        <template #image>
          <svg-icon name="icon_nothing" width="64px" height="64px"> </svg-icon>
        </template>
      </Empty>
    </div>
  </ConfigProvider>
</template>

<script setup name="Home">
import { onMounted, ref, watch, reactive, getCurrentInstance } from "vue";
import { computed } from "@vue/reactivity";
import { DropdownMenu, DropdownItem, Search, Empty, ConfigProvider, List } from "vant";
import CardItem from "./components/CardItem.vue";
import { useRouter } from "vue-router";
import $api from "@/api";
const router = useRouter();
const internalInstance = getCurrentInstance()
const searchValue = ref("");      // 搜索key值
const activeClassTitle = ref(""); // 当前分类文案
const activeClass = ref(null);    // 当前分类选项
const total = ref(0)              // 总页数
const reportList = reactive([])   // 分类列表
const reportClass = reactive([])  // 分类
const isLoading = ref(false);     // 上拉加载 loading
const isFinished = ref(false);    // 上拉加载状态确认
const isError = ref(false);       // 上拉记载错误状态
const themeVars = {
  dropdownMenuOptionActiveColor: "#00CD96",
  dropdownMenuTitleActiveTextColor: "#00CD96",
};
const pageInfo = reactive({
  limit: 10,
  size: 1
})

watch(
  () => activeClass.value,
  (val) => {
    let _index = getActiveIndex(val);
    activeClassTitle.value = getActiveTitle(_index);
  }
);

function onSearch() {
  pageInfo.size = 1;
  reportList.splice(0, reportList.length)
  getReportClassList(searchValue.value)
}

function getActiveIndex(val) {
  let _index;
  reportClass.find((item, index) => {
    if (item.value == val) {
      _index = index;
    }
  });
  return _index;
}

function getActiveTitle(index) {
  return `${reportClass[index].name}`;
}

/**
 * 跳转到详情页
 */
function goReportDetailPage(item) {
  router.push({ path: "reportDetail", query: { id: item.id, title: item.name } });
}

/**
 * 菜单下拉选择
 */
function onDropdownItemChange(val) {
  getReportClassList();
}

/**
 *上拉加载
 */
function onScrollRefresh() {
  pageInfo.size += 1
  getReportClassList()
}

/**
 * 获取报表分类
 */
function getReportClass() {
  $api.report.getReportClass().then((res) => {
    let _arr = res
    _arr.forEach((item) => {
      item.text = item.name;
      item.value = item.id;
    })
    reportClass.splice(0, reportClass.length)
    reportClass.push(..._arr)
    activeClass.value = reportClass[0].value;
    getReportClassList()
  })
}

/**
 * 获取报表分类列表
 */
function getReportClassList(name = "") {
  let obj = {
    classfyId: name ? "" : activeClass.value,
    isCondition: null,
    name,
    limit: pageInfo.limit,
    page: pageInfo.size,
  }
  $api.report.getReportClassList(obj).then((res) => {
    const _res = res;
    reportList.push(..._res.list)
    total.value = _res.totalCount
    if (reportList.length >= total.value) {
      isFinished.value = true
    }

  }).catch(() => {
    isError.value = true
  }).finally(() => {
    isLoading.value = false
  })
}

onMounted(async () => {
  getReportClass()
  // await getReportClassList()
});
</script>

<style lang="scss" scoped>
.header-search-box {
  display: inline-flex;
  width: 100%;
  height: 48px;

  div:first-child {
    flex: 1;
    // width: 220px;
  }

  div:last-child {
    height: 100%;
    background: #fff;
  }
}

.content {
  padding: 8px 8px 0;
}
</style>
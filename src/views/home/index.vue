<template>
  <ConfigProvider :theme-vars="themeVars">
    <div class="header-search-box">
      <div>
        <DropdownMenu>
          <DropdownItem v-model="activeClass" :options="reportClass" @change="onDropdownItemChange"
            :title="activeClassTitle" />
        </DropdownMenu>
      </div>
      <Search v-model="searchValue" shape="round" background="#fff" placeholder="数据报表名称输入" class="header-search-input">
      </Search>
    </div>
    <div class="content">
      <CardItem v-for="item in reportList" :key="item.id" :cardName="item.text" @click="goReportDetailPage(item.id)">
      </CardItem>
      <Empty v-if="!reportList.length" mage-size="100" description="描述文字" />
    </div>
  </ConfigProvider>
</template>

<script setup name="Home">
import { onMounted, ref, watch, reactive, getCurrentInstance } from "vue";
import { computed } from "@vue/reactivity";
import { DropdownMenu, DropdownItem, Search, Empty, ConfigProvider } from "vant";
import CardItem from "./components/CardItem.vue";
import { useRouter } from "vue-router";
import $api from "@/api";
const router = useRouter();
const internalInstance = getCurrentInstance()

let searchValue = ref("");      // 搜索key值
let activeClassTitle = ref(""); // 当前分类文案
let activeClass = ref(null);    // 当前分类选项
let reportList = reactive([])   // 分类列表
let reportClass = reactive([])  // 分类

watch(
  () => activeClass.value,
  (val) => {
    let _index = getActiveIndex(val);
    activeClassTitle.value = getActiveTitle(_index);
  }
);

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

const themeVars = {
  dropdownMenuOptionActiveColor: "green",
  dropdownMenuTitleActiveTextColor: "green",
};

/**
 * 跳转到详情页
 */
function goReportDetailPage(id) {
  router.push({ path: "reportDetail" });
}

/**
 * 菜单下拉选择
 */
function onDropdownItemChange(val) {
  getReportClassList();
}

/**
 * 获取报表分类
 */
async function getReportClass() {
  return $api.report.getReportClass().then((res) => {
    let _arr = res
    _arr.forEach((item) => {
      item.text = item.name;
      item.value = item.id;
    })
    reportClass.splice(0, reportClass.length)
    reportClass.push(..._arr)
    activeClass.value = reportClass[0].value;
  })
}

/**
 * 获取报表分类
 */
function getReportClassList() {
  let obj = {
    classfyId: activeClass.value,
    isCondition: null,
    name: null,
    limit: 10,
    page: 1,
  }
  $api.report.getReportClassList(obj).then((res) => {
    console.log(res)
  })
}

onMounted(async () => {
  await getReportClass()
  await getReportClassList()
});
</script>

<style lang="scss" scoped>
.header-search-box {
  display: inline-flex;
  width: 100%;
  height: 48px;

  div:first-child {
    width: 220px;
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

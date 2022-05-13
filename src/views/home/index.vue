<template>
  <ConfigProvider :theme-vars="themeVars">
    <div class="header-search-box">
      <div>
        <DropdownMenu>
          <DropdownItem v-model="hospitaKey" :options="hospitaSource" @change="onDropdownItemChange"
            :title="activeHospitaTitle" />
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
import { onMounted, ref, watch } from "vue";
import { computed } from "@vue/reactivity";
import { DropdownMenu, DropdownItem, Search, Empty, ConfigProvider } from "vant";
import CardItem from "./components/CardItem.vue";
import { useRouter } from "vue-router";
import $api from "@/api";
const router = useRouter();
const searchValue = ref("");
const activeHospitaTitle = ref("");
const hospitaSource = [
  { text: "广州医科大学附属医学院", value: 11 },
  { text: "广州中医药大学医院", value: 55 },
  { text: "广义口腔医院", value: 33 },
];
const hospitaKey = ref(0);
const reportList = [
  { text: "门诊量日报1", id: 0 },
  { text: "门诊量日报2", id: 1 },
  { text: "门诊量日报3", id: 2 },
];

watch(
  () => hospitaKey.value,
  (val) => {
    let _index = getActiveIndex(val);
    activeHospitaTitle.value = getActiveTitle(_index);
  }
);

function getActiveIndex(val) {
  let _index;
  hospitaSource.find((item, index) => {
    if (item.value == val) {
      _index = index;
    }
  });
  return _index;
}

function getActiveTitle(index) {
  return `${hospitaSource[index].text}(${hospitaSource[index].value})`;
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
  getReportClass();
}

/**
 * 获取报表分类
 */
function getReportClass() {
  $api.report.getReportClass({ name: null }).then((res) => {
    console.log(res)
  })
}


onMounted(() => {
  hospitaKey.value = hospitaSource[0].value;
  getReportClass()
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

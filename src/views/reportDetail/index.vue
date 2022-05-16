<template>
  <div class="reportDetail">
    <div class="search-block">
      <searchBlock :formList="searchformList" @onSubmit="onSearch"></searchBlock>
    </div>

    <!-- 刷新 -->
    <!-- <Cell>
      <template #title>
        <span class="unpateTime">最近更新时间：2022年2月10号 11点01分</span>
      </template>
      <template #right-icon>
        <SvgIcon name="Withdrawal" @click="onUpdate" />
      </template>
    </Cell> -->

    <div class="table-block">
      <VTable :option="option" :tableData="tableData" @sortClick="onSortClick"></VTable>
    </div>
    <div class="footer-block">
      <VPagination @curPageChange="oncurPageChange" :pageSize="pageInfo.pageSize" :pageIndex="pageInfo.pageIndex"
        :total="total"></VPagination>
    </div>
  </div>
</template>

<script setup name="ReportDetail">
import {
  Field,
  CellGroup,
  Button,
  Pagination,
  ConfigProvider,
  Picker,
  ActionSheet,
  Popup,
  Cell,
} from "vant";
import { ref, reactive, onMounted, toRef } from "vue";
import VTable from "@/components/VTable/index.vue";
import VPagination from "@/components/VPagination/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import searchBlock from './searchBlock/index.vue'
import $api from "@/api";
import { useRoute } from "vue-router"

let queryCondition = {} // 组合查询参数
let sortList = {} // 排序规则
const option = reactive({}) // 表头项
const useRouter = useRoute()
const hasSearch = ref(true); //是否包含查询
const searchValue = ref("");
const currentPage = ref(1);
const isShowPage = ref(false);
const pageInfo = reactive({
  limit: 50,
  page: 1,
});
const total = 50; //总条数
//搜索表单
const searchformList = reactive([])

onMounted(() => {
  getReportDetail()
})
// 获取报表详情
function getReportDetail() {
  $api.report.getReportDetail({ id: useRouter.query.id }).then((res) => {
    const _res = res || {}
    console.log(_res)
    option.columns = _res.columns
    if (_res.conditionList && _res.conditionList.length) {
      searchformList.splice(0, searchformList.length)
      searchformList.push(..._res.conditionList)
    } else {
      getReportExecute()
    }
  })
}
// 获取报表详情-表格
function getReportExecute() {
  let obj = {
    id: useRouter.query.id,
    queryCondition,
    sortList,
    ...pageInfo
  }
  $api.report.getReportExecute(obj).then((res) => {
    console.log(res)
  })
}

// 搜索
function onSearch(e) {
  let _queryCondition = {}
  e.map((item) => {
    _queryCondition[item.controlName] = item.value
  })
  queryCondition = _queryCondition
  getReportExecute()
}

// 翻页
function oncurPageChange(pageInfo) {
  console.log(pageInfo);
}

// 排序
function onSortClick(e) {
  console.log(e);
}

// 获取数据
function getReportList() { }

function onUpdate() {
  getReportList();
}

// 数据源
const tableData = [
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
  {
    night: "我是九",
    eight: "我是九八",
    seven: "我是九八七",
    six: "我是六",
    five: "我是五",
    four: "我是四",
    three: "我是三",
    two: "我是二",
    one: "我是一",
  },
];
</script>

<style lang="scss" scoped>
.reportDetail {
  height: 100%;
  overflow-y: hidden;
  position: relative;
  background: #fff;
}

.unpateTime {
  background: #fff;
  // padding: 10px;
  font-size: 13px;
  color: #333;
}

.table-block {
  height: 100%;
  padding-left: 16px;
}

.footer-block {
  background-color: #fff;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}

.search-block {
  padding: 25px 16px 10px;
}
</style>

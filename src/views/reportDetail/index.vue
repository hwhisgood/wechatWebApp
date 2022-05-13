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
import { ref, reactive } from "vue";
import VTable from "@/components/VTable/index.vue";
import VPagination from "@/components/VPagination/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import searchBlock from './searchBlock/index.vue'

let hasSearch = ref(true); //是否包含查询
let searchValue = ref("");
let currentPage = ref(1);
let isShowPage = ref(false);
let pageInfo = reactive({
  pageSize: 10,
  pageIndex: 1,
});
let total = 50; //总条数
//搜索表单
const searchformList = [
  { key: "name", value: "", placeHolder: "请输入诊断名" },
  { key: "room", value: "", placeHolder: "请输入科室名称" },
]

// 搜索
function onSearch(e) {
  console.log(e)
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
// 表格配置项
const option = {
  column: [
    {
      label: "房台类型",
      tableDataprop: "night",
      sort: true,
      width: 150,
    },
    {
      label: "已结",
      tableDataprop: "eight",
      sort: true,
      width: 180,
    },
    {
      label: "未收款未收",
      tableDataprop: "seven",
      sort: true,
      width: 150,
    },
    {
      label: "赠送",
      tableDataprop: "six",
      sort: true,
      width: 100,
    },
    {
      label: "五",
      tableDataprop: "five",
    },
    {
      label: "四个",
      tableDataprop: "four",
    },
    {
      label: "三个",
      tableDataprop: "three",
    },
    {
      label: "二个",
      tableDataprop: "two",
    },
    {
      label: "一个",
      tableDataprop: "one",
    },
    {
      label: "三个",
      tableDataprop: "three",
    },
    {
      label: "二个",
      tableDataprop: "two",
    },
    {
      label: "一个",
      tableDataprop: "one",
    },
    {
      label: "三个",
      tableDataprop: "three",
    },
    {
      label: "二个",
      tableDataprop: "two",
    },
    {
      label: "一个",
      tableDataprop: "one",
    },
    {
      label: "三个",
      tableDataprop: "three",
    },
    {
      label: "二个",
      tableDataprop: "two",
    },
    {
      label: "一个",
      tableDataprop: "one",
    },
    {
      label: "三个",
      tableDataprop: "three",
    },
    {
      label: "二个",
      tableDataprop: "two",
    },
    {
      label: "一个",
      tableDataprop: "one",
    },
    {
      label: "三个",
      tableDataprop: "three",
    },
    {
      label: "二个",
      tableDataprop: "two",
    },
    {
      label: "一个",
      tableDataprop: "one",
    },
  ],
};
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

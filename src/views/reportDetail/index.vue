<template>
  <div class="reportDetail">
    <NavBar :title="route.query.title ? route.query.title : route.meta.title" left-text="返回" left-arrow
      @click-left="onClickLeft" @click-right="onClickRight" right-text="刷新" />

    <div class="search-block" v-if="searchformList.length">
      <searchBlock :formList="searchformList" @onSubmit="onSearch"></searchBlock>
    </div>

    <Cell v-if="tableData.length && refreshTime">
      <template #title>
        <span class="updateTime">最近更新时间： {{ refreshTime }}</span>
      </template>
    </Cell>

    <div class="table-block" v-if="tableData.length">
      <VTable :option="option" :tableData="tableData" @sortClick="onSortClick">
        <template v-slot:columns="scoped">
          <span class="ellipsis-lines">{{ dealColumns(scoped) }}</span>
        </template>
      </VTable>
    </div>

    <!-- <Loading type="spinner" color="#00CD96" v-if="isLoading" class="empty-class"> 加载中...
    </Loading> -->

    <Empty v-if="!tableData.length && !isLoading" image-size="64px" description="搜索为空" class="empty-class">
      <template #image>
        <svg-icon name="icon_nothing" width="64px" height="64px"> </svg-icon>
      </template>
    </Empty>
    <div class="footer-block" v-if="total">
      <VPagination @curPageChange="onCurPageChange" :pageSize="pageInfo.pageSize" :pageIndex="pageInfo.pageIndex"
        :total="total" :totalPage="totalPage"></VPagination>
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
  NavBar,
  Toast,
  Loading,
  Empty
} from "vant";
import { ref, reactive, onMounted, toRef } from "vue";
import VTable from "@/components/VTable/index.vue";
import VPagination from "@/components/VPagination/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import searchBlock from './searchBlock/index.vue'
import $api from "@/api";
import { useRoute, useRouter } from "vue-router"
import dayjs from "dayjs"

let queryCondition = {}        // 组合查询参数
let sortList = {}              // 排序规则
let sortListMap = reactive([]) // 排序表头映射对象
const option = reactive({})    // 表头项
const tableData = reactive([]) // 表格数据项
const route = useRoute()
const router = useRouter()
const hasSearch = ref(true);   // 是否包含查询
const searchValue = ref("");
const currentPage = ref(1);
const refreshTime = ref(null); // 刷新时间
const isLoading = ref(false);
const isShowPage = ref(false);
const pageInfo = reactive({
  limit: 20,
  page: 1,
});
const total = ref(0);          // 总条数
const totalPage = ref(0);      // 总页数

//搜索表单
const searchformList = reactive([])

onMounted(() => {
  getReportDetail()
})

// 处理表格字段
function dealColumns(scoped) {
  let _item = scoped.item;
  let _context = scoped.context;
  let _value = _item[_context.fieldName]
  if (_context.fieldName == "配置") {
    return '配置我还没处理'
  } else if (_context.fieldType === 1) {
    return dayjs(_value).format('YYYY-MM-DD')
  } else {
    return _value
  }
}

// 排序
function onSortClick({ item, index }) {
  let _sortListMap = sortListMap.length && sortListMap[index]
  let sortItem = _sortListMap && _sortListMap.dsList[0]
  if (!sortItem) return console.error('无排序对象')
  sortList[sortItem.dsId] = [{ fieldName: sortItem.fieldName, asc: item.asc }]
  getReportExecute()
}

// nav 左侧按钮
function onClickLeft() {
  router.go(-1);
}

// nav 右侧按钮
function onClickRight() {
  pageInfo.page = 1
  getReportDetail()
}

// 获取报表详情
function getReportDetail() {
  isLoading.value = true
  $api.report.getReportDetail({ id: route.query.id }).then((res) => {
    const _res = res || {}
    option.columns = _res.columns && JSON.parse(_res.columns)
    if (_res.conditionList && _res.conditionList.length) {
      searchformList.splice(0, searchformList.length)
      searchformList.push(..._res.conditionList)
    } else {
      getReportExecute()
    }
  }).catch(() => {
    Toast({ message: '刷新失败', position: 'bottom' })
  }).finally(() => {
    isLoading.value = false
  })
}

// 获取报表详情-表格
function getReportExecute() {
  isLoading.value = true
  let obj = {
    id: route.query.id,
    queryCondition,
    sortList,
    ...pageInfo
  }
  $api.report.getReportExecute(obj).then((res) => {
    const _res = res;
    tableData.splice(0, tableData.length)
    tableData.push(..._res.list)
    total.value = _res.totalCount
    totalPage.value = _res.totalPage
    console.log(_res.refreshTime)
    refreshTime.value = dayjs(_res.refreshTime).format('YYYY[年]MM[月]DD[日] HH[时]mm[分]');
    console.log(refreshTime)
    sortListMap = _res.columns
  }).finally(() => {
    isLoading.value = false
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
function onCurPageChange(pageParams) {
  pageInfo.page = pageParams.pageIndex
  getReportExecute()
}


// 获取数据
function getReportList() { }

function onUpdate() {
  getReportList();
}

// 数据源
const tableDatas = [
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
const options = {
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

.updateTime {
  background: #fff;
  font-size: 12px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ABABAB;
  padding: 8px 0;
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

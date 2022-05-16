const report = [
    // 获取报表分类 http://showdoc.xinsec.com.cn/web/#/83/1773
    { name: "getReportClass", method: "POST", url: "/report/screReportClassfy/list", header: null, mock: false },
    // 获取列表数据 http://showdoc.xinsec.com.cn/web/#/83/1774
    { name: "getReportClassList", method: "POST", url: "/report/screReportClassfy/listPage", header: null, mock: false },
    // 获取列表详情 http://showdoc.xinsec.com.cn/web/#/83/1777
    { name: "getReportDetail", method: "POST", url: "/report/screReport/detail", header: null, mock: false },
    // 获取列表详情-表格 http://showdoc.xinsec.com.cn/web/#/83/1798
    { name: "getReportExecute", method: "POST", url: "/report/screReport/execute", header: null, mock: false },
    
]

export default {
    report
};
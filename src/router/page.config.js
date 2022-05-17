export default [
    {
        name: 'reportDetail',
        path: '/reportDetail',
        component: () => import('@/views/reportDetail/index.vue'),
        meta: {
            title: '门诊当日看号量',
            isNavBar: false
        }
    },
    {
        name: 'changeBoundClient',
        path: '/my/changeBoundClient',
        component: () => import('@/views/my/changeBoundClient/index.vue'),
        meta: {
            title: '更绑用户',
            isNavBar: true
        }
    },
]
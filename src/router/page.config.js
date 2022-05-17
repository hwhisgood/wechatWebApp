export default [
    // {
    //     name: 'profile1',
    //     path: '/my/profile1',
    //     component: () => import('@/views/my/profile/profile1.vue'),
    //     meta: {
    //         title: '个人信息',
    //         isNavBar: false
    //     }
    // },
    // {
    //     name: 'profile2',
    //     path: '/my/profile2',
    //     component: () => import('@/views/my/profile/profile2.vue'),
    //     meta: {
    //         title: '个人信息',
    //         isNavBar: false
    //     }
    // },
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
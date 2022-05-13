export default [
    // {
    //     name: 'msg',
    //     path: '/msg',
    //     component: () => import('@/views/msg/index.vue'),
    //     meta: {
    //         title: '消息',
    //         icon: 'chat-o'
    //     }
    // },
    {
        name: 'home',
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '首页',
            icon: {
                active: "icon_home_pre",
                inactive: "icon_home_nor"
            },
            // isNavBar: false
        }
    },
    {
        name: 'my',
        path: '/my',
        component: () => import('@/views/my/index.vue'),
        meta: {
            title: '我的',
            icon: {
                active: "icon_profile_pre",
                inactive: "icon_profile_nor"

            },
        }
    }
]
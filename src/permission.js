import router from "./router"
import { useUserStore } from "./stores/user"
import { useSettingStore } from "./stores/setting"
import { getToken } from "./utils/auth"


const whiteList = ['/afPage','/login']

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const settingStore = useSettingStore();
    // 已登陆有绑定
    if( to.path == '/adPage'){
        next()
    }else{
        if(getToken()){
            to.meta.title && settingStore.setTitle(to.meta.title);
            if (to.path === '/login') {
                next({ path: '/home' })
            } else {
                next()
            }
        }else{
            if (whiteList.indexOf(to.path) !== -1) {
             // 在免登录白名单，直接进入
                 next()
             } else {
                 console.error('没有token,请重新登陆')
                 next(`/login`) // 否则全部重定向到登录页
            }
        }
    }
    //  if (getToken()) {
    //     to.meta.title && settingStore.setTitle(to.meta.title);
    //     if (to.path === '/login') {
    //         next({ path: '/home' })
    //     } else {
    //         next()
    //         // return
    //         // if (userStore.userId == null) {
    //         //     // 判断当前用户是否已拉取完user_info信息
    //         //     // userStore.GetInfo().then(() => {
    //         //     //     next({ ...to, replace: true })
    //         //     // }).catch(err => {
    //         //     //     userStore.LogOut().then(() => {
    //         //     //         next({ path: '/' })
    //         //     //     })
    //         //     // })
    //         // } else {
    //         //     next()
    //         // }
    //     }
    // } else {
    //     // 没有token
    //     if (whiteList.indexOf(to.path) !== -1) {
    //     //     // 在免登录白名单，直接进入
    //         next()
    //     } else {
    //         next(`/login`) // 否则全部重定向到登录页
    //     }
    // }
})
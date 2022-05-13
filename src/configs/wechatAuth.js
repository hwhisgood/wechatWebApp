import vueWechatAuth from '@/plugins/vueWechatAuth'
import { WECHAT_APP_ID } from './constants'

/**
 * 微信授权登录插件配置
 * @param app
 */
export function setupWechatAuth(app) {
    app.use(vueWechatAuth, { appid: WECHAT_APP_ID })
}


import request from '@/utils/request'
import { getToken, removeToken } from '@/utils/auth'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'


const router = useRouter()
let apiConfig = {}
const importContext = import.meta.globEager('./*/*.js');
for (let module in importContext) {
    apiConfig = { ...apiConfig, ...importContext[module].default }
}

// 格式化参数
const formatParams = (params) => {
    let str = [];
    for (let key in params) {
        if (params.hasOwnProperty(key)) { // 过滤原型链上的属性
            str.push(`${key}=${params[key]}`);
        }
    }
    return str.join("&");
}

// 根据环境生成请求地址
const getUrl = function (params, item) {
    const _url = item.method === 'GET' ? `${item.url}?${formatParams(params)}` : item.url;
    return `/api${_url}`
}

//生产api请求
function toApi(apiConfig) {
    const api = {};
    for (const module in apiConfig) {
        api[module] = {}
        apiConfig[module].forEach((item) => {
            api[module][item.name] = (params, option) => {
                if (!(params instanceof FormData)) {
                    params = Object.assign({}, params);
                }
                return new Promise((resolve, reject) => {
                    let requestParams = {
                        data: { ...params },
                        method: item.method || 'POST',
                        url: getUrl(params, item),
                    }
                    Toast.loading({
                        message: '加载中...',
                        forbidClick: true,
                    });
                    return request(requestParams).then((res) => {
                        resolve(res.data)
                    }).catch((err) => {
                        reject(err)
                    }).finally(() => {
                        Toast.clear()
                    })
                })
            }

        })
    }
    return api;
}

let api = toApi(apiConfig);
export default api;
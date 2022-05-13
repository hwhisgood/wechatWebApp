import axios from 'axios';
import { Toast } from 'vant';
import { getToken, removeToken } from './auth';

// 配置新建一个 axios 实例
const service = axios.create({
    // baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 60000,
    headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', },
});

// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么 token
        if (getToken()) {
            config.headers.common['Authorization'] = `${getToken()}`;
            config.headers.common['token'] = `${getToken()}`;
            config.headers.common['t'] = new Date().getTime() + '' + parseInt(Math.random() * 100000)
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        Toast.clear()
        const res = response.data;
        if (res.code === 0) {
            return response.data;
        } else {
            // removeToken();
            // window.location.href = '/login'; // 去登录页
            return Promise.reject(res);
        }
    },
    (error) => {
        console.log(error)
        // // 对响应错误做点什么
        // if (error.message.indexOf('timeout') != -1) {
        //     Dialog.alert({ message: '网络超时' });
        // } else if (error.message == 'Network Error') {
        //     Dialog.alert({ message: '网络连接错误' });
        // } else {
        //     if (error.response.data) Dialog.alert({ message: error.response.statusText });
        //     // else
        //     //     Dialog.alert({ message: '接口路径找不到' })
        // }
        return Promise.reject(error);
    }
);

// 导出 axios 实例
export default service;
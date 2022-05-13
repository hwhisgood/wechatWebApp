// // 微信配置
// const CustomerConfig = {
//         APPID: "wwf6acb9425350ff85",
//         AgentId: "1000004",
//         Secret: "CFX9tPkqaVDGCXt7J_UkfKidhIXvjJJE_mIphL7GyWs"
// }
// 获取调用微信js-sdk接口配置信息
function wxConfig(configInfo, next) {
    wx.config({
        beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: configInfo.data.appId, // 必填，企业微信的corpID
        timestamp: configInfo.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: configInfo.data.nonceStr, // 必填，生成签名的随机串
        signature: configInfo.data.qiyeSignature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
        jsApiList: ['getCurExternalContact', 'openEnterpriseChat', 'openUserProfile', "sendChatMessage"] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
    });
    wx.ready(() => {
        wx.agentConfig({
            debug: false,
            corpid: configInfo.data.appId, // 必填，企业微信的corpID
            agentid: configInfo.data.agentid,
            timestamp: configInfo.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: configInfo.data.nonceStr, // 必填，生成签名的随机串
            signature: configInfo.data.appSignature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
            jsApiList: ['getCurExternalContact', 'openEnterpriseChat', 'openUserProfile', "sendChatMessage"], // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
            success: (configRes) => {
                window.loadingInstance.setText('获取ID中...');
                // 获取当前外部联系人的id
                wx.invoke('getCurExternalContact', {}, (ContactRes) => {
                    if (ContactRes.err_msg == "getCurExternalContact:ok") {
                        sessionStorage.setItem('userId', ContactRes.userId)
                        if (sessionStorage.getItem("lineType") == 2) {
                            getBindInfo(ContactRes, next)
                        } else {
                            next()
                        }
                    } else {
                        next()
                    }
                });
            },
            fail: (err) => {
                next()
            }
        });
    });
}
function getBindInfo(ContactRes, next) {
    window.loadingInstance.setText('获取绑定关系中...');
    $api.QueryCustomerSecondLineUserId({
        userId: ContactRes.userId
    }).then(res => {
        if (res.code == 200) {
            if (res.data.list.length > 0) {
                localStorage.setItem('bindStatus', true)
                localStorage.setItem('customerID', res.data.list[0].customerId)
            } else {
                localStorage.removeItem('bindStatus')
                localStorage.removeItem('customerID')
            }

        } else {
            Message({
                message: res.msg,
                type: 'error'
            })
        }
        next()
    })
}
// 获取时间戳
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}
// 获取路径后的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

export default {
    wxConfig,
    getBindInfo,
    getLocalTime
}
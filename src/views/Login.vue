<!--
 功能：登录绑定页
 作者：weihang
 邮箱：weihang.huang@xinsec.com.cn
 时间：*2022-05-12 15:20:09
 版本：v1.1.0
-->
<template>
  <div class="login-container">
    <div class="login-header">
    </div>
    <div class="login-content">
      <div class="login-title">
        <p>登录</p>
        <p>数据报表系统</p>
      </div>

      <LoginBlock @onSubmit="onLogin"></LoginBlock>

      <div class="login-footer">
        <Divider>©版权所有 广东信尚安物联科技有限公司</Divider>
      </div>
    </div>
  </div>
</template>

<script setup name="Login">
import { Divider, Toast } from "vant";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import LoginBlock from '@/components/LoginBlock/index.vue'
import md5 from "md5";
// import { setToken } from "@/utils/auth";
// import vueWechatAuth from '@/plugins/vueWechatAuth'

const router = useRouter();
const userStore = useUserStore();

function onLogin(params) {
  userStore
    .Login({ loginPassword: md5(params.password), loginId: params.username })
    .then((res) => {
      // 向小程序传输数据
      // wx.miniProgram.navigateTo({delta: 1})
      // wx.miniProgram.postMessage({ data: { isLogin: 'success' } })

      // // 登陆后进行微信授权
      // vueWechatAuth.redirectUri = "https://navweb.iot.xinsec.com.cn/"
      // window.location.href = vueWechatAuth.authUrl

      // 登陆成功跳转
      router.push({ path: "/home" });
    }).catch((err) => {
      Toast({ message: err.msg, duration: 1000, position: 'bottom' })
    });
}
</script>

<style lang="scss" >
.login-container {
  padding-top: 174px;

  .login-title {
    box-sizing: border-box;
    letter-spacing: 3px;
    padding-left: 2px;
    padding-bottom: 40px;

    p:first-child {
      font-size: 22px;
      font-weight: 600;
      padding: 9px 0;
    }

    p:last-child {
      font-size: 16px;
    }
  }

  .login-content {
    height: auto;
    overflow: hidden;
    background: #ffffff;
    padding: 0 32px;
  }

  .login-footer {
    position: absolute;
    bottom: 32px;
    left: 0;
    width: 100%;
    text-align: center;
  }
}
</style>

<!--
 功能：登录块
 作者：weihang
 邮箱：weihang.huang@xinsec.com.cn
 时间：*2022-05-12 15:11:11
 版本：v1.1.0
-->
<template>
    <ConfigProvider theme-vars="themeVars">
        <div class='LoginBlock'>
            <div class="login-form">
                <div class="login-form-item">
                    <!-- <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="11" y="4" width="26" height="40" rx="3" fill="none" stroke="#333" stroke-width="4" />
                    <path d="M22 10L26 10" stroke="#333" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M20 38H28" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg> -->
                    <input v-model.trim="loginInfo.username" type="text" name="phone" autocomplete="off"
                        placeholder="请输入手机号" />
                </div>
                <div class="login-form-item">
                    <!-- <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                    <rect x="6" y="22" width="36" height="22" rx="2" fill="none" stroke="#333" stroke-width="4"
                        stroke-linejoin="round" />
                    <path d="M14 22V14C14 8.47715 18.4772 4 24 4C29.5228 4 34 8.47715 34 14V22" stroke="#333"
                        stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M24 30V36" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg> -->
                    <input v-model="loginInfo.password" type="password" name="password" autocomplete="off"
                        placeholder="请输入密码" />
                </div>
            </div>
            <Button block type="success" @click="onSubmit" class="login-form-btn">{{ submitText }}</Button>
        </div>
    </ConfigProvider>
</template>


<script setup name="LoginBlock">
import { Button, ConfigProvider } from "vant";
import { reactive } from "vue";
const loginInfo = reactive({ username: "", password: "" });
const emits = defineEmits(["onSubmit"]);

defineProps({
    submitText: {
        type: String,
        default: "绑定"
    },
})
const themeVars = {
    buttonSuccessBackgroundColor: '#07c160',
};

function onSubmit() {
    emits("onSubmit", loginInfo);
}

</script>

<style lang='scss' >
.login-form {
    height: auto;
    overflow: hidden;
    margin-bottom: 32px;

    &-item {
        height: 45px;
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: none;


        input {
            width: 100%;
            background: none;
            color: #333333;
            font-size: 14px;
            box-sizing: border-box;
            border: $border-width $border-color $border-style;
            padding: 12px 0 12px 24px;
        }

        button {
            border-radius: 4px;
            font-size: 16px;
            background: #00CD96;
            color: #fff;
        }
    }
}
</style>
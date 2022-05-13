<!--
 功能：搜索块
 作者：weihang
 邮箱：weihang.huang@xinsec.com.cn
 时间：*2022-05-12 15:11:11
 版本：v1.1.0
-->
<template>
    <ConfigProvider :theme-vars="themeVars">
        <div class='searchBlock'>
            <div class="search-form">
                <div class="search-form-item" v-for="(item, i) in searchList" :key="i">
                    <input v-model.trim="item.value" type="text" autocomplete="off" :placeholder="item.placeHolder" />
                </div>
            </div>
            <Button block type="success" @click="onSubmit" class="search-form-btn">{{ submitText }}</Button>
        </div>
    </ConfigProvider>
</template>

<script setup name="searchBlock">
import { Button, ConfigProvider } from "vant";
import { reactive } from "vue";
// const searchInfo = reactive({ username: "", password: "" });
const emits = defineEmits(["onSubmit"]);

const props = defineProps({
    // 按钮文字
    submitText: {
        type: String,
        default: "查询"
    },
    // 表单列表
    formList: {
        type: Array,
        default: () => []
    }
})

const searchList = props.formList
const themeVars = {
    buttonSuccessBackgroundColor: '#07c160',
};

function onSubmit() {
    emits("onSubmit", searchList);
}

</script>

<style lang='scss' >
.search-form {
    height: auto;
    overflow: hidden;

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
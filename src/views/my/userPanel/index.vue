<!--
 功能：我的-用户面板
 作者：weihang
 邮箱：weihang.huang@xinsec.com.cn
 时间：*2022-05-12 09:29:11
 版本：v1.1.0
-->
<template>
    <div class='user-panel'>
        <div class="user-header">
            <div class="user-avatar">
                <svg-icon name="Info-Circle" width="100%" height="100%"></svg-icon>
            </div>
            <div class="user-info">
                <div class="user-name">Cadgy点到底👋</div>
                <div class="user-phone">13213131212</div>
            </div>
        </div>
        <div class="user-card">
            <div class="user-card-item">
                <span>绑定用户</span>
                <span>管理</span>
            </div>
            <div class="user-card-item">
                <span>用户类型</span>
                <span>老黄(008)</span>
            </div>
        </div>
    </div>
</template>


<script setup>
import { CellGroup, Cell } from 'vant';

</script>


<style lang='scss' scoped>
.user-panel {
    height: 224px;
    width: 100%;
    background-image: linear-gradient(#00CD96, #F8F8F8);
    padding: 24px;
    box-sizing: border-box;
}

.user {
    &-header {
        display: flex;
        padding: 0 0 20px 4px;
    }

    &-avatar {
        width: 56px;
        height: 56px;
        border-radius: 90px;
        background-color: red;

        svg {
            width: 100%;
        }

        // width: ;
    }

    &-info {
        padding-left: 16px;
    }

    &-name {
        font-size: $xsa-fontSize-lg;
        margin-bottom: 6px;
        color: #fff;

    }

    &-phone {
        font-size: $xsa-fontSize-xs;
        color: #fff;
    }

}

.user-card {
    background: #fff;
    border-radius: 4px;
    padding: 20px 16px;
    box-sizing: border-box;

    &-item {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: $xsa-color-default;
    }

    &-item:first-child {
        margin-bottom: 24px;
    }
}
</style>
<template>
    <div class="adPage">
        <div class="time-block">
            <!-- <CountDown ref="countDown" :time="time" format="ss" @finish="goLogin" /> -->
            {{ time }}
        </div>
        <div class="logo">
            <svg-icon name="icon_home_pre" width="44px" height="44px"></svg-icon>
            <span>数据报表</span>
        </div>
        <div class="footer">
            <Divider>©版权所有 广东信尚安物联科技有限公司</Divider>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { CountDown, Divider } from 'vant';
const time = ref(3)
const router = useRouter()
function goLogin() {
    router.replace('/login')
}
onMounted(() => {
    for (let index = time.value; index > 0; index--) {
        setTimeout(() => {
            time.value -= 1
            if (time.value == 0) {
                router.replace('/login')
            }
        }, 1000 * index)

    }
})
</script>
<style style="scss" scoped>
.adPage {
    position: relative;
    left: 0;
    top: 0;
    height: 100%;
}

.logo {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
}

.time-block {
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    border-radius: 25px;
    text-align: center;
    padding: 2px 15px;
    position: absolute;
    right: 10%;
    top: 10%;
    font-size: 14px;
}

.footer {
    position: absolute;
    bottom: 32px;
    left: 0;
    width: 100%;
    text-align: center;
}
</style>
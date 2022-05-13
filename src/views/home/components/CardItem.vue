<template>
    <div class="cardItem">
        <div class="cardName">
            {{ cardName }}
        </div>
    </div>
</template>

<script setup name="CardItem">
const props = defineProps({
    cardName: {
        type: String,
        default: ""
    }
})
</script>

<style lang="scss" scoped>
.cardItem {
    background-color: #fff;
    margin-bottom: 8px;

    padding: 27px 0 27px 24px;
}

.cardName {
    font-size: $xsa-fontSize-md;
    color: #333;
    font-weight: 600;
}
</style>
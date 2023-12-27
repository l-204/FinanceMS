<template>
    <div class="index">
        <HeadNav></HeadNav>
        <LeftMenu></LeftMenu>
        <div class="rightContainer">
            <RouterView></RouterView>
        </div>

    </div>
</template>

<script>
import HeadNav from '../components/HeadNav.vue'
import LeftMenu from '../components/LeftMenu.vue';
export default {
    name: "index",
    components: {
        HeadNav,
        LeftMenu
    }
}
</script>

<style>
.index {
    width: 100%;
    height: 100%;
    overflow: hidden;

}

.rightContainer {
    position: relative;
    top: 0px;
    left: 180px;
    width: 100%-180px;
    height: 100%;
    overflow: auto;
}
</style>
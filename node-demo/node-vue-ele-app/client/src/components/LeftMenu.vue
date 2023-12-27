<template>
    <el-row class="menu-page">
        <el-col>
            <el-menu class="el-menu-vertical-demo" default-active="2" text-color="#303133">
                <router-link to="/home">
                    <el-menu-item index="0">
                        <i class="fa fa-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <template v-for="item in items">
                    <el-sub-menu v-if="item.children" :index="item.path" :key="item.path">
                        <template v-slot:title>

                            <i :class="'fa ' + item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <RouterLink v-for="(citem, cindex) in item.children" :to="citem.path" :key="cindex">
                            <el-menu-item :index="citem.path">
                                <i :class="'fa ' + citem.icon"></i>
                                <span slot="title">{{ citem.name }}</span>
                            </el-menu-item>
                        </RouterLink>
                    </el-sub-menu>
                </template>


            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'left-menu',
    data() {
        return {
            items: [
                {
                    icon: "fa-credit-card",
                    name: "资金管理",
                    path: "fund",
                    children: [
                        { path: "fundlist", name: "资金流水", icon: "fa-rmb" }
                    ]
                },
                {
                    icon: "fa-envelope-o",
                    name: "信息管理",
                    path: "info",
                    children: [
                        { path: "infoshow", name: "个人信息", icon: "fa-user" }
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped>
.menu_page {
    position: fixed;
    top: 71px;
    left: 0;
    min-height: 100%;
    background-color: #324057;
    z-index: 99;
}

.el-menu {
    border-right: 1px solid #c9d6df;
    position: fixed;
    z-index: 99;
    height: 100%;
    background-color: #fff;
}

.fa {
    margin-right: 12px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
}

.el-menu-vertical-demo {
    width: 35px;
}

.el-sub-menu .el-menu-item {
    min-width: 180px;
}


a {
    text-decoration: none;
}
</style>
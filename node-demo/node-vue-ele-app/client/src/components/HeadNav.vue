<template>
    <header class="head-nav">
        <el-row>
            <el-col :span="12" class="logo-container">
                <img src="../assets/logo.jpg" class="logo">
                <span class="title">后台管理系统</span>
            </el-col>
            <el-col :span="12" class="user">
                <div class="userinfo">
                    <!-- 原代码 -->
                    <!-- <img :src="user.avatar" class="avatar"> -->
                    <img src="../assets/avatar.png" class="avatar">
                    <div class="welcome">
                        <p class="name comename">欢迎</p>
                        <p class="name avatarname">{{ user.name }}</p>
                    </div>
                    <!-- 下拉箭头 -->
                    <el-dropdown trigger="click" @command="setDialogInfo">
                        <span class="el-dropdown-link">
                            <el-icon class="el-icon--right">
                                <CaretBottom />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
    </header>
</template>

<script>
export default {
    name: 'head-nav',
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    methods: {
        setDialogInfo(cmdItem) {
            switch (cmdItem) {
                case "info":
                    this.showInfoList();
                    break;
                case "logout":
                    this.logout();
                    break;
            }
        },
        showInfoList() {
            this.$router.push('/infoshow')
        },
        logout() {
            // 清除token
            localStorage.removeItem("eleToken");
            // 设置vuex store
            this.$store.dispatch("clearCurrentState")
            // 跳转
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.head-nav {
    widows: 100%;
    height: 60px;
    min-width: 600px;
    padding: 5px;
    background: #324057;
    color: #fff;
    border-bottom: 1px solid #1f2d3d;
}

.head-nav {
    widows: 100%;
    height: 60px;
    min-width: 600px;
    padding: 5px;
    background: #2C73D2;
    color: #fff;
    border-bottom: 1px solid #92a399;
}

.logo-container {
    line-height: 60px;
    min-width: 400px;
}

.logo {
    height: 40px;
    width: 40px;
    margin-right: 8px;
    vertical-align: middle;
    display: inline-block;
    border-radius: 50%;
}

.title {
    vertical-align: middle;
    display: inline-block;
    font-size: 22px;
    font-family: 'Microsoft YaHei';
    letter-spacing: 3px;
}

/* .user {
    line-height: 60px;
    text-align: right;
    float: right;
    padding-right: 10px;

} */

.userinfo {

    position: absolute;
    right: 0px;
    display: flex;
    align-items: center;
    margin-top: 10px;

}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;

}

.welcome {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: 0 5px;
}

.name {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
}

.comename {
    font-size: 12px;
}

.avatarname {
    color: #c9d6df;
    font-weight: bolder;
}

.username {
    cursor: pointer;
    margin-right: 5px;
}

.el-dropdown {
    color: #fff;

}
</style>
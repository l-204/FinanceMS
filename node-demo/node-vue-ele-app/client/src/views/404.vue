<template>
    <div class="notfound">
        <div class="container">
            <span>4</span>
            <img src="../assets/head.png">
            <span>4</span>
            <p class="title">找不到路了, 返回<a href="/index">首页</a>看看吧</p>
            <p class="lead">http://localhost:8080/index</p>
        </div>
    </div>
</template>

<style scoped>
.notfound {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url(../assets/404.png) no-repeat;
}

.notfound img {
    width: 320px;
    height: 280px;
}

.container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 100px;
    background-color: rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #fff;
    font-family: "Lucida Console", Courier, monospace;
}

.container span {
    font-size: 320px;
    margin-right: 40px;
}

.title {
    font-size: 40px;
    margin-top: 100px;
}

.lead {
    margin-top: 80px;
    font-size: 12px;
}
</style>
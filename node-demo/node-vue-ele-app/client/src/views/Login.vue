<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <img class="image" src="../assets/left.png">
                <!-- <span class="title">后台管理系统</span> -->
                <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="80px" class="loginForm">

                    <el-form-item style="margin-bottom: 50px;" label="" prop="email">
                        <el-input v-model="loginUser.email" placeholder="Email">
                            <template #prepend>
                                <el-icon>
                                    <Message />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item style="margin-bottom: 50px;" label="" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="Password">
                            <template #prepend>
                                <el-icon>
                                    <Key />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button style="margin-bottom: 50px;" color="#B06AB3" class="submit_btn"
                            @click="submitForm('loginForm')">Sign in</el-button>
                    </el-form-item>

                    <div class="tiparea">
                        <p>还没有账号？现在<router-link to="/register">注册</router-link></p>
                    </div>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
    name: "login",
    components: {},
    data() {
        return {
            loginUser: {
                email: '',
                password: ''
            },
            rules: {
                email: [
                    {
                        type: "email",
                        required: true,
                        message: "邮箱格式不正确",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 30,
                        message: "长度在6到30之间",
                        trigger: "blur"
                    }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$axios.post("/api/users/login", this.loginUser)
                        .then(response => {
                            // token
                            const { token } = response.data;
                            // 存储到localStorage
                            localStorage.setItem('eleToken', token);

                            // 解析token
                            const decoded = jwt_decode(token);

                            // token存储到Vuex中
                            this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded))
                            this.$store.dispatch("setUser", decoded)
                            this.$router.push('/index')
                        })
                }
            });

            this.$router.push('/index')
        },

        isEmpty(value) {
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            )
        }
    }
}
</script>

<style scoped>
.login {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #d9b6ecc1;
    /* background: url(../assets/bg.jpg) no-repeat center center; */
    background-size: 100% 100%;
}

.form_container {
    width: 704px;
    height: 300px;
    position: absolute;
    top: 23%;
    left: 28%;
    /* padding: 25px; */
    border-radius: 5px;
    text-align: center;
}

.form_container .manage_tip .title {
    font-family: 'Microsoft YaHei';
    font-weight: bold;
    font-size: 26px;
    color: #fff;
}

.loginForm {
    /* margin-top: 20px; */
    background-color: #fff;
    padding: 75px 80px 41px;
    /* border-radius: 5px; */
    box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
    width: 60%;
    color: #fff;
    border-radius: 20px;
    margin-left: 50px;
}

.tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
}

.tiparea p a {
    color: #409eff
}

.image {
    float: left;
    width: 300px;
    height: 392px
}
</style>
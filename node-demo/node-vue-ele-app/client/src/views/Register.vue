<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <img class="image" src="../assets/left.png">
                <!-- <span class="title">后台管理系统</span> -->
                <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                    <el-form-item label="" prop="name">
                        <el-input v-model="registerUser.name" placeholder="Username">
                            <template #prepend>
                                <el-icon>
                                    <User />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="" prop="email">
                        <el-input v-model="registerUser.email" placeholder="Email">
                            <template #prepend>
                                <el-icon>
                                    <Message />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="" prop="password">
                        <el-input type="password" v-model="registerUser.password" placeholder="Password">
                            <template #prepend>
                                <el-icon>
                                    <Key />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="" prop="password2">
                        <el-input type="password" v-model="registerUser.password2" placeholder="Repassword">
                            <template #prepend>
                                <el-icon>
                                    <Key />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="">
                        <el-select v-model="registerUser.identity" placeholder="Identity">
                            <template #prefix>
                                <span style="padding-left: 5px;">
                                    <el-icon>
                                        <Avatar />
                                    </el-icon>
                                </span>
                            </template>
                            <el-option label="管理员" value="manager"></el-option>
                            <el-option label="员工" value="employee"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button color="#B06AB3" class="submit_btn"
                            @click="submitForm('registerForm')">Register</el-button>
                    </el-form-item>

                    <div class="tiparea">
                        <p>已有账号？现在<router-link to="/login">登录</router-link></p>
                    </div>
                </el-form>

            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "register",
    components: {},
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.registerUser.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            registerUser: {
                name: '',
                email: '',
                password: '',
                password2: '',
                identity: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 30,
                        message: "长度在到2到30个字符之间",
                        trigger: "blur"
                    }],
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
                ],
                password2: [
                    {
                        required: true,
                        message: "确认密码不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 30,
                        message: "长度在6到30之间",
                        trigger: "blur"
                    },
                    {
                        validator: validatePass2,
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
                    this.$axios.post("/api/users/register", this.registerUser)
                        .then(response => {
                            // 注册成功
                            this.$message({
                                message: "账号注册成功",
                                type: "success"
                            })
                        })
                }
            });

            this.$router.push('/login')
        },
    }
}
</script>

<style scoped>
.register {
    position: relative;
    widows: 100%;
    height: 100%;
    background-color: #d9b6ecc1;
    /* background: url(../assets/bg.jpg) no-repeat center center; */
    background-size: 100% 100%;
}

.form_container {
    width: 704px;
    height: 500px;
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

.registerForm {
    /* margin-top: 20px; */
    background-color: #fff;
    padding: 40px 80px 38px;
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

.t {
    font-size: 20px;
    margin: 20px;
    margin-left: 80px;
    margin-top: 40px
}
</style>
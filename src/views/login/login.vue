<template>
    <div id="login">
        <el-form :model="loginForm"   label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="account">
                <el-input type="text" v-model="loginForm.userName" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="loginForm.passWord" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="loginSubmit">登录</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
//import Bar from './es6'
    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    userName: 'admin',
                    passWord: '123456'
                },
               // date:''
            }
        },
        mounted(){
            // var b=new Bar();
            // setInterval(()=>{
            //     this.date = b.getDate();
            // },1000)
        },
        methods: {
            loginSubmit() {


                var _this = this;
                if(this.loginForm.userName =="" || this.loginForm.passWord ==""){
                    this.$message({
                        message: '用户名或密码不能为空！',
                        type: 'warning'
                    });
                    return false;
                }
                //axios请求数据

                this.$axios.get("/json/login.json").then(res =>{
                     let result = res.data;
                    if(result.success == true){
                        this.$message({
                            showClose: true,
                            message: '恭喜你，登录成功！',
                            type: 'success'
                        });
                        // 保存本地缓存
                        localStorage.setItem("userName" ,this.loginForm.userName);
                        //路由跳转到主页面
                        this.$router.push({ path: '/' });

                    }else{
                        this.$message.error('用户名或密码不正确！');
                    }

                }).catch(err =>{
                    this.$message({
                        message: '服务器连接异常',
                        type: 'warning'
                    });
                })

            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/less/login/login";
</style>
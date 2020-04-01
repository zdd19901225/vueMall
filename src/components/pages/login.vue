<template>
    <div>
        <van-nav-bar
            title="用户登录"
            left-arrow
            left-text="返回"
            @click-left="goBack"
        />
        <van-field
            label="用户名" 
            icon="clear" 
            v-model="username" 
            placeholder="请输入用户名" 
            require 
            @click-icon="username=''"
            :error-message="usernameMsg"
        />
        <van-field 
            label="密码" 
            v-model="password" 
            placeholder="请输入密码" 
            :error-message="passwordMsg"
        />
        <div  class="register-button">
            <van-button type="primary" @click="loginUsers" :loading="openLoading" size="large">登录</van-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import url from '@/serviceAPI.config.js'
    import {Toast} from 'vant'
    export default {
        data(){
            return{
                username:'',
                password:'',
                openLoading:false,//是否开启loading
                usernameMsg:'',//用户名错误提示
                passwordMsg:''//密码错误提示
            }
        },
        created(){
            if(localStorage.userInfo){
                Toast.success('您已经登录过了');
                this.$router.push('/')
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            loginUsers(){
                this.checkForm() && this.getUsersData();
                // if(this.checkForm()){  //同上
                //     this.getUsersData();
                // }
            },
            getUsersData(){
               this.openLoading = true;
               axios({
                    method:'post',
                    url:url.loginUserData,
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                })
                .then((res)=>{
                    console.log(res)
                    if(res.data.code==200 && res.data.message){
                        new Promise((resolve,reject)=>{
                            localStorage.userInfo = {userName:this.userName};
                            setTimeout(()=>{
                                resolve()
                            },500)
                        }).then(()=>{
                            Toast.success('登录成功')
                            this.$router.push('/');
                        }).catch((error)=>{
                            Toast.fail('用户登录保存失败')
                            console.log(error)
                        })
                    }else{
                        Toast.fail('登录失败')
                        this.openLoading = false;
                    }
                })
                .catch((err)=>{
                    Toast.fail('登录失败')
                    this.openLoading = false;
                })
            },
            checkForm(){
                let isOK = true;
                if(this.username.length<5){
                    this.usernameMsg = '用户名不能少于5位';
                    isOK = false;
                }else{
                    this.usernameMsg = '';
                }
                if(this.password.length<6){
                    this.passwordMsg = '密码不能少于6位';
                    isOK = false;
                }else{
                    this.passwordMsg = '';
                }
                return isOK;
            }
        }
    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>
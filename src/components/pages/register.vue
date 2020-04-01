<template>
    <div>
        <van-nav-bar
            title="用户注册"
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
            <van-button type="primary" @click="registerUsers" :loading="openLoading" size="large">马上注册</van-button>
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
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            registerUsers(){
                this.checkForm() && this.getUsersData();
                // if(this.checkForm()){  //同上
                //     this.getUsersData();
                // }
            },
            getUsersData(){
               this.openLoading = true;
               axios({
                    method:'post',
                    url:url.getUserData,
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                })
                .then((res)=>{
                    console.log(res)
                    if(res.data.code == 200){
                        Toast.success(res.data.message)
                        this.$router.push('/')
                    }else{
                        console.log(res.data.message)
                        Toast.fail('注册失败')
                        this.openLoading = false
                    }
                })
                .catch((err)=>{
                    Toast.fail('注册失败')
                    this.openLoading = false
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
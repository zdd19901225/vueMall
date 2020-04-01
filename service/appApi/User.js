const Router = require('koa-router')
const router = new Router()
// const mongoose = require('mongoose')

router.get('/',async(ctx)=>{
    ctx.body = '这是首页接口'
})
router.post('/register',async(ctx)=>{
    console.log(ctx.request.body)
    // ctx.body = ctx.request.body

    //连接schema下的User.js
    const User = require('../database/scheme/User');
    //将前端接受到的post数据封装成新的user对象
    let userRegister = new User(ctx.request.body);
    //用mongoose的save方法存储到数据库，判断返回状态
    await userRegister.save().then(()=>{
        ctx.body = {
            code:200,
            message:'注册成功'
        }
    }).catch((err)=>{
        ctx.body = {
            code:500,
            message:err
        }
    })
})

router.post('/login',async(ctx)=>{
    //获得前端传来的数据
    let loginUser = ctx.request.body;
    let userName = loginUser.userName;
    let password = loginUser.password;
    //引入User
    const User = require('../database/scheme/User');
    //查找用户名是否存在，如果存在则比对密码
    await User.findOne({userName:userName}).exec().then(async(res)=>{
        console.log(res);
        if(res){
            //用户名存在，则开始比对密码
            let newUser = new User();//因为是实例方法，所以要new出来才能调用
            await newUser.comparePassword(password,res.password).then((isMatch)=>{
                ctx.body = {
                    code:200,
                    message:isMatch
                }
            }).catch((err)=>{
                ctx.body = {
                    code:500,
                    message:err
                }
            })
        }else{
            ctx.body = {code:500,message:'用户名不存在'}
        }
    }).catch((err)=>{
        ctx.body = {code:500,message:err}
    })
})

module.exports = router

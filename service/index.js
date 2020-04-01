const Koa = require('koa')// 导入koa
const app = new Koa()// 创建一个Koa对象表示web app本身:

const bodyparser = require('koa-bodyparser')//引用koa-bodyparser
app.use(bodyparser())//使用bodyparser
//koa2-cors解决跨域问题
const cors = require('koa2-cors')
app.use(cors())

const mongoose = require('mongoose')//引入mongoose
const { connect,initSchemas } = require('./database/init.js')
// const { connect } = require('./database/init.js')

const Router = require('koa-router')
const router = new Router()
let user = require('./appApi/User.js')
let goods = require('./appApi/goods.js')

//立即执行函数
;(async ()=>{
    await connect();
    // initSchemas();
    //插入一条数据
    // const User = mongoose.model('User');
    // const User = require('./database/scheme/User');

    // let oneUser = new User({userName:'zdd_bbb',password:'123456'});
    // oneUser.save().then(()=>{
    //     console.log('插入成功');
    // });

    // let users = await User.find({}).exec();
    // console.log('---------------');
    // console.log(users);
    // console.log('---------------')
})()


//装载所有子路由
router.use('/user',user.routes())
router.use('/goods',goods.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


//每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数
app.use(async(ctx,next)=>{// 对于任何请求，app将调用该异步函数处理请求
    //参数ctx是由koa传入的封装了request和response的变量，我们可以通过它访问request和response，next是koa传入的将要处理的下一个异步函数
    //我们首先用await next();处理下一个异步函数，然后，设置response的Content-Type和内容
    await next();
    ctx.body = '<h1>Hello</h1>'
});


app.listen(3000,()=>{// 在端口3000监听
    console.log('[SERVICE] starting at port 3000')
});

//koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用await next()来调用下一个async函数。我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。
// middleware的顺序很重要，也就是调用app.use()的顺序决定了middleware的顺序。

//此外，如果一个middleware没有调用await next()，会怎么办？答案是后续的middleware将不再执行了。这种情况也很常见，例如，一个检测用户权限的middleware可以决定是否继续处理请求，还是直接返回403错误
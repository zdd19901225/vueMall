const mongoose = require('mongoose');//引入mongoose
const Schema = mongoose.Schema;//声明Schema
let ObjectId = Schema.Types.ObjectId;//声明object类型

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;//加盐位数

//创建用户Schema
const userSchema = new Schema({
    UserId:ObjectId,//{type:ObjectId}
    userName:{unique:true,type:String},//unique不重复，类型为string
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
})

//用pre每次保存时都进行加密加盐处理
userSchema.pre('save',function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err);
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err);
            this.password = hash;
            next();
        })
    })
})

//密码比对方法
//声明了一个实例方法叫comparePassword,传入两个参数，一个客户端传来的密码_password，一个数据库加盐加密过的密码password
//用bcrypt提供的compare方法作比对，包装成promise返回
userSchema.methods = {
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}

//发布模型
// mongoose.model('User',userSchema)
module.exports = mongoose.model('User',userSchema)
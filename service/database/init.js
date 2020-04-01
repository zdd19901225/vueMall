//用来做数据库连接和初始化操作
//启动服务器时就载入数据库
const mongoose = require('mongoose')//引入mongoose
const db = "mongodb://localhost/smile-db"//数据库路径+名称

//载入schema首先要引入glob和resolve
const glob = require('glob')//node的glob模块允许使用*等符号
const {resolve} = require('path')//将路径转换成绝对路径

//一次性引入所有的Schema文件
exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}//使用了glob.sync同步引入所有schema文件,然后用forEach方法引入（require）进来


let maxConncetTime = 0;//连接最大次数
exports.connect = ()=>{//用exports暴露出去
    mongoose.connect(db);//连接数据库

    return new Promise((resolve,reject)=>{
        //增加数据库监听事件
        mongoose.connection.on('disconnected',()=>{
            console.log('****数据库断开时，重新连接*****');
            if(maxConncetTime <= 3){
                maxConncetTime++;
                mongoose.connect(db);
            }else{
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......');
            }
        })
        mongoose.connection.on('error',()=>{
            console.log('****数据库出错时，重新连接*****');
            if(maxConncetTime <= 3){
                maxConncetTime++;
                mongoose.connect(db);
            }else{
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......');
            }
        })
        mongoose.connection.once('open',()=>{
            console.log('MongoDB Connected successfully!');
            resolve();
        })
    })
}

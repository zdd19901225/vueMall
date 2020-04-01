const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./goods.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        const goods = require('../database/scheme/Goods');
        data.map((value,index)=>{
            let newGoods = new goods(value);
            newGoods.save().then(()=>{
                console.log('成功')
            }).catch(()=>{
                console.log('失败')
            })
        })
    })
    ctx.body = '商品数据'
})

module.exports = router;
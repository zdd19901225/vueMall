<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" class="location-icon"/>
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input"/>
                </van-col>
                <van-col span="5">
                    <van-button size="mini" class="search-button">查找</van-button>
                </van-col>
            </van-row>  
        </div>
        <!-- 轮播图 -->
        <div class="swipe-area">
            <van-swipe :autoplay="2000" >
                <van-swipe-item v-for="(item,index) in swipePicArray" :key="index">
                    <img :src="item.image" class="scrollImg"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 商品分类 -->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img :src="cate.image"/>
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!-- 广告条 -->
        <div class="ad-bar">
            <img :src="adPic"/>
        </div>
        <!-- recommend Goods area -->
        <div class="recommend-area">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%"/>
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}}（￥{{item.mallPrice | moneyFilter}}）</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- floor area -->
        <floor-component :floorData="floor1" :floorName="floorName.floor1"></floor-component>
        <floor-component :floorData="floor2" :floorName="floorName.floor2"></floor-component>
        <floor-component :floorData="floor3" :floorName="floorName.floor3"></floor-component>
        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                            <hot-goods :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></hot-goods>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>
<script>
    // 局部引用swiper组件
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide} from 'vue-awesome-swiper'
    import floorComponent from '../component/floorComponent'
    import {toMoney} from '@/money/toMoneyFilter.js'
    import hotGoods from '../component/goodsInfoComponent'
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'

    export default{
        data(){
            return{
                swiperOption:{
                    slidesPerView:3
                },
                locationIcon:require('../../assets/images/location.png'),
                swipePicArray:[],
                category:[],
                adPic:'',
                recommendGoods:[],
                floor1:[],
                floor2:[],
                floor3:[],
                floorName:{},
                hotGoods:[]
            }
        },
        methods:{
            getDatas(){
                let _this = this;
                // this.$http.get('/posts').then((res)=>{
                //     console.log(res);
                //     _this.category = res.data.posts.data.category;
                //     _this.adPic = res.data.posts.data.advertesPicture.PICTURE_ADDRESS;
                //     _this.swipePicArray = res.data.posts.data.slides;
                //     _this.recommendGoods = res.data.posts.data.recommend;
                //     _this.floor1 = res.data.posts.data.floor1;
                //     _this.floor2 = res.data.posts.data.floor2;
                //     _this.floor3 = res.data.posts.data.floor3;
                //     _this.floorName = res.data.posts.data.floorName;
                //     _this.hotGoods = res.data.posts.data.hotGoods;
                // })
                axios({
                    url:url.getIndexData,
                    method:'get'
                }).then((res)=>{
                    console.log(res);
                    _this.category = res.data.posts.data.category;
                    _this.adPic = res.data.posts.data.advertesPicture.PICTURE_ADDRESS;
                    _this.swipePicArray = res.data.posts.data.slides;
                    _this.recommendGoods = res.data.posts.data.recommend;
                    _this.floor1 = res.data.posts.data.floor1;
                    _this.floor2 = res.data.posts.data.floor2;
                    _this.floor3 = res.data.posts.data.floor3;
                    _this.floorName = res.data.posts.data.floorName;
                    _this.hotGoods = res.data.posts.data.hotGoods;
                })
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money);
            }
        },
        mounted(){
            this.getDatas();
        },
        components:{
            swiper,swiperSlide,floorComponent,hotGoods
        }
    }
</script>
<style scoped>
.search-bar{
    width:100%;
    height:2.2rem;
    line-height:2.2rem;
    background:#e5017d;
    overflow: hidden;
}
.location-icon{
    width:80%;
    padding:0.2rem 0 0 0.3rem;
}
.search-input{
    width:100%;
    height:1.3rem;
    border-top:0px;
    border-left:0px;
    border-right:0px;
    border-bottom:1px solid #fff;
    background:#e5017d;
    color:#fff;
}
.swipe-area{
    width:100%;
    clear: both;
    overflow: hidden;
}
.scrollImg{
    width:100%;
    height:160px;
}
.type-bar{
    background:#fff;
    margin:0.3rem;
    border-radius: 0.3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.type-bar div{
    font-size: 12px;
    flex:1;
    padding:0.3rem;
    text-align: center;
}
.type-bar div img{
    width:100%;
}
.ad-bar img{
    width:100%;
}
.recommend-area{
    background:#fff;
    margin-top:0.3rem;
}
.recommend-title{
    border-bottom:1px solid #eee;
    font-size:14px;
    padding:0.2rem;
    color:#e5017d;
}
.recommend-body{
    border-bottom: 1px solid #eee;
}
.recommend-item{
    width:99%;
    border-right:1px solid #eee;
    font-size:12px;
    text-align:center;
}
.hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }

</style>
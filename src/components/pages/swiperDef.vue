<template>
    <div>
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide class="swiper-slide" v-for="(item,index) in slidess" :key="index">
                <div class="slided">slide{{item}}</div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <!-- <div class="swiper-button-prev" slot="navigation"></div>
            <div class="swiper-button-next" slot="navigation"></div> -->
        </swiper>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide} from 'vue-awesome-swiper'

    export default {
        data(){
            return{
                slidess:[1,2,3,4,5,6],
                swiperOption:{
                    loop:true,
                    pagination:{
                        el:'.swiper-pagination',
                        clickable:true
                    },
                    // navigation:{
                    //     nextEl:'.swiper-button-next',
                    //     prevEl:'.swiper-button-prev'
                    // }
                    // direction:'vertical'
                }
            }
        },
        components:{
            swiper,swiperSlide
        }
    }
</script>

<style scoped>
.swiper-slide{
      height: 4rem;
      text-align: center;
      padding-top: 3rem;
      border-bottom: 1px solid #ccc;
}
.slided{
    height: 100%;;
}
</style>
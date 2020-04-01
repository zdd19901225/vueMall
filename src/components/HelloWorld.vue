<template>
  <div class="hello">
    <van-button type="primary">按钮</van-button>
    <div style="width:20rem;height:10rem;background:pink;">
      <p style="font-size:2rem;">test-font</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      
    }
  },
  mounted(){
    this.fontMethod();
  },
  methods:{
    fontMethod(){
      let htmlWidth = document.documentElement.clientWidth;
      let htmlDom = document.getElementsByTagName('html')[0];
      htmlDom.style.fontSize = htmlWidth/20 + 'px';
      console.log(htmlWidth);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

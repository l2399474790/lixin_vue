<template>
  <div>
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab border-1px"> <!--在全局定义一个类名进行缩放来解决一像素边框问题:当dpr的值为2时，我们让固定的缩放0.5倍-->
      <div class="tab-item">  <!--解决一像素：画边框，伪类缩放-->
        <!--<a v-link="{path:'/goods'}">商品</a>-->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <!--<a v-link="{path:'/ratings'}">评论</a>-->
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <!--<a v-link="{path:'/seller'}">商家</a>-->
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  const ERR_OK = 0;
  export default {
    components: {
      'v-header': header
    },
    data() {
      return {
        seller: {}
      };
    },
    created() { // 这里面的this就是vue对象
      this.$http.get('/api/seller').then((response) => {
        response = response.body; // 通过response.josn来格式化json数据,这个返回的是promise对象
        if (response.errno === ERR_OK) {
          this.seller = response.data; // 把拿到的数据传到seller对象中
          console.log(this.seller);
        }
    });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import './common/sass/min.scss'; /*引入外部scss文件*/
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(red); /*通过@mixin声明混合，可以传入参数，用$，多个参数,号隔开，也可以给参数设置默认值，通过@include调用*/
    .tab-item {
      flex: 1;
      text-align: center;
      a{
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active{
           color: rgb(240, 20, 20);
        }
      }
    }
  }
</style>

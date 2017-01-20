<template lang="html">
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img v-bind:src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name" v-text="seller.name"></span>
        </div>
        <div class="description" v-cloak>{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <!--页面加载完后，如果数据没有过来，这厘米昂的seller是undefined，如果再往下执行 seller.supports[0]就会报错-->
          <span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <!--如果有优惠就显示，如果没有优惠就不显示-->
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!--公告-->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--背景-->
    <div class="background">
      <img v-bind:src="seller.avatar" width="100%" height="100%"/>
    </div>
    <!--弹层-->
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <v-star v-bind:size="48" v-bind:score="seller.score"></v-star>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" v-on:click="hideDetail"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star.vue';
  export default {
    components: {
      'v-star': star  // 一定要注意字母
    },
    data: function () {
      return {
        detailShow: false   // 默认不显示
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true; // 修改状态进行显示
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    props: { // 可以是数组也可以是对象，用来接收来自父组件的数据
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/sass/min.scss";/*用到什么css要在每个组件中引用*/
  /*组件的设计设计原则是图片都要放在组件维护*/
  .header{
    position:relative;
    overflow:hidden;
    color:#fff;
    background:rgba(1,17,27,0.5);
    .content-wrapper{
      position:relative;/*父级就写一个相对定位*/
      overflow:hidden;
      padding:24px 12px 18px 24px;
      font-size:0; /*可以解决display：inline-block的间隙问题*/
      .avatar{  /*除了使用浮动还可以使用display:inline-block和font-size至来处理两个行内快的缝隙*/
        float:left;
        width:64px;
        height:64px;
        img{
          border-radius:2px;
        }
      }
      .content{
        float:left;
        margin-left:16px;
        .title{
          margin:2px 0 8px 0;
          .brand{
            display:inline-block;
            vertical-align:top; /*通过设置对齐方式与后面的进行对齐*/
            width:30px;
            height:18px;
            @include bg-image('brand');/*这里调用公共的方法，图片引入后，webpack打包的时候小于8kb的图片变成base64*/
            background-size:30px 18px;
            backgound-repeat:no-repeat;
          }
          .name{
            margin-left:6px;
            line-height:18px;
            font-size:16px;
            color:#fff; /*字体颜色可以不用写，它是继承到它的父元素的*/
            font-weight:bold;
          }
        }
        .description{
          margin-bottom:10px;
          line-height:12px;
          font-size:12px;
          font-weight:200; /*这个也可以不写，因为font-weight是可以继承的，在html和body上写了*/
        }
        .support{
          margin-bottom:2px;
          .icon{
            display:inline-block;
            vertical-align:top;
            margin-right:4px;
            width:12px;
            height:12px;
            background-size:12px 12px;
            backgroudn-repeat:no-repeat;
            &.decrease{
              @include bg-image('decrease_1');
             }
            &.discount{
             @include bg-image('discount_1');
             }
            &.guarantee{
             @include bg-image('guarantee_1');
             }
            &.invoice{
             @include bg-image('invoice_1');
             }
            &.special{
             @include bg-image('special_1');
             }
          }
          .text{
            display:inline-block;
            margin-top:1px;
            line-height:12px;
            font-size:10px;
          }
        }
      }
      .support-count{
        position:absolute;
        right:12px;
        bottom:14px;
        padding: 0 8px;
        height:24px;
        line-height:24px;
        text-align:center;
        border-radius:14px;
        background:rgba(0,0,0,0.2);
        .count{
          vertical-align:top;  /*垂直属性只对行内元素有效*/
          font-size:10px;
        }
        .icon-keyboard_arrow_right{
          margin-left:2px;
          line-height:24px;
          font-size:10px;
        }
      }
    }
    .bulletin-wrapper{
      position:relative;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      height:28px;
      line-height:28px;
      padding:0 22px 0 12px;
      background:rgba(7,17,27,0.2);
      .bulletin-title{
        display:inline-block;
        vertical-align:top;
        margin-top:9px;
        width:22px;
        height:12px;
        @include bg-image('bulletin');
        background-size:22px 12px;
      }
      .bulletin-text{
        margin:0 4px;
        line-height:28px;
        font-size:10px;
      }
      .icon-keyboard_arrow_right{
        position:absolute;
        right:12px;
        top:10px;
        font-size:10px;
      }
    }
    .background{
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:-1;
      filter:blur(10px);/*通过bulr进行模糊处理*/
    }
    .detail{  /*A CSS Sticky Footer——CSS底部固定布局分析*/
      position:fixed;
      top:0;
      left:0;
      z-index:100;
      width:100%;
      height:100%;
      overflow:auto;
      background:rgba(1,17,27,0.8);
      .detail-wrapper{
        width:100%;
        min-height:100%; /*最小高度100%*/
        .detail-main{
          margin-top:64px;
          padding-bottom:64px; /*这个如果没有padding值的话，内容多的话就会被遮住*/
          .name{
            line-height:16px;
            text-align:center;
            font-size:16px;
            font-weight:700;
          }
          .star-wrapper{
            margin-top:18px;
            padding:2px 0;
            text-align:center;
          }
        }
      }
      .detail-close{
        position:relative;
        clear:both;
        margin:-64px auto 0 auto; /*通过top负值将差号放上来*/
        width:32px;
        height:32px;
        font-size:32px;
      }
    }
  }
</style>

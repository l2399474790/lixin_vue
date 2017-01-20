<template lang="html">
    <div class="star" v-bind:class="starType">  <!--不同的尺寸-->
      <span v-for="itemClass in itemClasses" v-bind:class="itemClass" class="star-item" track-by="$index"></span>
      <!--无track-by情况：数据修改时，无论值是否被修改，dom都被重新渲染（控制台可以看到）
加入track-by属性：数据修改时，不变数据所在的dom不被重新渲染，已改变的数据所在dom才被重新渲染-->
    </div>
</template>

<script type="text/ecmascript-6">
    const LENGTH = 5; // 通过设置变量修改时，只修改变量内容，下面就不修改了
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';
    export default {
        data: function () {
            return {};
        },
        props: {  // 通过父级接收尺寸和型号参数来确认星星最终展现的类型
          size: { // 尺寸
            type: Number
          },
          score: { // 分数
            type: Number
          }
        },
        computed: {
          starType() {
            return 'star-' + this.size;
          },
          itemClasses() {
            let result = [];
            let score = Math.floor(this.score * 2) / 2;  // 通过计算向下取0.5倍数的值
            let hasDecimal = score % 1 !== 0; // 检测计算出的分数是否有分数  (是否有半星)
            let integer = Math.floor(score); // （有多少全星）
            for (let i = 0; i < integer; i++) {
              result.push(CLS_ON); // 通过循环先把全星放上
            }
            if (hasDecimal) {
              result.push(CLS_HALF); // 通过判断看是否有半星，如果有的话就放入
            }
            while (result.length < LENGTH) {
              result.push(CLS_OFF);  // 如果前面没有达到5个性 后面补一定数量的空星
            }
            return result;
          }
        },
        components: {}
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/sass/min.scss';
  .star{
    font-size:0;
    .star-item{ /*设置单个星星公共样式*/
      display:inline-block;
      background-repeat:no-repeat;
    }
    &.star-48{ /*通过计算属性返回相应的值设置相应尺寸的class*/
      .star-item{
        width:20px;
        height:20px;
        margin-right:22px;
        background-size:20px 20px;
        &:last-child{
          margin-right:0;
        }
        &.on{ /*在特定尺寸的小星星里面 有三种状态 全星 半星 空星*/
          @include bg-image('star48_on');
        }
        &.half{
          @include bg-image('star48_half');
        }
        &.off{
          @include bg-image('star48_off');
        }
      }
    }
    &.star-36{
      .star-item{
        width:15px;  /*写相应尺寸的时候看的是2x的尺寸*/
        height:15px;
        margin-right:16px;
        background-size:15px 15px;
        &:last-child{
           margin-right:0;
         }
        &.on{ /*在特定尺寸的小星星里面 有三种状态 全星 半星 空星*/
         @include bg-image('star36_on');
         }
        &.half{
         @include bg-image('star36_half');
         }
        &.off{
         @include bg-image('star36_off');
         }
      }
    }
    &.star-24{
      .star-item{
        width:10px;
        height:10px;
        margin-right:3px;
        background-size:10px 10px;
        &:last-child{
           margin-right:0;
         }
        &.on{ /*在特定尺寸的小星星里面 有三种状态 全星 半星 空星*/
         @include bg-image('star24_on');
         }
        &.half{
         @include bg-image('star24_half');
         }
        &.off{
         @include bg-image('star24_off');
         }
      }
    }
  }
</style>

// 通过import引入相应的组件和css
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import './common/sass/index.scss';

Vue.use(VueRouter); // 装入vue-router插件
Vue.use(VueResource);
// 1.定义组件：可以直接写，也可以通过import引入
// 2.定义路由：每个路有应该映射一个组件，其中component可以通过Vue.extend()创建组件构建器或者是一个组件的配置对象
const routes = [
  {path: '/', component: goods},
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
];
// 3.。创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  linkActiveClass: 'active', // router-link的默认class值
  routes // （缩写）相当于 routes: routes
});

// 4. 创建和挂载根实例:记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
/* eslint-disable no-new */
new Vue({
  el: '#app', // 挂载到#app元素上
  template: '<App/>', // 下面注册了组件，要有地方使用组件
  components: {
    'App': App
  },
  router: router // router配置参数注入路由
});
// console.log(app, App);

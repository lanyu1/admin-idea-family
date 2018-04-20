import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow
// 所以只在生产中使用延迟加载

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');
const authRedirect = _import('login/authredirect');
const sendPWD = _import('login/sendpwd');
const reset = _import('login/reset');

/* components */
// const Tinymce = _import('components/tinymce');
// const Mixin = _import('components/mixin');

/* error page */
const Err404 = _import('error/404');
const Err401 = _import('error/401');


const PersonalInfo = _import('index/personalInfo');
const Readme = _import('index/readme');
/* example*/
const TableList = _import('example/tableList');

// 创意管理
const EventList = _import('event/eventList');
const EventSearch = _import('event/eventSearch');

// 评论管理
const CommentList = _import('comment/commentList');

// 消息管理
const NewsList = _import('news/newsList');

/* 小组管理*/
const TeamList = _import('team/teamList');
const TeamUpdate = _import('team/teamUpdate');



const Form = _import('example/form');
const Tinymce = _import('example/tinymce');
const Mixin = _import('example/mixin');

/* 系统管理*/
const PermissionsManage = _import('systemSet/permissionsManage');
Vue.use(Router);

 /**
  * icon : 菜单图标
  * hidden : true不显示在菜单栏
  * redirect : noredirect 为不重定向
  * noDropdown : true 不显示子菜单
  * meta : { role: ['admin'] }  will control the page role
  **/

const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/authredirect', component: authRedirect, hidden: true },
  { path: '/sendpwd', component: sendPWD, hidden: true },
  { path: '/reset', component: reset, hidden: true },
  { path: '/404', component: Err404, hidden: true },  //假地址时重定向
  { path: '/401', component: Err401, hidden: true },  //无权限时重定向

  {
    path: '/',
    //component: Layout,
    redirect: '/index/readme',  //重定向到默认首页
   
    hidden: true,
    
  },
  {
    path: '/index',
    component: Layout,
    redirect: 'noredirect',
    name: '',
    // icon: 'EXCEL',
    noDropdown: true,
    children: [
        { path: 'readme', component: Readme, name: '系统说明' },
        { path: 'personalInfo', component: PersonalInfo, name: '个人信息' }
    ]
  },
  
  

  {
    path: '/event',
    component: Layout,
    redirect: 'noredirect',
    name: '',
    // icon: 'EXCEL',
    noDropdown: true,
    children: [
        { path: 'eventList', component: EventList, name: '创意列表' },
        { path: 'eventSearch', component: EventSearch, name: '创意搜索' }
    ]
  },
  
  {
    path: '/errorpage',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    // icon: '404',
    children: [
      { path: '401', component: Err401, name: '401' },
      { path: '404', component: Err404, name: '404' }
    ]
  },
  {
    path: '/systemSet',
    component: Layout,
    redirect: 'noredirect',
    name: '系统设置',
    // icon: '404',
    children: [
      { path: 'permissionsManage', component: PermissionsManage, name: '权限管理' },
      
    ]
  },
  {
    path: '/teamManage',
    component: Layout,
    redirect: 'noredirect',
    name: '小组管理',
    // icon: '404',
    children: [
      { path: 'teamList', component: TeamList, name: '小组列表' },
      { path: 'teamUpdate', component: TeamUpdate, name: '小组修改' },
    ]
  },
  {
    path: '/comment',
    component: Layout,
    redirect: 'noredirect',
    name: '评论管理',
    // icon: '404',
    children: [
      { path: 'commentList', component: CommentList, name: '评论列表' },
    ]
  },
  {
    path: '/news',
    component: Layout,
    redirect: 'noredirect',
    name: '评论管理',
    // icon: '404',
    children: [
      { path: 'newsList', component: NewsList, name: '消息列表' },
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '综合实例',
    // icon: 'zonghe',
    children: [
      { path: 'tableList', component: TableList, name: '示例表格' },
      { path: 'form', component: Form, name: 'form表单编辑' },

      { path: 'tinymce', component: Tinymce, name: '富文本编辑器' },
      { path: 'mixin', component: Mixin, name: '小组件' },
      { path: '31', component: Form, name: '三级菜单1' },
    ]
  },
  // { path: '/', redirect: '/excel', hidden: true },
  { path: '*', redirect: '/404', hidden: true }
  

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: '首页',
  //   hidden: true,
  //   children: [{ path: 'dashboard', component: dashboard, name: '首页'  }]
  // },

  
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

// export const asyncRouterMap = [
  
// ];

<template>
    <div>
        <!-- 注意：路由表不能配置在后端，不然前端无法配置跳转到某些路由，例如提交成功后返回至某个固定路由 lss 2017-6-27 -->
        <!-- 菜单权限json（调试专用）：==={{ routes | json }} -->
        <template v-if="routes">
            <!-- 一级菜单 示例-->
           <!--  <router-link  to="/index/readme"  v-if="routes['/index/readme']" >
                <el-menu-item index="/index/readme">
                    <i class="el-icon-star-on" aria-hidden="true"></i> 系统说明
            
                </el-menu-item>
            </router-link> -->

            <router-link  to="/index/personalInfo"  v-if="routes['/index/personalInfo']" >
                <el-menu-item index="/index/personalInfo">
                    <i class="fa fa-home" aria-hidden="true"></i> 首页
            
                </el-menu-item>
            </router-link>
            <router-link  to="/event/eventList"  v-if="routes['/event/eventList']" >
                <el-menu-item index="/event/eventList">
                    <i class="fa fa-id-card" aria-hidden="true"></i> 创意管理
                </el-menu-item>
            </router-link>
            <router-link  to="/user/userList"  v-if="routes['/user/userList']" >
                <el-menu-item index="/user/userList">
                    <i class="fa fa-users" aria-hidden="true"></i> 用户管理
                </el-menu-item>
            </router-link>
            <router-link  to="/comment/commentList"  v-if="routes['/comment/commentList']" >
                <el-menu-item index="/comment/commentList">
                    <i class="fa fa-comments" aria-hidden="true"></i> 评论管理
                </el-menu-item>
            </router-link>
              <router-link  to="/schedule/scheduleList"  v-if="routes['/schedule/scheduleList']" >
                <el-menu-item index="/schedule/scheduleList">
                    <i class="fa fa-calendar" aria-hidden="true"></i> 日程管理
                </el-menu-item>
            </router-link>
            <router-link  to="/question/questionList"  v-if="routes['/question/questionList']" >
                <el-menu-item index="/question/questionList">
                    <i class="fa fa-question-circle" aria-hidden="true"></i> 问题墙管理
                </el-menu-item>
            </router-link>
             <router-link  to="/reply/replyList"  v-if="routes['/reply/replyList']" >
                <el-menu-item index="/reply/replyList">
                    <i class="fa fa-comment" aria-hidden="true"></i> 消息回复管理
                </el-menu-item>
            </router-link>
             <el-submenu index="小组管理" v-if="routes['/teamManage/teamList'] || routes['/teamManage/teammateList']"> 
                <template slot="title">
                    <i class="fa fa-object-group" aria-hidden="true"></i> 小组管理
                </template>
              
                    <router-link  class="menu-indent" to="/teamManage/teamList" v-if="routes['/teamManage/teamList']">
                        <el-menu-item index="/teamManage/teamList">
                            <i class="fa fa-object-ungroup" aria-hidden="true"></i> 小组管理
                        </el-menu-item>
                    </router-link>
                    <router-link  class="menu-indent" to="/teamManage/teammateList" v-if="routes['/teamManage/teammateList']">
                        <el-menu-item index="/teamManage/teammateList">
                           <i class="fa fa-object-ungroup" aria-hidden="true"></i> 组员管理
                        </el-menu-item>
                    </router-link>
            </el-submenu>
            
            <!-- 二级菜单 示例-->
            <!-- <el-submenu index="错误页面" v-if="routes['/errorpage/401'] || routes['/errorpage/404']">
                <template slot="title">
                    <i class="fa fa-bug" aria-hidden="true"></i> 错误页面
                </template>
              
                    <router-link  class="menu-indent" to="/errorpage/401" v-if="routes['/errorpage/401']">
                        <el-menu-item index="/errorpage/401">
                            401
                        </el-menu-item>
                    </router-link>
                    <router-link  class="menu-indent" to="/errorpage/404" v-if="routes['/errorpage/404']">
                        <el-menu-item index="/errorpage/404">
                            404
                        </el-menu-item>
                    </router-link>
               
            </el-submenu>
            
            三级菜单 示例
            <el-submenu index="综合实例" v-if="routes['/example/form'] || routes['/example/tinymce'] || routes['/example/mixin'] ">
                <template slot="title">
                    <i class="fa fa-envelope-open-o" aria-hidden="true"></i> 综合实例
                </template>
                    <router-link  class="menu-indent" to="/example/form" v-if="routes['/example/form'] ">
                        <el-menu-item index="/example/form">
                            form表单编辑
                        </el-menu-item>
                    </router-link>
                   
                    <router-link  class="menu-indent" to="/example/tinymce" v-if="routes['/example/tinymce']">
                        <el-menu-item index="/example/tinymce">
                            富文本编辑器
                        </el-menu-item>
                    </router-link>
                    <router-link  class="menu-indent" to="/example/mixin"   v-if="routes['/example/mixin']">
                        <el-menu-item index="/example/mixin">
                            小组件
                        </el-menu-item>
                    </router-link>
                    
                    三级菜单 
                    <el-submenu index="table内编辑" >
                        <template slot="title">
                           第二级菜单
                        </template>
                        
                            <router-link  class="menu-indent" to="/example/31" >
                                <el-menu-item index="/example/31">
                                    没权限重定向401
                                </el-menu-item>
                            </router-link>
                             <router-link  class="menu-indent" to="/example/table2" >
                                <el-menu-item index="/example/table2">
                                    地址错误跳404
                                </el-menu-item>
                            </router-link>


                       
                    </el-submenu>

            </el-submenu> -->

            <el-submenu index="系统设置" v-if="routes['/systemSet/permissionsManage'] || routes['/systemSet/loginLog']"> 
                <template slot="title">
                    <i class="fa fa-cogs fa-fw" aria-hidden="true"></i> 系统设置
                </template>
              
                    <router-link  class="menu-indent" to="/systemSet/permissionsManage" v-if="routes['/systemSet/permissionsManage']">
                        <el-menu-item index="/systemSet/permissionsManage">
                            权限管理
                        </el-menu-item>
                    </router-link>
                    <router-link  class="menu-indent" to="/systemSet/loginLog" v-if="routes['/systemSet/loginLog']">
                        <el-menu-item index="/systemSet/loginLog">
                            登录日志
                        </el-menu-item>
                    </router-link>
               
            </el-submenu>
        </template>    
        

    </div>
</template>

<script>
//获取vuex中的菜单权限 进行菜单show展示。登陆成功时直接 返回菜单json 并包含帐户信息
export default {
  name: "SidebarItem",
  props: {
    routes: {
      // type: Array
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-icon {
  margin-right: 10px;
}
.fa {
  margin-right: 10px;
}
.hideSidebar .menu-indent {
  display: block;
  text-indent: 10px;
}
</style>


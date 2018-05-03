<template>
  <div class="app-container">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="搜索列表" v-model="listQuery.searchContent">
      </el-input>

     

      <!-- <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="类型">
        <el-option v-for="item in  typeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select> -->

        <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" @click="handleCreate"  icon="plus">新增用户</el-button>
      <el-button class="filter-item" type="primary" @click="clickEditButton"  icon="edit">编辑用户</el-button>

      <el-button class="filter-item" type="primary" @click="handleDelete"  icon="delete">删除用户</el-button>
     
    </div>

    
   
    <!-- 表格 -->
    <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="userList" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row  >
         <el-table-column type="selection" width="65">
         </el-table-column>

          <el-table-column align="center" label='序号' width="100" sortable>
            <template scope="scope">
              {{scope.row.id}}
            </template>
          </el-table-column>

          <el-table-column label="昵称" width="" prop="title" align="center" sortable>
            <template scope="scope">
              {{scope.row.nikeName}}
            </template>
          </el-table-column>

          <el-table-column label="电话" width="" prop="type" align="center">
            <template scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" width="" prop="type" align="center">
            <template scope="scope">
              <span>{{scope.row.email}}</span>
            </template>
          </el-table-column>
          <el-table-column label="头像"   align="center" prop="headPhoto">
            <template scope="scope">
            <img v-lazy="'/static/image/'+scope.row.headPhoto" style="width:80px;height:50px;">
              
            </template>
          </el-table-column>
       <!--   <el-table-column align="center" prop="province" label="省份" width="">
            <template scope="scope">
               <i class="el-icon-time"></i> 
              <span>{{scope.row.province}}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" prop="city" label="城市" width="">
            <template scope="scope">
              <!-- <i class="el-icon-time"></i> -->
              <span>{{scope.row.area}}</span>
            </template>
          </el-table-column>
         <el-table-column align="center" prop="city" label="特长" width="">
            <template scope="scope">
              <!-- <i class="el-icon-time"></i> -->
              <span>{{scope.row.specialty}}</span>
            </template>
          </el-table-column>
        <el-table-column align="center" prop="city" label="描述" width="">
            <template scope="scope">
              <!-- <i class="el-icon-time"></i> -->
              <span>{{scope.row.description}}</span>
            </template>
          </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.currPage"
        :page-sizes="[5,10,15,20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
          <el-form class="small-space" :model="temp" label-position="left" label-width="80px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="用户昵称" required>
              <el-input v-model="temp.nikeName" style="width: 95%;"></el-input>
            </el-form-item>
           <el-form-item label="用户密码" required>
              <el-input v-model="temp.password" style="width: 95%;" type="password"></el-input>
            </el-form-item>
            <el-form-item label="用户电话" required>
              <el-input v-model="temp.phone" style="width: 95%;"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" required>
              <el-input v-model="temp.email" style="width: 95%;"></el-input>
            </el-form-item>
         <el-form-item label="区域选择" style="width: 100%;" required>
                <el-select v-model="temp.area" placeholder="请选择区域"  style="width: 95%;">
                  <el-option label="上海" value="北京"></el-option>
                  <el-option label="北京" value="上海"></el-option>
                  <el-option label="杭州" value="杭州"></el-option>
                </el-select>
        </el-form-item>
      <el-form-item  label="头像上传" required>
      <el-upload
        class="upload-demo"
        action="http://localhost:9090/upload/img"
        :on-preview="handlePreview"
        :on-success="successHandle"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
      </el-form-item>
         <el-form-item label="特长" required style="width: 100%;">
         <el-select v-model="temp.specialty" placeholder="请选择类型"  style="width: 95%;">
                  <el-option label="看书" value="看书"></el-option>
                  <el-option label="打球" value="打球"></el-option>
                  <el-option label="听音乐" value="听音乐"></el-option>
                  <el-option label="跑步" value="跑步"></el-option>
                </el-select>
      </el-form-item>
            <el-form-item label="描述" required>
               <el-input type="textarea" v-model="temp.description"  style="width: 95%;"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
           
            <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
          </div>
    </el-dialog>
     <!-- 编辑弹窗 -->
    <el-dialog title="编辑" :visible.sync="dialogFormEdit">
         <el-form class="small-space" :model="temp" label-position="left" label-width="80px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="用户昵称" required>
              <el-input v-model="temp.nikeName" style="width: 95%;"></el-input>
            </el-form-item>
           <el-form-item label="用户密码" required>
              <el-input v-model="temp.password" style="width: 95%;" type="password"></el-input>
            </el-form-item>
            <el-form-item label="用户电话" required>
              <el-input v-model="temp.phone" style="width: 95%;"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" required>
              <el-input v-model="temp.email" style="width: 95%;"></el-input>
            </el-form-item>
         <el-form-item label="区域选择" style="width: 100%;" required>
                <el-select v-model="temp.area" placeholder="请选择区域"  style="width: 95%;">
                  <el-option label="上海" value="北京"></el-option>
                  <el-option label="北京" value="上海"></el-option>
                  <el-option label="杭州" value="杭州"></el-option>
                </el-select>
        </el-form-item>
      <el-form-item  label="头像上传" required>
      <el-upload
        class="upload-demo"
        action="http://localhost:9090/upload/img"
        :on-preview="handlePreview"
        :on-success="successHandle"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
      </el-form-item>
         <el-form-item label="特长" required style="width: 100%;">
         <el-select v-model="temp.specialty" placeholder="请选择类型"  style="width: 95%;">
                  <el-option label="看书" value="看书"></el-option>
                  <el-option label="打球" value="打球"></el-option>
                  <el-option label="听音乐" value="听音乐"></el-option>
                  <el-option label="跑步" value="跑步"></el-option>
                </el-select>
      </el-form-item>
            <el-form-item label="描述" required>
               <el-input type="textarea" v-model="temp.description"  style="width: 95%;"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormEdit = false">取 消</el-button>
           
            <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
          </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getList } from 'api/article';
import {global} from 'src/global/global';
import {api} from 'src/global/api';
import axios from 'axios';
import { Message } from 'element-ui';

export default {
  data() {
    return {
        fileName:'',
        fileList:[],
        type:'',
        userList: null,//表格list [].push({})
        searchContent:null,
        typeContent:null,
        total: null,
        listLoading: true,
        listQuery: {
            currPage: 1,
            pageSize: 5,

            // importance: undefined,
            title: '',
            type: null,//类型
               
        },
        temp: {
          "id":"",
          "nikeName":"",
          "email": "",
          "phone": "",
          "password":"",
          "specialty": "",
          "area":'',
          "headPhoto":"",
          "description": "",
          "orderNum": 10
        },
        dialogFormVisible: false,
        dialogFormEdit:false,
        multipleSelection: []

    }
  },
  mounted() {
    let vm = this;
    vm.getList();
  },
  methods: {

    initTemp(){
      let vm = this;

      vm.temp = {
           "id":"",
          "nikeName":"",
          "email": "",
          "phone": "",
          "password":"",
          "specialty": "",
          "area":'',
          "headPhoto":"",
          "description": "",
          "orderNum": 10
      }
    },
    //获取列表数据
    getList() {
          let vm = this;
          vm.listLoading = true;
           let par = {
              "pageSize":vm.listQuery.pageSize,
              "page":vm.listQuery.currPage,
            };
       axios.get("http://localhost:9090/user/selectUsers",{params:par}).then(result => {
        let res = result.data;
        console.log(res);
        this.userList = res.list;
        vm.listLoading=false;
      });

    },
    clickEditButton(){
      //this.handleSelectionChange(val);
     // alert(this.multipleSelection);
     let vm = this;
      console.log(this.multipleSelection);
      if(this.multipleSelection.length==1){
         this.dialogFormEdit = true;
         this.fileList=[{
           name:this.multipleSelection[0].headPhoto,
           url:'localhost:2018/'
         }]

        // vm.temp.typecontent = this.multipleSelection[0].eventType.typecontent;
         //vm.temp.type = this.multipleSelection[0].type;
         //vm.temp.founderid = this.multipleSelection[0].founderid;
         vm.temp.nikeName = this.multipleSelection[0].nikeName;
         vm.temp.area = this.multipleSelection[0].area;
         vm.temp.email = this.multipleSelection[0].email;
         vm.temp.password = this.multipleSelection[0].password;
         vm.temp.headPhoto = this.multipleSelection[0].headPhoto;
          vm.temp.phone = this.multipleSelection[0].phone;
          vm.temp.specialty =this.multipleSelection[0].specialty;
         vm.temp.description = this.multipleSelection[0].description;
         vm.temp.id = this.multipleSelection[0].id;
      }else if(this.multipleSelection.length>1){
        vm.$message({
          type:'warning',
          center:true,
          message:"只能选中一条需要编辑的数据"
        });
      } else{
        vm.$message({
          type:'warning',
          center:true,
          message:"请选择需要编辑的数据"
        });
      }
    },
    //编辑
    handleEditSubmit(){
        let vm = this;
        console.log('编辑修改后的数据',vm.temp);
        axios.put('http://localhost:9090/user/updateUser',{ 
          id:vm.temp.id,
          nikeName:vm.temp.nikeName,
          area:vm.temp.area,
          email:vm.temp.email,
          headPhoto:this.fileName,
          password:vm.temp.password,
          phone:vm.temp.phone,
          description:vm.temp.description,
          specialty:vm.temp.specialty
        },{
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then((res)=>{
             //重新加载数据
             this.dialogFormEdit = false;
             vm.$message({
                type:'success',
                center:true,
               message:"修改成功"
        });
             this.getList();

             
        })
    },
    //删除创意信息
    handleDelete(){
        let vm = this;
      if(this.multipleSelection.length==1){
        var param={
          id :vm.multipleSelection[0].id
        }
         this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
           axios.delete("http://localhost:9090/user/deleteUser",{params:param}).then(result =>{
             this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList();
      })
        }).catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });          
        });

      }else if(this.multipleSelection.length>1){
       vm.$message({
          type:'warning',
          center:true,
          message:"只能选中一条需要编辑的数据"
        });
      } else{
        vm.$message({
          type:'warning',
          center:true,
          message:"请选择需要编辑的数据"
        });
      }
    },
    //搜索
    handleFilter() {
       this.searchEventList();
    },
    //模糊查询创意
    searchEventList(){
          let vm = this;
          vm.listLoading = true;
           let par = {
              searchContent:vm.listQuery.searchContent,
              "pageSize":vm.listQuery.pageSize,
              "page":vm.listQuery.currPage,
            };
         axios.get("http://localhost:9090/user/selectUsers",{params:par}).then(result => {
        let res = result.data;
        console.log(res);
        this.userList = res.list;
        vm.listLoading=false;
      });
    },
    //操作分页
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    //操作分页
    handleCurrentChange(val) {
        console.log('--------',val)
      this.listQuery.currPage = val;
      this.getList();
    },
    //新增
    handleCreate() {
        //每次点击新增时 重置下新增表单数据，避免双向绑定的影响
        this.initTemp();

        this.dialogFormVisible = true;
    },
    //头像上传相关函数
      handleRemove(file) {
        console.log(file);
      },
      handlePreview(file) {
        console.log(file);
      },
      successHandle(res,file){
        this.fileName = res;
        console.log(this.fileName);
      },
    //新增提交
    handleCreateSubmit(){
        console.log(this.fileName);
        let vm = this;
        vm.temp.headPhoto=this.fileName;
        console.log('新增入参：',vm.temp);
           //新增接口
           axios.post('http://localhost:9090/user/addUser',JSON.stringify(vm.temp),{
           headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
           }).then((res)=>{
             //重新加载数据
             this.getList();
              vm.$message({
                type:'success',
                center:true,
               message:"添加成功"
        });
        }); 
        this.dialogFormVisible = false;
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },

    // handleDownload() {
    //   let vm = this;

    //   require.ensure([], () => {
    //     const { export_json_to_excel } = require('vendor/Export2Excel');
    //     const tHeader = ['字段1', '字段2', '字段3', '字段4', '字段5'];
    //     const filterVal = ['chnlId', 'hisChnlId', 'chnlName', 'state', 'isavailable'];
    //     const list = vm.list;
    //     const data = vm.formatJson(filterVal, list);
    //     export_json_to_excel(tHeader, data, '导出的列表excel');
    //   })
    // },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
};
</script>

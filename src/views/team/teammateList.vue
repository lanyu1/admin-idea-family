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
      <el-button class="filter-item" type="primary" @click="handleCreate"  icon="plus">新增组员</el-button>
      <!-- <el-button class="filter-item" type="primary" @click="clickEditButton"  icon="edit">编辑组员信息</el-button> -->
      <el-button class="filter-item" type="primary" @click="handleDelete"  icon="delete">删除该组员</el-button>
     
    </div>

    
   
    <!-- 表格 -->
    <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="teammateList" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row  >
         <el-table-column type="selection" width="65">
         </el-table-column>

          <el-table-column align="center" label='序号' width="">
            <template scope="scope">
              {{scope.row.id}} 
            </template>
          </el-table-column>

          <el-table-column label="小组名" width="" align="center" >
            <template scope="scope" >
              {{scope.row.teamName}}
            </template>
          </el-table-column>

          <el-table-column label="创建者" width="" align="center" >
            <template scope="scope">
              {{scope.row.founderName}}
            </template>
          </el-table-column>
          <el-table-column label="角色"  align="center" width="">
            <template scope="scope" prop="authority" :formatter="formatLevel(scope.row.authority)">
              {{formatLevel(scope.row.authority)}}      
            </template>
          </el-table-column>
          <el-table-column label="职责" width="" align="center" >
            <template scope="scope">
              {{scope.row.duty}}
            </template>
          </el-table-column>
            <el-table-column align="center"  label="组员名称" >
                <template scope="scope">
                  <!-- <i class="el-icon-time"></i> -->
                  <span>{{scope.row.nikeName}}</span>
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
    <el-dialog title="新增小组" :visible.sync="dialogFormAddTeam">
          <el-form class="small-space" :model="temp" label-position="left" label-width="80px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="小组名称" required>
              <el-input v-model="temp.teamName" style="width: 95%;"></el-input>
            </el-form-item>
            <el-form-item label="创建者" required>
              <el-input v-model="temp.founderName" style="width: 95%;"></el-input>
            </el-form-item>
            <el-form-item label="角色" required>
                <el-select v-model="temp.authority" prop="authority" placeholder="请选择角色"  style="width: 95%;">
                  <el-option  v-for="item in groupList" :key="item.authority" :label="item.label" :value="item.authority"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="组员名称" required>
              <el-select v-model="temp.teammateid" placeholder="请选择组员"  style="width: 95%;">
                  <el-option  v-for="item in usernameList" :key="item.id" :label="item.nikeName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限" required>
               <el-input type="textarea" v-model="temp.duty"  style="width: 95%;"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
           
            <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
          </div>
    </el-dialog>
     <!-- 编辑弹窗 -->
    <el-dialog title="编辑组员信息" :visible.sync="dialogFormEditTeam">
            <el-form class="small-space" :model="temp" label-position="left" label-width="80px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="小组名称" required>
              <el-input v-model="temp.teamName" style="width: 95%;"></el-input>
            </el-form-item>
            <el-form-item label="创建者" required>
              <el-input v-model="temp.founderName" style="width: 95%;"></el-input>
            </el-form-item>
            <el-form-item label="角色" required>
                <el-select v-model="temp.authority" prop="authority" placeholder="请选择角色"  style="width: 95%;">
                  <el-option  v-for="item in groupList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="组员名称" required>
              <el-select v-model="temp.teammateid" placeholder="请选择组员"  style="width: 95%;">
                  <el-option  v-for="item in usernameList" :key="item.id" :label="item.nikeName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限" required>
               <el-input type="textarea" v-model="temp.duty"  style="width: 95%;"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
           
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

export default {
  data() {
    return {
        // list: null,
        // listLoading: true,
        usernameList:[],
        teammateList:[],
        list: null,//表格list [].push({})
        total: null,
        listLoading: true,
        listQuery: {
            currPage: 1,
            pageSize: 5,
            searchContent:'',
               
        },
        groupList:[{
           label: '组员',
           authority: '0'
        },
        {
           label: '组长',
           authority: '1'
        }],
         temp:{
          "tid":"",
          "teamid":"",
          "founderName":"",
          "teamName": "",
          "authority": "",
          "duty":"",
          "teammateid": "",
          "orderNum": 10
      },
        typeOptions:[
          { key: '001', display_name: '类型1' },
          { key: '002', display_name: '类型2' },
          { key: '003', display_name: '类型3' }
         
        ],
        dialogFormAddTeam: false,
        dialogFormEditTeam:false,
        multipleSelection: []

    }
  },
  mounted() {
    let vm = this;
     
    vm.getList();
    vm.initUserName();
  },
  methods: {
    formatLevel(val){
      return val===1?'组长':'组员';
    },
    initTemp(){
      let vm = this;

      vm.temp = {
          "tid":"",
          "teamid":"",
          "founderName":"",
          "teamName": "",
          "authority": "",
          "duty":"",
          "teammateid": "",
          "orderNum": 10
      }
    },
     initUserName(){
      axios.get("http://localhost:9090/user/getUsers").then(result => {
        let res = result.data;
        this.usernameList = res;
        console.log(this.usernameList);
      });
    },
    //获取列表数据
    getList() {
   let vm = this;
          vm.listLoading = true;
           let par = {
              "pageSize":vm.listQuery.pageSize,
              "page":vm.listQuery.currPage,
            };
       axios.get("http://localhost:9090/teammate/selectTeamList",{params:par}).then(result => {
        let res = result.data;
        console.log(res);
        this.teammateList = res.list;
        vm.listLoading=false;
      });
    },


clickEditButton(){
      let vm = this;
      if(this.multipleSelection.length==1){
        this.dialogFormEditTeam = true;
         //vm.temp.type = this.multipleSelection[0].type;
         vm.temp.teamName = this.multipleSelection[0].teamName;
         vm.temp.founderName = this.multipleSelection[0].founderName;
         vm.temp.authority =this.formatLevel(this.multipleSelection[0].authority);
          vm.temp.teammateid = this.multipleSelection[0].teammateid;
         vm.temp.duty = this.multipleSelection[0].duty;
         vm.temp.tid = this.multipleSelection[0].tid;
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
        axios.put('http://localhost:9090/teammate/updateTeammate',{ 
          tid:vm.temp.tid,
          founderName:vm.temp.founderName,
          teamName:vm.temp.teamName,
          duty:vm.temp.duty,
          teammateid:vm.temp.teammateid
        },{
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then((res)=>{
             //重新加载数据
             this.dialogFormEditTeam = false;
             vm.$message({
                type:'success',
                center:true,
               message:"修改成功"
        });
             this.getList();   
        })
    },

    //单个删除
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
           axios.delete("http://localhost:9090/teammate/deleteTeammate",{params:param}).then(result =>{
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
      this.searchTeamList();
    },
    searchTeamList(){
          let vm = this;
          vm.listLoading = true;
           let par = {
              searchContent:vm.listQuery.searchContent,
              "pageSize":vm.listQuery.pageSize,
              "page":vm.listQuery.currPage,
            };
         axios.get("http://localhost:9090/teammate/selectTeamList",{params:par}).then(result => {
        let res = result.data;
        console.log(res);
        this.teamList = res.list;
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
      let vm= this;
        //每次点击新增时 重置下新增表单数据，避免双向绑定的影响
        if(this.multipleSelection.length==1){
            this.initTemp();
            this.dialogFormAddTeam = true;
             vm.temp.teamName = this.multipleSelection[0].teamName;
        vm.temp.founderName = this.multipleSelection[0].founderName;
        }else if(this.multipleSelection.length>1){
       vm.$message({
          type:'warning',
          center:true,
          message:"选中了多条需要新增的数据，请选择其中一条"
        });
      } else{
        vm.$message({
          type:'warning',
          center:true,
          message:"选择给某个小组添加组员"
        });
      }
         
    },
    //新增提交
    handleCreateSubmit(){
        let vm = this;
        console.log('新增入参：',vm.temp);
        vm.temp.teamid = this.multipleSelection[0].teamId;
           //新增接口
           axios.post('http://localhost:9090/teammate/addTeammate',JSON.stringify(vm.temp),{
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
        this.dialogFormAddTeam = false;
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },

    handleDownload() {
      let vm = this;

      require.ensure([], () => {
        const { export_json_to_excel } = require('vendor/Export2Excel');
        const tHeader = ['字段1', '字段2', '字段3', '字段4', '字段5'];
        const filterVal = ['chnlId', 'hisChnlId', 'chnlName', 'state', 'isavailable'];
        const list = vm.list;
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '导出的列表excel');
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
};
</script>

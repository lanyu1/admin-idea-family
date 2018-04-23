<template>
<div class="app-container">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="搜索创意" v-model="listQuery.title">
      </el-input> 
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="创意类型">
        <el-option v-for="item in  typeOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" @click="handleCreate"  icon="edit">新增创意</el-button>
      <el-button class="filter-item" type="primary" @click="clickEditButton"  icon="edit">编辑创意</el-button>

      <el-button class="filter-item" type="primary" @click="handleDelete"  icon="edit">删除创意</el-button>
      <!-- <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button> -->
     
    </div>

    
   
    <!-- 表格 -->
    <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="eventList" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row  >
         <el-table-column type="selection" width="65">
         </el-table-column>

          <el-table-column align="center" label='序号' width="100" sortable>
            <template scope="scope">
              {{scope.row.id}}
            </template>
          </el-table-column>

          <el-table-column label="标题" width="" prop="title" align="center" sortable>
            <template scope="scope">
              {{scope.row.title}}
            </template>
          </el-table-column>

          <el-table-column label="类型" width="" prop="type" align="center">
            <template scope="scope">
              <span>{{scope.row.eventType.typecontent}}</span>
            </template>
          </el-table-column>

          <el-table-column label="图片"   align="center" prop="photoname">
            <template scope="scope">
            <img v-lazy="'/static/image/'+scope.row.photoname" style="width:80px;height:50px;">
              
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
              <span>{{scope.row.city}}</span>
            </template>
          </el-table-column>
            <el-table-column align="center"  label="创建时间"  prpp="createtime">
                <template scope="scope">
                   <i class="el-icon-time"></i> 
                  <span>{{scope.row.createtime}}</span>
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
    <el-dialog title="新增创意" :visible.sync="dialogFormVisible">
          <el-form class="small-space" :model="temp" label-position="left" label-width="80px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="创意标题" required>
              <el-input v-model="temp.title" style="width: 95%;"></el-input>
            </el-form-item>
         <el-form-item label="区域选择" style="width: 100%;" required>
                <el-select v-model="temp.city" placeholder="请选择区域"  style="width: 95%;">
                  <el-option label="上海" value="北京"></el-option>
                  <el-option label="北京" value="上海"></el-option>
                  <el-option label="杭州" value="杭州"></el-option>
                </el-select>
        </el-form-item>
        <el-form-item label="创建时间" required>
          <el-form-item >
             <el-date-picker v-model="temp.createtime" type="date" placeholder="请选择日期" style="width: 95%;">
    </el-date-picker>
          </el-form-item>
      </el-form-item>
          <el-form-item label="类型" required style="width: 100%;">
            <el-radio-group v-model="temp.type" placeholder="请选择类型"  style="width: 95%;">
             <el-radio label="1">民宿</el-radio>
             <el-radio label="2">餐饮</el-radio>
             <el-radio label="3">农业</el-radio>
             <el-radio label="4">休闲</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item  label="图片上传" required>
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
            <el-form-item label="创意描述" required>
               <el-input type="textarea" v-model="temp.instruction"  style="width: 95%;"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
           
            <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
          </div>
    </el-dialog>
     <!-- 编辑弹窗 -->
    <el-dialog title="编辑创意" :visible.sync="dialogFormEdit">
          <el-form class="small-space" :model="temp" label-position="left" label-width="80px" style='width: 400px; margin-left:50px;'>
            <el-form-item label="创意标题" required>
              <el-input v-model="temp.title" style="width: 95%;"></el-input>
            </el-form-item>
         <el-form-item label="区域选择" style="width: 100%;" required>
                <el-select v-model="temp.city" placeholder="请选择区域"  style="width: 95%;">
                  <el-option label="上海" value="北京"></el-option>
                  <el-option label="北京" value="上海"></el-option>
                  <el-option label="杭州" value="杭州"></el-option>
                </el-select>
        </el-form-item>
        <el-form-item label="创建时间" required>
          <el-form-item >
            <el-date-picker type="date" placeholder="请选择日期" v-model="temp.createtime" style="width: 95%;"></el-date-picker>
          </el-form-item>
      </el-form-item>
           <el-form-item label="类型" required style="width: 100%;">
         <el-select v-model="temp.typecontent" placeholder="请选择类型"  style="width: 95%;">
                  <el-option label="民宿" value="民宿"></el-option>
                  <el-option label="餐饮" value="餐饮"></el-option>
                  <el-option label="农业" value="农业"></el-option>
                  <el-option label="休闲" value="休闲"></el-option>
                </el-select>
      </el-form-item>
      <el-form-item label="图片" required>
      <el-upload
        class="upload-demo"
        action="http://localhost:9090/upload/img"
        :on-preview="handlePreview"
        :on-success="successHandle"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture" style="width: 95%;">
      <el-button size="small" type="primary">修改图片</el-button>
</el-upload>
      </el-form-item>
            <el-form-item label="创意描述" required>
               <el-input type="textarea" v-model="temp.instruction"  style="width: 95%;"></el-input>
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
        eventList: null,//表格list [].push({})
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
          "founderid":"",
          "title": "",
          "city": "",
          "createtime": "",
          "type":'',
          "typecontent": "",
          "photoname":"",
          "instruction": "",
          "orderNum": 10
        },
        typeOptions:[
          { key: '民宿', display_name: '民宿' },
          { key: '餐饮', display_name: '餐饮' },
          { key: '农业', display_name: '农业' },
           { key: '休闲', display_name: '休闲' }
         
        ],
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
        "founderid":"",
          "title": "",
          "city": "",
          "createtime": "",
          "type":'',
          "typecontent": "",
           "photoname":"",
          "instruction": "",
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
       axios.get("http://localhost:9090/event/getEventsByTime",{params:par}).then(result => {
        let res = result.data;
        console.log(res);
        this.eventList = res.list;
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
           name:this.multipleSelection[0].photoname,
           url:'localhost:2018/'
         }]

         vm.temp.typecontent = this.multipleSelection[0].eventType.typecontent;
         //vm.temp.type = this.multipleSelection[0].type;
         vm.temp.founderid = this.multipleSelection[0].founderid;
         vm.temp.title = this.multipleSelection[0].title;
         vm.temp.city = this.multipleSelection[0].city;
         vm.temp.createtime = this.multipleSelection[0].createtime;
         vm.temp.instruction = this.multipleSelection[0].instruction;
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
        axios.put('http://localhost:9090/event/updateEvent',{ 
          id:vm.temp.id,
          founderid:vm.temp.founderid,
          title:vm.temp.title,
          city:vm.temp.city,
          photoname:this.fileName,
          createtime:vm.temp.createtime,
          instruction:vm.temp.instruction
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
          eid :vm.multipleSelection[0].id
        }
        axios.delete("http://localhost:9090/event/deleteEvent",{params:param}).then(result => { 
          vm.$message({
                type:'success',
                center:true,
               message:"删除成功"
        });
          this.getList();
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
              searchContent:vm.listQuery.title,
              typeContent:vm.listQuery.type,
              "pageSize":vm.listQuery.pageSize,
              "page":vm.listQuery.currPage,
            };
         axios.get("http://localhost:9090/event/getSearchEvents",{params:par}).then(result => {
        let res = result.data;
        console.log(res);
        this.eventList = res.list;
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
        vm.temp.photoname=this.fileName;
        console.log('新增入参：',vm.temp)
        vm.temp.founderid = 1;
           //新增接口
           axios.post('http://localhost:9090/event/addEvent',JSON.stringify(vm.temp),{
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
        })
        , 
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

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
      <el-button class="filter-item" type="primary" @click="handleDelete"  icon="delete">删除评论</el-button>
     
    </div>

    
   
    <!-- 表格 -->
    <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="commentList" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row  >
         <el-table-column type="selection" width="65">
         </el-table-column>

          <el-table-column align="center" label='序号' width="">
            <template scope="scope">
              {{scope.row.id}} 
            </template>
          </el-table-column>

          <el-table-column label="创意标题" width="" align="center" >
            <template scope="scope">
              {{scope.row.title}}
            </template>
          </el-table-column>

          <el-table-column label="评论者" width="" align="center" >
            <template scope="scope">
              {{scope.row.userName}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="评论内容" width="">
            <template scope="scope">
              {{scope.row.content}} 
            </template>
          </el-table-column>

            <el-table-column align="center"  label="评论时间" >
                <template scope="scope">
                   <i class="el-icon-time"></i>
                  <span>{{getFormatDate(scope.row.commentTime)}}</span>
                </template>
            </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.currPage"
        :page-sizes="[5,10,15,20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
   
  </div>
</template>

<script>
// import { getList } from 'api/article';
import { global } from "src/global/global";
import { api } from "src/global/api";
import axios from "axios";

export default {
  data() {
    return {
      // list: null,
      // listLoading: true,
      commentList: [],
      list: null, //表格list [].push({})
      total: null,
      listLoading: true,
      listQuery: {
        currPage: 1,
        pageSize: 5,
        searchContent: ""
      },
      temp: {
        id: "",
        founderid: "",
        teamname: "",
        createtime: "",
        notice: "",
        photoname: "",
        description: "",
        orderNum: 10
      },
      typeOptions: [
        { key: "001", display_name: "类型1" },
        { key: "002", display_name: "类型2" },
        { key: "003", display_name: "类型3" }
      ],
      dialogFormAddTeam: false,
      dialogFormEditTeam: false,
      multipleSelection: []
    };
  },
  mounted() {
    let vm = this;

    vm.getList();
    vm.initUserName();
  },
  methods: {
    initTemp() {
      let vm = this;

      vm.temp = {
        id: "",
        founderid: "",
        teamname: "",
        createtime: "",
        notice: "",
        photoname: "",
        description: "",
        orderNum: 10
      };
    },
    initUserName() {
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
        pageSize: vm.listQuery.pageSize,
        page: vm.listQuery.currPage
      };
      axios
        .get("http://localhost:9090/comment/selectComments", { params: par })
        .then(result => {
          let res = result.data;
          console.log(res);
          this.commentList = res.list;
          vm.listLoading = false;
        });
    },
    //单个删除
    handleDelete() {
      let vm = this;
      if (this.multipleSelection.length == 1) {
        var param = {
          id: vm.multipleSelection[0].id
        };
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios
              .delete("http://localhost:9090/comment/deleteComment", {
                params: param
              })
              .then(result => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList();
              });
          })
          .catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });
          });
      } else if (this.multipleSelection.length > 1) {
        vm.$message({
          type: "warning",
          center: true,
          message: "只能选中一条需要删除的数据"
        });
      } else {
        vm.$message({
          type: "warning",
          center: true,
          message: "请选择需要删除的数据"
        });
      }
    },
    //搜索
    handleFilter() {
      this.searchTeamList();
    },
    searchTeamList() {
      let vm = this;
      vm.listLoading = true;
      let par = {
        searchContent: vm.listQuery.searchContent,
        pageSize: vm.listQuery.pageSize,
        page: vm.listQuery.currPage
      };
      axios
        .get("http://localhost:9090/comment/selectComments", { params: par })
        .then(result => {
          let res = result.data;
          console.log(res);
          this.commentList = res.list;
          vm.listLoading = false;
        });
    },
    //操作分页
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    //操作分页
    handleCurrentChange(val) {
      console.log("--------", val);
      this.listQuery.currPage = val;
      this.getList();
    },
    //新增
    handleCreate() {
      //每次点击新增时 重置下新增表单数据，避免双向绑定的影响
      this.initTemp();

      this.dialogFormAddTeam = true;
    },
    //新增提交
    handleCreateSubmit() {
      console.log(this.fileName);
      let vm = this;
      vm.temp.photoname = this.fileName;
      console.log("新增入参：", vm.temp);
      //新增接口
      axios
        .post("http://localhost:9090/team/addTeam", JSON.stringify(vm.temp), {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(res => {
          //重新加载数据
          this.getList();
          vm.$message({
            type: "success",
            center: true,
            message: "添加成功"
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
        const { export_json_to_excel } = require("vendor/Export2Excel");
        const tHeader = ["字段1", "字段2", "字段3", "字段4", "字段5"];
        const filterVal = [
          "chnlId",
          "hisChnlId",
          "chnlName",
          "state",
          "isavailable"
        ];
        const list = vm.list;
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "导出的列表excel");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    getFormatDate(timeStr, dateSeparator, timeSeparator) {
      dateSeparator = dateSeparator ? dateSeparator : "-";
      timeSeparator = timeSeparator ? timeSeparator : ":";
      var date = new Date(timeStr),
        year = date.getFullYear(), // 获取完整的年份(4位,1970)
        month = date.getMonth(), // 获取月份(0-11,0代表1月,用的时候记得加上1)
        day = date.getDate(), // 获取日(1-31)
        hour = date.getHours(), // 获取小时数(0-23)
        minute = date.getMinutes(), // 获取分钟数(0-59)
        seconds = date.getSeconds(), // 获取秒数(0-59)
        Y = year + dateSeparator,
        M = (month + 1 > 9 ? month + 1 : "0" + (month + 1)) + dateSeparator,
        D = (day > 9 ? day : "0" + day) + " ",
        h = (hour > 9 ? hour : "0" + hour) + timeSeparator,
        m = (minute > 9 ? minute : "0" + minute) + timeSeparator,
        s = seconds > 9 ? seconds : "0" + seconds,
        formatDate = Y + M + D + h + m + s;
      return formatDate;
    }
  }
};
</script>

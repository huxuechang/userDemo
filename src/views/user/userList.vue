<template>
    <div class="cantainer">
        <el-header style="text-align: left; font-size: 12px;border: 1px solid #EBEEF5;padding: 10px">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="审批人">
                    <el-input  placeholder="审批人" v-model="param.userName"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select  placeholder="活动区域" v-model="param.level">
                        <el-option v-for="(sel,index) in selectData.selectColumn" :key="index"  :value="sel.value" :label="sel.label">{{sel.label}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchClick"><i class="el-icon-search"></i> 查询</el-button>
                    <el-button type="danger" @click="resetClick"><i class="el-icon-search"></i> 重置</el-button>
                    <el-button type="primary" @click="addClick"> <i class="el-icon-plus " ></i> 添加</el-button>
                    <el-button type="danger"  @click="deleteAll"><i class="el-icon-delete"></i> 删除</el-button>
                </el-form-item>
            </el-form>
        </el-header>
        <!--table组件-->
        <Table v-bind:tableHeader="tableHeader"
               v-bind:userListTable="userList"
               v-on:muLipClick="muLipClick"
               v-on:deleteClick="deleteClick"
               v-on:editClick="editClick"
               v-on:filterData="filterData"
        ></Table>
        <!--添加修改组件-->
        <userAddOrEdit
                v-bind:dialogVisible="dialogVisible"
                v-bind:userDataForm="editOrDelete"
                v-on:closeClick="closeClick"

        ></userAddOrEdit>
    </div>
</template>

<script>
    import Table from '../../components/table/Table'
    import userAddOrEdit from '../../views/user/userAddOrEdit'
    //表格表头
    import tableColumn from '../../../public/tableColumn/tableColumn'
    //下拉参数
    import selectColumn from '../../../public/selectColumn/selectColumn'
    export default {
        name: "userList",
        data(){
          return{
              //查询对象
              param:{
                  //table组件传递过来
                  currentPage:1,
                  pageSize:10,
                  userName:'',
                  level:''
              },
              rules:{},
              userList:[], //全部数据
              multipleSelectionlist:[],//子组件传递过来的多选数据
              deleteAllT:[],//要删除的数据
              editOrDelete:{},//修改和删除同一个数据源
              // 表头数据
              tableHeader : tableColumn.userColumn,
              //模态框显示
               dialogVisible:false,
              selectData:{ //当有多个下拉这么写
                  selectColumn:selectColumn.selectColumn
              }
          }
        },
        components:{
            Table,
            userAddOrEdit
        },
        mounted(){
            this.getUserList();
        },
        methods:{
            //子组件传递的方法多选数据
            muLipClick:function(data){
              this.multipleSelectionlist=data
            },
            editClick:function(data){
                this.$confirm('此操作将修改该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.editOrDelete={}
                    this.editOrDelete=data
                    this.dialogVisible=true

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                });
            },
            deleteClick:function(data){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.editOrDelete={}
                    this.editOrDelete=data
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getUserList();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getUserList(){

                //this.logForm 为传参
                //   this.$axios.get('/json/dataJson.json').then(req => {
                //     if(req.data.success == true){
                //       //alert(req.data.data);
                //       this.userList=req.data.data
                //     }
                //   }).catch(err => {
                //     console.log(err)
                //   })

                this.http.get('/json/dataJson.json','get').then(res=>{
                    if(res.data.success == true){
                        this.userList=res.data.data
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            deleteAll:function () {
                const  length=this.multipleSelectionlist.length;
                if(length == 0){
                    this.$message({
                        message: '请选择一条数据',
                        type: 'warning'
                    });
                    return false;
                }
                for (let i = 0; i < length; i++) {

                    this.deleteAllT.push(this.multipleSelectionlist[i].name)
                }
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getUserList();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            closeClick:function(){
                //模态框关闭状态为false
                this.dialogVisible=false
                this.getUserList();
            },
            addClick:function(){
                //修改删除，数据线清空
                this.editOrDelete={}
                //添加时为true
                this.dialogVisible=true
            },
            filterData:function (data) {
                //table组件传递分页参数pageSize
               this.param.currentPage=data.currentPage
                this.param.pageSize=data.pageSize
            },
            searchClick() {
                alert(JSON.stringify(this.param))
                this.$message({
                    message: '查询成功',
                    type: 'success'
                });
            },
            resetClick() {
                //多页面跳转
                let routerdata = this.$router.resolve({
                    name: "Login" //此name就是基金对比页面path的name,在router里边配好的该页面的名字，这样直接就可以匹配到该页面的路径
                });
                let newhref = routerdata.href;
                window.open(newhref, "_blank");

                //   var par=this.param;
                //   par.currentPage=1
                //   par.pageSize=10
                //   par.userName=''
                //   par.level=''
                // this.$message({
                //     message: '重置成功',
                //     type: 'success'
                // });
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <!--@row-click="getDetails"单击事件-->
    <div class="cantainer">

        <el-table style="margin-top: 10px;" border
                  row-style="height:20px"
                  cell-style="padding:0"
                  :data="userListTable.slice((filterData.currentPage-1)*filterData.pageSize,filterData.currentPage*filterData.pageSize)"
                  :default-sort = "{prop: 'date', order: 'descending'}"
                  @selection-change="handleSelectionChange"
                  @cell-dblclick="dblhandleCurrentChange"
        >
            <el-table-column type="index" width="50"></el-table-column>
            <!--<el-table-column v-for="(th, key) in tableHeader"-->
            <!--:key="key"-->
            <!--:prop="th.prop"-->
            <!--:label="th.label"-->
            <!--:min-width="th.minWidth" align="center" sortable show-overflow-tooltip>-->

            <!--<template slot-scope="scope">-->
            <!--<div v-if="th.oper">-->
            <!--<el-button v-for="(o, key) in th.oper" :key="key" @click="o.clickFun(key,scope.row)" type="text" size="small">{{o.name}}</el-button>-->
            <!--</div>-->
            <!--<div v-else>-->
            <!--<span v-if="!th.formatData">{{ scope.row[th.prop] }}</span>-->
            <!--<span v-else>{{ scope.row[th.prop] | formatters(th.formatData) }}</span>-->
            <!--</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column v-for="(th, key) in tableHeader"
            :key="key"
            :prop="th.prop"
            :label="th.label"
            :min-width="th.minWidth" align="center" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="250">
                <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="removeUser(scope.$index, scope.row)">删除</el-button>
                    <el-button type="success" size="small" @click="editUser(scope.$index,scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="filterData.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="filterData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="userListTable.length">
        </el-pagination>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                filterData:{    //分页   多条件查询对象
                    currentPage:1, //初始页
                    pageSize:10,    //    每页的数据
                },
                multipleSelection: [],  //多选


            }
        },
        components:{
            // 'btn-bar':btnBar
        },
        mounted(){

        },
        computed: {


        },
        watch: {

        },
        props:{
            userListTable:{
                type:Array,
                required:true
            },
            tableHeader:{
                type:Array,

            }
        },
        methods:{
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                //每页下拉显示数据
                this.filterData.pageSize = size;
            },
            handleCurrentChange: function(currentPage){
                //点击第几页
                this.filterData.currentPage = currentPage;
                this.$emit('filterData',this.filterData)
            },
            handleSelectionChange(val) {
                //获取多选数据
                this.multipleSelection = val;
                //向父组件传值和方法 多选多行数据
                this.$emit('muLipClick',this.multipleSelection)
            },
            removeUser:function (index,row) {
                //向父组件传值和方法 删除数据 单行
                this.$emit('deleteClick',row);
            },
            editUser:function (index,row) {
                //向父组件传值和方法 删除数据 单行
                this.$emit('editClick',row);
            },
            getDetails:function (row) {
                alert("单击事件"+row)
            },
            dblhandleCurrentChange:function(row){

                alert("双击事件"+row+"===")
            },


        }
    }
</script>

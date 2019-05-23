<template>
    <div>

    <el-dialog :title="userDataForm.length ==0?'添加':'修改'" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <el-form :model="userDataForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名称" prop="name">
                <el-input v-model="userDataForm.name"></el-input>
            </el-form-item>
            <!--<el-form-item label="活动区域" prop="region">-->
                <!--<el-select v-model="ruleForm.region" placeholder="请选择活动区域">-->
                    <!--<el-option label="区域一" value="shanghai"></el-option>-->
                    <!--<el-option label="区域二" value="beijing"></el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
             <el-form-item label="出生年月" prop="date">
            <el-date-picker value-format="yyyy-MM-dd"  placeholder="选择日期" v-model="userDataForm.date" style="width: 100%;"></el-date-picker>
        </el-form-item>

            <el-form-item label="家庭地址" prop="address">
                <el-input type="textarea" v-model="userDataForm.address"></el-input>
            </el-form-item>
            <el-form-item class="el-form-item__content">
                <el-button type="primary" @click="submitForm('ruleForm')"><i class="fa fa-save "></i>  保 存</el-button>
                <el-button type="danger" @click="resetForm('ruleForm')"><i class="fa fa-refresh"></i> 重 置</el-button>
            </el-form-item>
        </el-form>

        <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button @click="cancelClick">取 消</el-button>-->
            <!--<el-button type="primary" @click="dialogVisible = true">确 定</el-button>-->
        <!--</span>-->
    </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "userAddOrEdit",
        data(){
            return{

                // userDataForm: {
                //     name: '',
                //     date: '',
                //     address: ''
                // },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],

                    date: [
                        {  required: true, message: '请选择出生日期', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '家庭地址', trigger: 'blur' },
                        { min: 10, max: 100, message: '长度在 10 到 100 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
         props:{
             dialogVisible:{
                 type:Boolean
             },
             userDataForm:{
                  type:Object
             }


         },

        methods: {
            handleClose(done) {
                this.$confirm('确定要关闭当前操作吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit('closeClick')
                    this.resetForm()
                    done();
                }).catch(() => {

                });

            },
            submitForm(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var parmData=this.userDataForm;
                        this.$message({
                            type: 'success',
                            message: '新增或修改成功!'+JSON.stringify(parmData)
                        });
                        this.resetForm()
                        //将来新增修改公用一个对象一个接口，后台判断
                        //   this.$axios.get('/json/dataJson.json').then(req => {
                        //     if(req.data.success == true){
                        //       //alert(req.data.data);
                        //     }
                        //   }).catch(err => {
                        //     console.log(err)
                        //   })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }

    }
</script>

<style scoped lang="less">
    .el-form-item__content{
        text-align: center;
    }
    .el-dialog__body{
        background-color: aqua;
    }

</style>
<template>
  <div>
    <el-card class="box-card">
      <my-brand level1="权限管理" level2="角色列表" style="margin-bottom:20px"></my-brand>
      <el-button type="success" @cick="addRole()" plain>添加角色</el-button>

      <!-- 用户列表  表格主体 -->
      <el-table :data="roleList" stripe style="width: 100%">
        <!-- 展开列 -->
        <el-table-column type="expand" width="100">
          <template slot-scope="scope">
            <el-row v-for="(item1, index) in scope.row.children" :key="index">
              <el-col :span="6">
                <el-tag closable>{{item1.authName}}</el-tag>
                <span>></span>
              </el-col>
              <el-col :span="18">
                <el-row v-for="(item2, index) in item1.children" :key="index">
                  <el-col :span="6">
                    <el-tag closable type='success'>{{item2.authName}}</el-tag>
                    <span>></span>
                  </el-col>
                  <el-col :span="5" v-for="(item3, index) in item2.children" :key="index">
                    <el-tag type='warning' closable>{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="100"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="220">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="220"> </el-table-column>


        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button @click="editRole(scope.row)" type="primary" size="mini" icon="el-icon-edit" circle plain></el-button>
            <!-- 删除按钮 -->
            <el-button @click="deleteRole(scope.row.id)" type="danger" size="mini" icon="el-icon-delete" circle plain></el-button>
            <!-- 分配角色按钮 -->
            <el-button @click="roleChange(scope.row)" type="success" size="mini" icon="el-icon-check" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- "添加用户"对话框 -->
      <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureUserAdd()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- "编辑用户"对话框 -->
      <el-dialog title="编辑角色" :visible.sync="editDialogFormVisible">
        <el-form :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" autocomplete="off" 　:disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureUserEdit()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- "分配角色"对话框 -->
      <el-dialog title="分配角色" :visible.sync="roleDialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100px">
            {{ currRolename }}
          </el-form-item>
          <el-form-item label="角色" label-width="100px">
            <!-- select绑定的值和option中的value相同时显示相应文本 -->
            <el-select v-model="currRoleId">
              <!-- 遍历roles数组 -->
              <el-option :value="-1" label="请选择角色" disabled="true"></el-option>
              <el-option v-for="(item,index) in roles" :key="index" :label="item.roleName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="roleDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureChangeRole()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        roleList: [],
        formLabelWidth: '500px',
        form: {},
        roles: [],
        currRoleId: -1,
        currRolename: '',
        addDialogFormVisible: false,
        editDialogFormVisible: false,
        roleDialogFormVisible: false
      }
    },
    created() {
      this.getRoleList()
    },
    methods: {
      // 不用设置headers了获取token了
      async getRoleList() {
        var res = await this.$http.get('roles')
        console.log(res)
        this.roleList = res.data.data
        console.log(this.roleList)
      },
      editRole(val) {
        this.editDialogFormVisible = true
      },
      deleteRole(val) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      roleChange(val) {
        this.roleDialogFormVisible = true
      },
      addRole() {
        this.addDialogFormVisible = true
      }


    }
  }

</script>
<style>
</style>

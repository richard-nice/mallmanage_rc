<template>
  <div>
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <div style="margin: 20px 0">
        <el-input placeholder="请输入内容" class="searchUser" v-model="query" clearable>
          <!-- 搜索按钮 -->
          <el-button @click="searchUsers()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 添加用户 按钮 -->
        <el-button class="sureUserAdd" @click="addUser()" type="success" plain>添加用户</el-button>
      </div>
      <!-- 用户列表  表格主体 -->
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column prop="id" label="#" width="50"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="110">
        </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="180">
          <template slot-scope="scope">
            {{ scope.row.create_time | fmtdate }}
          </template>
        </el-table-column>
        <!-- 改变用户状态 -->
        <el-table-column label="用户状态" width="180">
          <template slot-scope="scope">
            <el-switch @change="stateChange(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button @click="editUser(scope.row)" type="primary" size="mini" icon="el-icon-edit" circle plain></el-button>
            <!-- 删除按钮 -->
            <el-button @click="deleteUser(scope.row.id)" type="danger" size="mini" icon="el-icon-delete" circle plain></el-button>
            <!-- 分配角色按钮 -->
            <el-button @click="roleChange(scope.row)" type="success" size="mini" icon="el-icon-check" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="margin-top:20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
          :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
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
      <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
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
            {{ currUsername }}
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
        // 查询参数
        query: '',
        pagenum: 1,
        pagesize: 2,
        total: 0,
        userList: [{
          username: '',
          email: '',
          mobile: '',
          create_time: ''
        }],
        isShowClear: false,
        form: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        addDialogFormVisible: false,
        editDialogFormVisible: false,
        roleDialogFormVisible: false,
        formLabelWidth: '100px',
        // 分配角色
        currUsername: '',
        currRoleId: -1,
        roles: [],
        currUserId: ''
      }
    },

    created() {
      this.getUsers()
    },
    methods: {

      // 选择/更改角色 打开对话框
      async roleChange(user) {
        this.roleDialogFormVisible = true

        this.currUsername = user.username
        this.currUserId = user.id
        // 发送请求 获取全部的roles
        var res1 = await this.$http.get('roles')
        // console.log(res1)
        // data:
        //   data: Array(5)
        //        0:
        //          children: (...)
        //          id: 30
        //          roleDesc: "技术负责人"
        //          roleName: "主管"
        // 把数组赋值给roles 主要是需要里面的id(角色id) (显示在option中的:value)
        this.roles = res1.data.data
        var res2 = await this.$http.get(`users/${user.id}`)
        // console.log(res2)
        this.currRoleId = res2.data.data.rid
        // data:
        //  data:
        //    email: "123@qq.com"
        //    id: 502
        //    mobile: "1111111111111111"
        //    rid: 34
        //    username: "linken"
        // 需要里面的rid  用作当前用户 的角色id -> currRoleId
      },
      // 确认更改/选择角色
      async sureChangeRole() {
        this.roleDialogFormVisible = false
        var res = this.$http.put(`users/${this.currUserId}/role`, {
          rid: this.currRoleId
        })
        console.log(res)
      },
      // 改变用户状态
      // users/:uId/state/:type
      async stateChange(user1) {
        this.$http.put(`users/${user1.id}/state/${user1.mg_state}`)
        // console.log(res)
      },
      // 编辑用户
      editUser(user) {
        this.form = user
        this.editDialogFormVisible = true
      },
      // 确认用户编辑完成
      async sureUserEdit() {
        this.editDialogFormVisible = false
        const res = await this.$http.put(`users/${this.form.id}`, this.form)
        console.log(this.form)
        const {
          meta: {
            msg,
            status
          },
          data
        } = res.data
        console.log(res)
        console.log(data)
        if (status === 200) {
          this.$message.success(msg)
        }
      },
      // 搜索按钮
      searchUsers() {
        // 根据query发送请求
        // 重置页码
        this.pagenum = 1
        this.getUsers()
      },
      // 分页相关方法
      handleSizeChange(val) {
        // val来源于被点击的标签 pagesize
        console.log(val)
        console.log(`每页${val}条数据`)
        this.pagesize = val
        // 重置页码
        this.pagenum = 1
        this.getUsers()
        console.log(this.pagenum)
      },
      handleCurrentChange(val) {
        // val来源于被点击的标签 pagenum
        console.log(val)
        console.log(`当前是第${val}页`)
        this.pagenum = val
        this.getUsers()
      },
      // 添加用户
      addUser() {
        this.addDialogFormVisible = true
        this.form = {}
      },
      // 确认添加用户
      async sureUserAdd() {
        // 关闭窗口
        this.addDialogFormVisible = false
        // 发送异步请求
        var res = await this.$http.post('users', this.form)
        const {
          meta: {
            status,
            msg
          },
          data
        } = res.data
        if (status === 201) {
          console.log(res)
          this.$message.success(msg)
          // 更新视图
          this.getUsers()
          // 清空对话框
          this.form = {}
        } else {
          this.$message.warning(msg)
        }
      },
      // 1111111111111111111111111111111111111111111111111111
      deleteUser(userID) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(async () => {
            // 发送删除请求
            const res = await this.$http.delete(`users/${userID}`)
            const {
              meta: {
                msg,
                status
              },
              data
            } = res.data

            if (status === 200) {
              this.$message({
                type: 'success',
                message: msg
              })
              this.pagenum = 1
              this.getUsers()
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: msg
            })
          })
      },
      // 获取用户列表
      async getUsers() {
        // 接口文档要求授权API->设置请求头
        const AUTH_TOKEN = localStorage.getItem('token')
        this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
        const res = await this.$http.get(
          `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
        )
        // console.log(res);
        const {
          meta: {
            msg,
            status
          },
          data: {
            total,
            users
          }
        } = res.data

        if (status === 200) {
          this.total = total
          this.userList = users
          this.$message.success(msg)
        } else {
          this.$message.warning(msg)
        }
      }
    }
  }

</script>
<style>
  .box-card {
    height: 100%;
  }

  .searchUser {
    width: 300px;
  }

  .username {}

  el-card {
    height: 100%;
  }

</style>

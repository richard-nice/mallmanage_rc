<template>
  <div>
<<<<<<< HEAD
    <my-brand lever1='权限管理' level2='角色列表'></my-brand>
=======
    <el-card class="box-card">
      <my-brand level1="权限管理" level2="角色列表" style="margin-bottom:20px"></my-brand>
      <el-button type="success" @cick="addRole()" plain>添加角色</el-button>

      <!-- 用户列表  表格主体 -->
      <el-table :data="roleList" stripe style="width: 100%">
        <!-- 展开列 -->
        <el-table-column type="expand" width="100">
          <template slot-scope="scope">
            <!-- scope.row代表当前行的数据 -->
            <el-row v-if="scope.row.children.length===0"><span>未分配权限</span></el-row>
            <el-row v-for="(item1, index) in scope.row.children" :key="index">
              <el-col :span="6">
                <el-tag closable @close="closeTag(scope.row,item1.id)">{{ item1.authName }}</el-tag>
                <i class="
                  el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="18">
                <el-row v-for="(item2, index) in item1.children" :key="index">
                  <el-col :span="4">
                    <el-tag closable type="success" @close="closeTag(scope.row,item2.id)">
                      {{item2.authName }}
                    </el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="20">
                    <el-tag v-for="(item3, index) in item2.children" :key="index" type="warning" closable @close="closeTag(scope.row,item3.id)">{{
                      item3.authName
                      }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="100"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="220">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="220">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button @click="editRole(scope.row)" type="primary" size="mini" icon="el-icon-edit" circle plain></el-button>
            <!-- 删除按钮 -->
            <el-button @click="deleteRole(scope.row.id)" type="danger" size="mini" icon="el-icon-delete" circle plain></el-button>
            <!-- check按钮 -->
            <el-button @click="showTreeRightsbox(scope.row)" type="success" size="mini" icon="el-icon-check" circle
              plain></el-button>
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
      <!-- "check"对话框 -->
      <!--
          树形结构
          data->绑定的数据数组
        show-checkbox -> 选择方块
        node-key->每个节点的唯一标识
        default-expanded-keys->[要展开的节点的id值]
        default-checked-keys->[选中的节点id值]
        props="配置选项{label:绑定数据data中的数据key名,children:绑定数据data中的数据key名}"
         -->
      <!--
              :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
         -->
      <el-dialog title="分配权限" :visible.sync="TreeRightsDialogFormVisible">
        <el-tree ref="tree" default-expand-all :data="treeRightsList" show-checkbox node-key="id" :props="defaultProps">
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="TreeRightsDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="TreeRightsDialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

    </el-card>
>>>>>>> dev-rights
  </div>
</template>
<script>
  export default {
    data() {
      return {
        roleList: [],
        formLabelWidth: "500px",
        form: {},
        roles: [],
        currRoleId: -1,
        currRolename: "",
        addDialogFormVisible: false,
        editDialogFormVisible: false,
        roleDialogFormVisible: false,
        TreeRightsDialogFormVisible: false,
        treeRightsList: [],
        // chiledren和authName从treeRightsList中拿数据
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
      }
    },
    created() {
      this.getRoleList();
    },
    methods: {
      // 显示树形权限对话框 
      async showTreeRightsbox() {
        this.TreeRightsDialogFormVisible = true
<<<<<<< HEAD
=======
        const res = await this.$http.get('rights/tree')
        console.log(res.data.data)
        this.treeRightsList = res.data.data
        // 返回目前半选中的节点的 key 所组成的数组
        // var arr1 = getHalfCheckedKeys()
        // 返回目前被选中的节点的 key 所组成的数组
        // var arr2 = getCheckedKeys()
>>>>>>> dev-rights

      }, // 关闭标签tag时 共用一个方法   因为标签内传过来的实参不同  可以实现不同层级标签的删除
      async closeTag(role, rightID) {
        const res = await this.$http.delete(`roles/${role.id}/rights/${rightID}`)
        console.log(res);
        console.log(rightID);
        // 更新局部 把更改后的数据 赋值给 视图数据    res.data.data就是当前角色的剩余保留着的权限
        role.children = res.data.data
      },
      // 不用设置headers了获取token了
      async getRoleList() {
        var res = await this.$http.get("roles");
        console.log(res);
        this.roleList = res.data.data;
        console.log(this.roleList);
      },
      editRole(val) {
        this.editDialogFormVisible = true;
      },
      deleteRole(val) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      roleChange(val) {
        this.roleDialogFormVisible = true;
      },
      addRole() {
        this.addDialogFormVisible = true;
      }
    }
  };

</script>
<style></style>

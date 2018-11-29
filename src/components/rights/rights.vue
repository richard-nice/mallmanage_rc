<template>
  <div>
    <el-card class="box-card">
      <my-brand level1="权限管理" level2="权限列表"></my-brand>
      <el-table :data="rightslist" height="450" border style="width: 100%;margin-top:30px">
        <el-table-column prop="id" label="#" type='index' width="80">
          <!-- type="index"?????? -->
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="180">
        </el-table-column>
        <el-table-column label="层级">
          <template slot-scope='scope'>
            <div>
              <span v-if="scope.row.level==='0'">一级</span>
              <span v-if="scope.row.level==='1'">二级</span>
              <span v-if="scope.row.level==='2'">三级</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        rightslist: [
          // id = '',
          // rightsname = '',
          // path = '',
        ]
      }
    },
    created() {
      this.getRightsList()
    },
    methods: {
      async getRightsList() {
        // 已经设置了拦截器,在发送请求之前设置了headers,headers里面有token
        var res = await this.$http.get('rights/list')
        this.rightslist = res.data.data
        console.log(res)

      }
    }
  }

</script>
<style>
</style>

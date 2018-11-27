<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header class="header">
      <div>
        <el-row>
          <el-col :span="4">
            <img class="grid-content bg-purple head-left" src="../../assets/logo.png">
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light middle">
              <h3>电商后台管理系统</h3>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <a class="login-out" href="javascript:;" @click="handleLogout()">退出</a>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <div>
          <el-menu :router="true" :unique-opened='true' class="el-menu-vertical-demo">
            <!-- 1 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>用户管理</span>
              </template>
              <!-- element规定这里的index指向path -->
              <el-menu-item index="users">
                <template slot="title">
                  <i class="el-icon-tickets"></i>
                  <span>用户列表</span>
                </template>
              </el-menu-item>

            </el-submenu>
            <!-- 2 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>

              <el-menu-item index="1-1"><template slot="title">
                  <i class="el-icon-location"></i>
                  <span>角色列表</span>
                </template></el-menu-item>
              <el-menu-item index="1-2"><template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限列表</span>
                </template></el-menu-item>

            </el-submenu>
            <!-- 3 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>

              <el-menu-item index="1-1"><template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品列表</span>
                </template></el-menu-item>
              <el-menu-item index="1-2"><template slot="title">
                  <i class="el-icon-location"></i>
                  <span>分类参数</span>
                </template></el-menu-item>
              <el-menu-item index="1-2"><template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品分类</span>
                </template></el-menu-item>

            </el-submenu>
            <!-- 4 -->
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>

              <el-menu-item index="1-1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订单列表</span>
                </template>
              </el-menu-item>

            </el-submenu>
            <!-- 5 -->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>

              <el-menu-item index="1-1"><template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据报表</span>
                </template></el-menu-item>

            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <!-- 主体部分 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>
<script>
  export default {
    // 钩子函数,在组件实例被创建之前
    beforeCreate() {
      // 获取token
      const token = localStorage.getItem('token')
      // 在home组件实例创建之前,检测有没有token,如果没有跳转到login
      if (!token) {
        this.$router.push({
          name: 'login'
        })
      }
    },
    data() {
      return {}
    },
    methods: {
      handleLogout() {
        // 提示退出登录成功
        this.$message.success('退出成功')
        // 清除本地缓存
        localStorage.clear()
        // 调回登录页
        this.$router.push({
          name: 'login'
        })
      }
    }
  }

</script>
<style>
  /* 头部样式 */
  .header {
    background-color: #b3c0d1;
  }

  .middle {
    text-align: center;
    color: #666;
  }

  .login-out {
    display: block;
    line-height: 60px;
    height: 60px;
  }

</style>

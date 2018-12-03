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
          <el-menu :data="sliderList" :router="true" :unique-opened="true" class="el-menu-vertical-demo">
            <el-submenu :index="''+item1.order" v-for="(item1, index) in sliderList" :key="index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item1.authName}}</span>
              </template>

              <el-menu-item :index="item2.path" v-for="(item2, i) in item1.children" :key="i">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item2.authName}}</span>
                </template>
              </el-menu-item>
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
      // // 获取token
      // const token = localStorage.getItem('token')
      // // 在home组件实例创建之前,检测有没有token,如果没有跳转到login
      // if (!token) {
      //   this.$router.push({
      //     name: 'login'
      //   })
      // }
    },
    data() {
      return {
        sliderList: []
      }
    },
    created() {
      this.getSlider()
    },
    methods: {
      // 侧边栏
      async getSlider() {
        var res = await this.$http.get('menus')
        // console.log(res)
        this.sliderList = res.data.data
      },
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

<template>
  <div class="login-wrap">

    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click.prevent="handleLogin()">登　录</el-button>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formdata: {
          username: '',
          password: ''
        },
      }
    },
    methods: {
      async handleLogin() {
        const res = await this.$http.post('login', this.formdata)
        console.log(res)
        // 声明两个变量
        const {
          meta: {
            msg,
            status
          },
          data
        } = res.data
        if (status === 200) {
          const token = localStorage.setItem('token', data.token)
          this.$message.success(msg)
          this.$router.push({
            name: 'home'
          })
        } else {
          this.$message.warning(msg)
        }
      }
      // handleLogin() {
      // this.$http.post('login', this.formdata).then(res => {
      //   console.log(res)
      //   const {
      //     meta: {
      //       msg,
      //       status
      //     },
      //     data
      //   } = res.data
      //   if (status === 200) {
      //     // 跳转到首页,编程式导航
      //     this.$router.push({
      //       name: "home"
      //     })
      //     // 提示登录成功(引入提示框)
      //     this.$message.success(msg)
      //   } else {
      //     // 如果失败提示用户
      //     this.$message.warning(msg)
      //   }
      // })
      // }

    }

  }

</script>
<style>
  .login-wrap {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #324152;
  }

  .login-wrap .login-form {
    width: 400px;
    border-radius: 6px;
    padding: 30px;
    background-color: #fff;
  }

  .login-wrap .login-btn {
    width: 100%;
  }

</style>

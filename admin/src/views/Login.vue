<template>
  <div class="login-container">
    <el-card class="login-card">
      <h3>请登录，进入后台管理系统</h3>
      <el-form label-width="4rem" @submit.native.prevent = "login">
        <el-form-item label="用户名">
          <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" style="width:16rem">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
        user: {
        username:'',
        password:''
      }
    }
  },
  methods: {
    async login(){
      const res = await this.$http.post('login',this.user)
      localStorage.token = res.data.token
      this.$message({
      message: '欢迎，' + res.data.nickname,
      type:'success',
      duration: 5000
      })
      this.$router.push('/')
    }
  }
}
</script>>

<style lang="scss" scoped>
.login-container{
  display:flex;
  justify-content: center;
  margin-top: 10rem;
  .login-card{
    width:25rem;
    padding:3rem;
    display:flex;
    justify-content: center;
    border-radius: 3%;
  }
}
</style>

<template>
  <div class="form-container">
    <h1>{{id ? '编辑':'创建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent = "save()">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="model.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button type="danger" @click="$router.push('/admin_users/list')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data(){
    return{
      model:{
        username:'',
        nickname:'',
        password:''
      },
    }
  },
  methods:{
    async save(){
      if(this.id){
        await this.$http.put('manage/admin_users/' + this.id,this.model)
      }else{
        await this.$http.post('manage/admin_users',this.model)
      }
      this.$router.push('/admin_users/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async getModelById(){
      const res = await this.$http.get('manage/admin_users/' + this.id)
      this.model = res.data
    },
  },
  created(){
    if(this.id){
      this.getModelById()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container{
  width: 60vw;
  h1{
    margin-left: 5rem;
  }
}
</style>
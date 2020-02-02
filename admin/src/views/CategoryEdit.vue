<template>
  <div class="form-container">
    <h1>{{id ? '编辑':'创建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent = "save()">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
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
      model:{}
    }
  },
  methods:{
    async save(){
      let res
      if(this.id){
         res = await this.$http.put('categories/' + this.id,this.model)
      }else{
         res = await this.$http.post('categories',this.model)
      }
      window.console.log(res)
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async getModelById(){
      const res = await this.$http.get('categories/' + this.id)
      this.model = res.data
    }
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
<template>
  <div class="form-container">
    <h1>{{id ? '编辑':'创建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent = "save()">
      <el-form-item label="上级分类：">
        <el-select v-model="model.parent" placeholder="请选择上级分类">
          <el-option
            v-for="item in lists"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称：">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button type="danger" @click="$router.push('/categories/list')">取消</el-button>
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
        
      },
      lists:[]
    }
  },
  methods:{
    async save(){
      if(this.id){
        await this.$http.put('manage/categories/' + this.id,this.model)
      }else{
        await this.$http.post('manage/categories',this.model)
      }
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async getModelById(){
      const res = await this.$http.get('manage/categories/' + this.id)
      this.model = res.data
    },
    async getLists(){
      const res = await this.$http.get('manage/categories')
      this.lists = res.data
    }
  },
  created(){
    if(this.id){
      this.getModelById()
    }
    this.getLists()
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
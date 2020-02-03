<template>
  <div class="form-container">
    <h1>{{id ? '编辑':'创建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent = "save()">
      <el-form-item label="物品名称：">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标：">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload/items'"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="model.img" :src="model.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button type="danger" @click="$router.push('/items/list')">取消</el-button>
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
        name:'',
        img:''
      },
      lists:[]
    }
  },
  methods:{
    uploadSuccess(res){
      this.model.img = res.url
    },
    async save(){
      if(this.id){
        await this.$http.put('manage/items/' + this.id,this.model)
      }else{
        await this.$http.post('manage/items',this.model)
      }
      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async getModelById(){
      const res = await this.$http.get('manage/items/' + this.id)
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

<style lang="scss">
.form-container{
  width: 60vw;
  h1{
    margin-left: 5rem;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
}
</style>
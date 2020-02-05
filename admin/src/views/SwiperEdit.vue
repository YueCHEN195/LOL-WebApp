<template>
  <div class="form-container">
    <h1>{{id ? '编辑':'创建'}}轮播图</h1>
    <el-form label-width="120px" @submit.native.prevent = "save()">
      <el-form-item label="轮播图名称：">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button type="danger" @click="$router.push('/swipers/list')">取消</el-button>
      </el-form-item>
      <el-button style="margin-left:1.5rem" type="text" @click="model.contents.push({img:'',url:''})"><i class="el-icon-plus"></i>添加信息</el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(content, i) in model.contents" :key="i">
              <el-form-item label="图片：">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload/swipers'"
                  :show-file-list="false"
                  :on-success="res => content.img = res.url">
                  <!-- :before-upload="beforeAvatarUpload" -->
                  <img v-if="content.img" :src="content.img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="备注（URL）">
                <el-input v-model="content.url"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.contents.splice(i,1)">移除轮播图</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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
        contents:[]
      },
    }
  },
  methods:{
    async save(){
      if(this.id){
        await this.$http.put('manage/swipers/' + this.id,this.model)
      }else{
        await this.$http.post('manage/swipers',this.model)
      }
      this.$router.push('/swipers/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async getModelById(){
      const res = await this.$http.get('manage/swipers/' + this.id)
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
    width: 15rem;
    height: 10rem;
    line-height: 10rem;
    text-align: center;
  }
  .avatar {
    width: 15rem;
    height: 10rem;
    display: block;
  }
}
</style>
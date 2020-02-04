<template>
  <div class="form-container">
    <h1>{{id ? '编辑':'创建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent = "save()">
      <el-form-item label="所属分类：">
        <el-select v-model="model.category" placeholder="请选择所属分类">
          <el-option
            v-for="item in articleCates"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="model.content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button type="danger" @click="$router.push('/articles/list')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
                                                                                                                                                 
<script>
import {VueEditor} from "vue2-editor"

export default {
  props: {
    id: {}
  },
  components:{
    VueEditor
  },
  data(){
    return{
      model:{
        category: ''
      },
      articleCates:[]
    }
  },
  methods:{
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      var formData = new FormData();
      formData.append("file", file)
      const res = await this.$http.post('updata/articles',formData)
      let url = res.data.url; // Get url from response
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
    },
    async save(){
      if(this.id){
        await this.$http.put('manage/articles/' + this.id,this.model)
      }else{
        await this.$http.post('manage/articles',this.model)
      }
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async getModelById(){
      const res = await this.$http.get('manage/articles/' + this.id)
      this.model = res.data
    },
    async getLists(){
      const res = await this.$http.get('manage/categories')
      for(let item of res.data){
        if(item.parent && item.parent.name == 'article'){
          this.articleCates.push(item)
        }
      }
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
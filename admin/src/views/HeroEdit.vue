<template>
  <div class="form-container">
    <h1>{{id ? '编辑':'创建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent = "save">
      <el-tabs value="skills">
        <el-tab-pane label="基本信息">
          <el-form-item label="英雄名称：">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="英雄称号：">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="图标：">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload/heroes'"
              :show-file-list="false"
              :on-success="uploadSuccess">
              <!-- :before-upload="beforeAvatarUpload" -->
              <img v-if="model.img" :src="model.img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="英雄类型：">
            <el-checkbox-group v-model="model.categories">
              <el-checkbox v-for = "item in heroCategories" :key= "item._id" :label="item._id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="物理攻击：">
            <el-rate :max = "10" show-score v-model="model.scores.ad" style="margin-top:0.75rem"></el-rate>
          </el-form-item>
          <el-form-item label="魔法攻击：">
            <el-rate :max = "10" show-score v-model="model.scores.ap" style="margin-top:0.75rem"></el-rate>
          </el-form-item>
          <el-form-item label="防御能力：">
            <el-rate :max = "10" show-score v-model="model.scores.df" style="margin-top:0.75rem"></el-rate>
          </el-form-item>
          <el-form-item label="上手难度：">
            <el-rate :max = "10" show-score v-model="model.scores.difficulty" style="margin-top:0.75rem"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装：">
            <el-select v-model="model.items1" placeholder="设置推荐出装（多选）" multiple>
              <el-option v-for="item in itemList" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装：">
            <el-select v-model="model.items2" placeholder="设置推荐出装（多选）" multiple>
              <el-option v-for="item in itemList" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧：">
            <el-input v-model="model.battleTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="背景故事：">
            <el-input v-model="model.stories" type="textarea"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息" name="skills">
          <el-button type="text" @click="model.skills.push({img:'',name:'',description:'',tips:''})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col class="skill-container" :md="12" v-for="(skill, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="skill.name"></el-input>
              </el-form-item>
              <el-form-item label="图标：">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload/heroes'"
                  :show-file-list="false"
                  :on-success="res => skill.img = res.url">
                  <!-- :before-upload="beforeAvatarUpload" -->
                  <img v-if="skill.img" :src="skill.img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input type="textarea" v-model="skill.description"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="skill.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(i,1)">移除技能</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button type="danger" @click="$router.push('/heroes/list')">取消</el-button>
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
        img:'',
        title:'',
        categories:[],
        scores: {
          difficulty: 0,
          ad: 0,
          ap: 0,
          df: 0
        },
        skills:[],
        items1:[],
        items2:[],
        stories:'',
        battleTips:'',
      },
      heroCategories:[],
      itemList:[]
    }
  },
  methods:{
    uploadSuccess(res){
      this.$set(this.model,'img',res.url)    //上传成功之后拿到服务器返回的file信息 res.url 
    },
    async save(){
      if(this.id){
        await this.$http.put('manage/heroes/' + this.id,this.model)
      }else{
        await this.$http.post('manage/heroes',this.model)
      }
      this.$router.push('/heroes/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async getModelById(){
      const res = await this.$http.get('manage/heroes/' + this.id)
      this.model = res.data
    },
    async getCategories(){
      const res = await this.$http.get('manage/categories')
      for(let item of res.data){
        if(item.parent && item.parent.name == "hero"){
          this.heroCategories.push(item)
        } //else if(item.parent && item.parent.name == )
      }
    }
  },
  created(){
    if(this.id){
      this.getModelById()
    }
    this.getCategories()
  }
}
</script>

<style lang="scss" scoped>
.form-container{
  width: 60vw;
  margin-left:3vw;
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
<template>
<div>
  <el-input placeholder="请输入搜索关键字" v-model="keywords" style="width:20rem; padding:1rem;">
  </el-input>
    <el-table :data="search.slice((currentPage-1)*pageSize,currentPage*pageSize)">
      <el-table-column prop="_id" label="ID">
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push('/articles/edit/' + scope.row._id)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change = "handleCurrentChange"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="lists.length"
      :current-page="currentPage">
    </el-pagination>
</div>
</template>

<script>
export default {
  data(){
    return {
      lists: [],
      currentPage: 1,
      pageSize:20,
      keywords:'',
    }
  },
  computed: {
    search(){
      return this.lists.filter(item => {
        return item.title.includes(this.keywords)
      })
    }
  },
  methods: {
    async getLists(){
      const res = await this.$http.get('manage/articles')
      this.lists = res.data
    },
    handleCurrentChange(val){
      this.currentPage = val
    },
    async del(model){
      try{
        await this.$confirm(`此操作将永久删除该${model.title}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        })
        const res = await this.$http.delete('manage/articles/' + model._id)
        if(res.data.success){
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
        this.getLists()
      }catch(error){
        if(error == 'cancel'){
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        }
      }
    }
  },
  created(){
    this.getLists()
  }
}
</script>

<style>

</style>
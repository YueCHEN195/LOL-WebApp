<template>
    <el-table :data="lists">
      <el-table-column prop="_id" label="ID">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="parent.name" label="上级分类">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push('/categories/edit/' + scope.row._id)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  data(){
    return {
      lists: []
    }
  },
  methods: {
    async getLists(){
      const res = await this.$http.get('manage/categories')
      this.lists = res.data
    },
    async del(model){
      try{
        await this.$confirm(`此操作将永久删除该${model.name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        })
        const res = await this.$http.delete('manage/categories/' + model._id)
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
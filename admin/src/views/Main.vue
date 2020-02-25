<template>
<el-container>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router  unique-opened>    <!-- 激活router模式 该模式下会在点el-menu-item的时候把index当作router的path跳转 -->
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>网站资源</template>

        <el-menu-item-group>
          <template slot="title">文章</template>
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">轮播图</template>
          <el-menu-item index="/swipers/create">新建轮播图</el-menu-item>
          <el-menu-item index="/swipers/list">轮播图列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="/categories/create">新建分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-menu-item-group>

      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>游戏相关</template>

        <el-menu-item-group>
          <template slot="title">物品</template>
          <el-menu-item index="/items/create">新建物品</el-menu-item>
          <el-menu-item index="/items/list">物品列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">英雄</template>
          <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
          <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-message"></i>权限管理</template>
        <el-menu-item-group>
          <template slot="title">管理员</template>
        <el-menu-item index="/admin_users/create">注册管理员</el-menu-item>
        <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <span style="margin-right: 1rem">YueCHEN</span>
      <el-button type="danger" @click="logout">退出</el-button>
    </el-header>
    <router-view :key="$router.path"></router-view>
  </el-container>
</el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    methods: {
      logout(){
        window.localStorage.clear()
        this.$router.push('/login')
      }
    },
  }
</script>
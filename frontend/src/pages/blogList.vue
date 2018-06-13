<template>
  <div class="container">
    <Nav @closemenu="closeMenuFn"></Nav>
    <div class="pageMain">
      <el-menu
        default-active="1"
        class="el-menu-vertical"
        :collapse="isCollapse"
        router
        :style="{'height': menuHeight + 'px'}">
        <el-menu-item index="1" route="/blogList/articleList">
          <i class="el-icon-document"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="2" route="/blogList/tags">
          <i class="el-icon-menu"></i>
          <span slot="title">标签管理</span>
        </el-menu-item>
      </el-menu>

      <router-view class="viewMain" :style="{'height': menuHeight + 'px'}"/>
    </div>
  </div>
</template>

<script>
	import Nav from '../components/navMain'
	export default {
    data () {
      return {
        menuHeight: null,
        isCollapse: false,
        mainWidth: null
      }
    },

		components: {
			"Nav": Nav
    },
    
    created () {
      this.menuHeight = window.innerHeight - 110;
    },

    methods: {
      closeMenuFn () {
        this.isCollapse = !this.isCollapse;
      }
    }
	}

</script>

<style lang="scss" scoped>
	.container {
		background: #FAFAFA;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
    .pageMain{
      display: flex;
      .viewMain{
        overflow: scroll;
        flex: 1;
      }
      .el-menu-vertical{
        box-shadow: 10px 20px 30px #bec0c1;
        margin-right: 20px;
      }
      .el-menu-vertical:not(.el-menu--collapse) {
        width: 200px;
      }
    }
	}

</style>

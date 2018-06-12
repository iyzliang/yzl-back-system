<template>
  <nav>
    <div class="logo" @click="closemenu"></div>
    <div class="action">
      <div class="username">{{username || '-'}}</div>
      <div class="logout">
        <el-button type="text" @click="logoutFn">退出</el-button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      username: null
    }
  },

  created () {
    this.username = localStorage.getItem('blog_user');
  },

  methods: {
    closemenu () {
      this.$emit('closemenu');
    },

    logoutFn () {
      localStorage.removeItem('blog_token');
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss" scoped>
  nav{
    width: 100%;
    height: 90px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 10px 10px 20px #bec0c1;
    margin-bottom: 20px;
    .logo{
      width: 190px;
      height: 70px;
      background-image: url('../assets/images/logo.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
    }
    .action{
      width: 300px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      .username{
        width: 200px;
        color: #888;
        float: left;
      }
      .logout{
        width: 100px;
        float: left;
      }
    }
  }
</style>

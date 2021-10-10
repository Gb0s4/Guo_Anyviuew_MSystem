<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {   
    
  }
}
</script>

<style lang="less">
// 全局样式
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
ul,ol {
  list-style: none;
}
a {
  text-decoration: none;
  color: #232323;
}
input, textarea {
  outline: none;
  border: none;
}
// 移入导航栏背景变红
.nav-item:hover {
  background-color: red!important;
}
// 点击时导航栏变红
.activeNav {
  background-color: red!important;
}
// 增删改三个按钮
.mini-btn {
  padding: 5px!important;
  padding: 2px 5px;
  span {
    margin-left: 0!important;
  }
}
.add-btn {
  color: #1c84c6!important;
  border: 1px solid #1c84c6!important;
  // :hover {
  //   color: #fff!important;
  //   background-color: #1c84c6!important;
  // }
}
.change-btn {
  color: #23c6c8!important;
  border: 1px solid #23c6c8!important;
  // :hover {
  //   color: #fff!important;
  //   background-color: #23c6c8!important;
  // }
}
.delete-btn {
  color: #ed5565!important;
  border: 1px solid #ed5565!important;
  // :hover {
  //   color: #fff!important;
  //   background-color: #ed5565!important;
  // }
}
// 添加课程的表单
.add-form {
  .el-select {
    width: 600px!important;
  }
  .small-select {
    width: 150px!important;
  }
}
// 鼠标移入课程名称改变鼠标样式
.lesson-name:hover {
  cursor: pointer;
}
</style>


<template>
  <div class="home">
    <el-container class="container-box">
      <!-- 网页头部 -->
      <el-header>
        <span class="title">Anyview System</span>
        <div class="box">
            <a href="javascript:;">
                <i class="el-icon-user-solid"></i>
                <p>林志毅</p>
            </a>    
            <a href="javascript:;">
                <i class="el-icon-lock"></i>
                <p>修改密码</p>
            </a>
            <a href="javascript:;">
                <i class="el-icon-switch-button"></i>
                <p>退出</p>
            </a>
        </div>
      </el-header>
      <!-- 网页主体 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-menu
            background-color="#4a5064"
            text-color="#fff"
            active-text-color="#fff"
            style="border-right:0;"
            router
          >
            <el-menu-item
              v-for="item,i in views"
              :key="item.id"
              :index="item.path"
              class="nav-item"
              :class="{activeNav:i===isActive}"
              style="position:relative"
              @click="beActive(i)"
            >
              <span>{{item.name}}</span>
              <i class="el-icon-caret-right"></i>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 路由
      views: [
				{id:'001',name:'学生管理',path:'/Student'},
				{id:'002',name:'课程安排',path:'/Lesson'},
				{id:'003',name:'我的题库',path:'/QtBank'},
				{id:'004',name:'我的作业表',path:'/JobsTable'},
				{id:'005',name:'批改作业',path:'/CheckWork'},
				{id:'006',name:'综合评分',path:'/CpEvaluation'},
				{id:'007',name:'测验管理',path:'/ExamMm'},
				{id:'008',name:'代码检测',path:'/CheckCode'},
			],
      // 点击时会重新赋值，用于判断是否点击该导航
      isActive: false,
    }
  },
  // 点击时把isActive设为传入的index值
  methods: {
    beActive(i) {
      this.isActive = i;
    }
  }
}
</script>

<style lang="less" scoped>
// 头部样式
@hdHeight: 60px;
@haifHeight: @hdHeight * 0.5;
.el-header {
  display: flex;
  background-color: #373d41;
  color: #fff;
  .title {
    font-size: 22px;
    line-height: @hdHeight;
  }
  .box {
    display: flex;
    position: absolute;
    right: 0;
    padding: 0 20px;
    a {
      display: flex;
      padding: 0 10px;
      height: @hdHeight;
      p {
        font-size: 14px;
        line-height: @haifHeight;
        color: #fff;
      }
    }
  }
}
.el-icon-user-solid, 
.el-icon-lock,
.el-icon-switch-button {
    padding-right: 5px;
    font-size: 20px;
    line-height: @hdHeight;
    color: #fff;
}
// 侧边栏
.home,
.container-box {
  height: 100%;
}
.el-aside {
  background-color: #4a5064;
}
.el-icon-caret-right {
  position: absolute;
  right: 10px;
  color: #fff;
  line-height: 56px;
}
.navItem {
  background-color: #373d41;
}
</style>

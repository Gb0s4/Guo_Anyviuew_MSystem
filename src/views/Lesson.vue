<template>
  <div>
    <!-- 查询 -->
    <el-row :gutter="20" style="margin-bottom: 10px">
      <el-col :span="6"
        ><el-input placeholder="请输入学校名称" size="small" v-model.trim="schoolValue" clearable></el-input
      ></el-col>
      <el-col :span="6"
        ><el-input placeholder="请输入学院名称" size="small" v-model.trim="academyValue" clearable></el-input
      ></el-col>
      <el-col :span="6"
        ><el-input placeholder="请输入专业名称" size="small" v-model.trim="majorValue" clearable></el-input
      ></el-col>
      <el-col :span="6"
        ><el-input placeholder="请输入班级名称" size="small" v-model.trim="classValue" clearable></el-input
      ></el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px">
      <el-col :span="6"
        ><el-input placeholder="请输入课程名称" size="small" v-model.trim="lessonValue" clearable></el-input
      ></el-col>
      <el-col :span="6"
        ><el-input placeholder="请输入教师名称" size="small" v-model.trim="teacherValue" clearable></el-input
      ></el-col>
      <el-col :span="6"
        ><el-button
          type="danger"
          size="small"
          @click="searchTo(schoolValue, academyValue, majorValue, classValue, lessonValue, teacherValue)"        
        >查询</el-button></el-col
      >
    </el-row>
    <!-- 增删改 -->
    <div class="control" style="margin-bottom: 10px">
      <el-button class="mini-btn add-btn" @click="pushAddPage">
        <i class="el-icon-plus"></i>
        <span>添加</span>
      </el-button>
      <el-button class="mini-btn change-btn" @click="changeLesson">
        <i class="el-icon-edit"></i>
        <span>修改</span>
      </el-button>
      <el-button class="mini-btn delete-btn" @click="delLesson">
        <i class="el-icon-delete-solid"></i>
        <span>删除</span>
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table
      tooltip-effect="dark"
      style="width: 100%"
      :data="this.nowLessons"
      border
      stripe
      :default-sort="{ prop: 'date', order: 'descending' }"
      @selection-change="getId"
      @cell-click="change"
    >
      <el-table-column type="selection" align="center"> </el-table-column>
      <el-table-column label="序号" type="index" width="80" align="center">
      </el-table-column>
      <el-table-column label="学期" prop="semester" align="center">
      </el-table-column>
      <!-- 为课程这一列单独设置index为3 -->
      <el-table-column label="课程名称" prop="lesson" align="center" :index="3">
        <template scope="scope">
          <span style="color: #23c6c8" class="lesson-name">{{
            scope.row.lesson
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学校" prop="school" align="center">
      </el-table-column>
      <el-table-column label="学院" prop="academy" align="center" :formatter="academyString">
      </el-table-column>
      <el-table-column label="专业" prop="major" align="center" :formatter="majorString">
      </el-table-column>
      <el-table-column label="班级名称" prop="class" align="center" :formatter="classString">
      </el-table-column>
      <el-table-column label="教师姓名" prop="teacher" align="center" :formatter="teacherString">
      </el-table-column>
      <el-table-column label="作业表" prop="job" align="center" width="140" :formatter="jobString">
      </el-table-column>
      <el-table-column label="更新时间" prop="time" align="center" width="180" sortable>
      </el-table-column>
    </el-table>
    <span style="font-size: 14px">共{{ lessons.length }}条</span>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Message } from "element-ui";
import { MessageBox } from "element-ui";

export default {
  name: "Lesson",
  data() {
    return {
      // 可修改的对象数组，用于渲染表格
      nowLessons: [],
      // 储存选中课程id的数组
      ids: [],
      // 搜索框输入的值
      schoolValue: '',
      academyValue: '',
      majorValue: '',
      classValue: '',
      lessonValue: '',
      teacherValue: '',
    };
  },
  created() {
    // 将vuex管理的表格数据赋值给nowlessons进行表格渲染
    this.nowLessons = this.lessons;
    // 通过 0 1 2 判断是否要弹窗
    if (this.$route.params.isCommit == 1) {
      Message.success({
        showClose: true,
        message: "添加成功",
      });
    } else if (this.$route.params.isCommit == 2) {
      Message.success({
        showClose: true,
        message: "修改成功",
      });
    }
  },
  computed: {
    ...mapState(["activeNav", "lessons"]),
  },
  methods: {
    // 点击添加时路由跳转到添加页面
    pushAddPage() {
      this.$router.push({
        path: "/AddPage",
      });
    },
    // 获取选中的id并赋值给ids数组
    getId(val) {
      // 先清空ids数组
      this.ids = [];
      let index = 0;
      val.forEach((obj) => {
        this.ids[index] = obj.id;
        index++;
      });
    },
    // 点击删除时的提示
    delLesson() {
      // 没有选中时提示要选中
      if (this.ids.length === 0) {
        Message.warning({
          showClose: true,
          message: "请选择一条数据进行删除",
        });
      } else {
        MessageBox.confirm("您确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            Message.success({
              showClose: true,
              message: "删除课程编排成功",
            });
            // 通过后在vuex中调用delLesson方法删除课程
            this.ids.forEach((id) => {
              this.$store.commit("delLesson", id);
            });
            // 重新赋值并渲染表格数据
            this.nowLessons = this.lessons;
          })
          .catch(() => {
            Message.info({
              showClose: true,
              message: "已取消删除",
            });
          });
      }
    },
    // 点击课程名称时进行修改
    change(row, column) {
      // 在表格中为课程这一列设置了index为3
      if (column.index == 3) {
        // 想添加传递id改行的修改
        this.$router.push({
          path: "/AddPage",
          query: { id: row.id },
        });
      }
    },
    // 点击上方修改按钮时的提示
    changeLesson() {
      if (this.ids.length === 0) {
        // 没有选中时提示要选中
        Message.warning({
          showClose: true,
          message: "请选择一条数据进行修改",
        });
      } else if (this.ids.length > 1) {
        // 选中多条时提示一次只能修改一条数据
        Message.warning({
          showClose: true,
          message: "每次只能修改一条数据",
        });
      } else {
        // 其他情况ids里只有一个元素ids[0]，将修改的进行query传值给AddPage进行修改
        this.$router.push({
          path: "/AddPage",
          query: { id: this.ids[0] },
        });
      }
    },
    // 用toString方法将数组格式化为字符串
    academyString(row) {
      return row.academy.toString();
    },
    majorString(row) {
      return row.major.toString();
    },
    classString(row) {
      return row.class.toString();
    },
    teacherString(row) {
      return row.teacher.toString();
    },
    jobString(row) {
      return row.job.toString();
    },
    // 点击查询，把所有输入框的value传进去进行判断
    // 多个if语句和字符串的indexOf方法实现精确搜索
    searchTo(s, a, m, c, l, t) { 
      this.nowLessons = this.lessons;
      // 创建一个用于接收匹配后数据的数组
      let matchData = [];
      // 将nowlessons赋值给table，简化后方代码
      let table = this.nowLessons;
      // 匹配学校
      if(s) {
        matchData = table.filter(obj => {
          return obj.school === s
        })
        this.nowLessons = matchData;
      }
      // 匹配学院
      if(a) {
        matchData = table.filter(obj => {
          return obj.academy.indexOf(a) != -1
        })
        this.nowLessons = matchData;
      }
      // 匹配专业
      if(m) {
        matchData = table.filter(obj => {
          return obj.major.indexOf(m) != -1
        })
        this.nowLessons = matchData;
      }
      // 匹配班级
      if(c) {
        matchData = table.filter(obj => {
          return obj.class.indexOf(c) != -1
        })
        this.nowLessons = matchData;
      }
      // 匹配课程
      if(l) {
        matchData = table.filter(obj => {
          return obj.lesson === l
        })
        this.nowLessons = matchData;
      }
      // 匹配老师
      if(t) {
        matchData = table.filter(obj => {
          return obj.teacher.indexOf(t) != -1
        })
        this.nowLessons = matchData;
      }
    },
  },
};
</script>


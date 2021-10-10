<template>
  <div>
    <!-- 添加课程 -->
    <el-card style="width:800px;margin:0 auto;">
      <div slot="header">
        <span>添加课程编排</span>
      </div>
      <el-form
        label-width="100px"
        label-position="left"
        class="add-form" 
        :model="form"
        :rules="rules"
        ref="form" 
        @submit.native.prevent
      >
        <el-form-item label="学校" prop="school">
          <el-select  placeholder="请选择学校" v-model="form.school" @change="addSchool">
            <el-option value="学校1"></el-option>
            <el-option value="学校2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学院" prop="academy">
          <el-select  placeholder="请选择学院" :multiple="true" v-model="form.academy" @change="addAcademy">
            <el-option value="学院1"></el-option>
            <el-option value="学院2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-select  placeholder="请选择专业" :multiple="true" v-model="form.major" @change="addMajor">
            <el-option value="专业1"></el-option>
            <el-option value="专业2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-button @click="isChooseClass = true">选择</el-button>
          <span v-for="item, index in form.class" :key="index" style="padding:5px;">{{item}}</span>
          <!-- 选择班级弹出框 -->
          <el-dialog title="选择班级" :visible.sync="isChooseClass" center>
            <el-table
                tooltip-effect="dark"
                style="width: 100%"
                :data="this.classList"
                border
                stripe
                :default-sort="{prop: 'date', order: 'descending'}"
                @selection-change="addClass"
            >
              <el-table-column
                  type="selection"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  label="序号"
                  type="index"
                  width="50"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  label="班级"
                  prop="class"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  label="年届"
                  prop="year"
                  align="center"
                  sortable
              >
              </el-table-column>
            </el-table>
            <p>共{{classList.length}}条数据</p>
            <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="isChooseClass = false">确定</el-button>
            </span>
          </el-dialog>
        </el-form-item>
        <el-form-item label="课程" prop="lesson">
          <el-select  placeholder="请选择课程" v-model="form.lesson" @change="addLesson">
            <el-option value="课程1"></el-option>
            <el-option value="课程2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教师" prop="teacher">
          <el-select  placeholder="请选择教师" :multiple="true" v-model="form.teacher" @change="addTeacher">
            <el-option value="教师1"></el-option>
            <el-option value="教师2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业表" prop="job">
            <el-button @click="isChooseJob = true">选择</el-button>
            <span v-for="item, index in form.job" :key="index" style="padding:5px;">{{item}}</span>
            <!-- 选择作业表弹出框 -->
            <el-dialog title="选择作业表" :visible.sync="isChooseJob" center>
              <el-table
                  tooltip-effect="dark"
                  style="width: 100%"
                  :data="this.jobList"
                  border
                  stripe
                  @selection-change="addJob"
              >
                <el-table-column
                    type="selection"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    label="作业表"
                    prop="job"
                    align="center"
                >
                </el-table-column>
              </el-table>
              <p>共{{jobList.length}}条数据</p>
              <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="isChooseJob = false">确定</el-button>
              </span>
            </el-dialog>
        </el-form-item>
        <el-form-item label="所属学期">
          <el-select  placeholder="请选择年份" class="small-select" v-model="form.year" style="margin-right:20px" @change="addYear">
            <el-option value="2019"></el-option>
            <el-option value="2020"></el-option>
            <el-option value="2021"></el-option>
          </el-select>
          <el-select  placeholder="请选择学期" class="small-select" v-model="form.season" @change="addSeason">
            <el-option value="春季学期" ></el-option>
            <el-option value="秋季学期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom:0;padding-left:200px;">
          <el-button type="danger" style="margin-right:20px" @click="commit('form')">确定</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
// 引入随机生成唯一字符串的nanoid插件
import {nanoid} from 'nanoid'

export default {
  name: 'AddPage',
  data() {
    return {
      // 空的表单对象
      form: {
        id: '',
        school: '',
        academy: [],
        major: [],
        class: [],
        lesson: '',
        teacher: [],
        job: [],
        year: '',
        season: '',
        semester: '',
        time: '',
      },
      // 表单验证规则
      rules: {
        school: [
          {required: true, message: '必填', trigger: 'change'}
        ],
        academy: [
          {required: true, message: '必填', trigger: 'change'}
        ],
        major: [
          {required: true, message: '必填', trigger: 'change'}
        ],
        lesson: [
          {required: true, message: '必填', trigger: 'change'}
        ],
        teacher: [
          {required: true, message: '必填', trigger: 'change'}
        ],
        class: [
          {required: true, message: '必填', trigger: 'change'}
        ],  
        job: [
          {required: true, message: '必填', trigger: 'change'}
        ],
      },
      // 接收修改课程的空id，没有接收到id说明本次为添加而不是修改
      changedId: '',
      // 是否点击选择班级
      isChooseClass: false,
      // 选择班级
      classList: [
        {class: '班级1', year: '2021'},
        {class: '班级2', year: '2017'},
        {class: '班级3', year: '2018'},
        {class: '班级4', year: '2019'},
      ],
      // 是否点击选择课表
      isChooseJob: false,
      // 选择作业表
      jobList: [
        {job: '作业表1'},
        {job: '作业表2'},
        {job: '作业表3'},
        {job: '作业表4'},
      ],
      // 添加为 1，修改为2，失败为0
      isCommit: 0,
    }
  },
  created() {
    // 接收到id说明本次为修改而不是添加
    if(this.$route.query.id !== undefined) this.changedId = this.$route.query.id;
    // 通过id找到需要修改的课程，并渲染到表单中
    this.lessons.forEach(obj => {
      if(obj.id === this.changedId) this.form = obj;
    })
  },
  computed: {
     ...mapState([
      'lessons'
    ])
  },
  methods: {
    // 选择学校
    addSchool(val) {
      this.form.school = val;
    },
    // 选择学院
    addAcademy(val) {
      this.form.academy = val;
    },
    // 选择专业
    addMajor(val) {
      this.form.major = val;
    },
    // 选择老师
    addTeacher(val) {
      this.form.teacher = val;
    },
    // 选择课程
    addLesson(val) {
      this.form.lesson = val
    },
    // 选择年份
    addYear(val) {
      this.form.year = val;
    },
    // 选择学期
    addSeason(val) {
      this.form.season = val;
    },
    // 选中班级
    addClass(val) {
      // 格式化对象数组为数组
      const newClass = [];
      let index = 0;
      val.forEach(obj => {
        newClass[index] = `${obj.class}`;
        index++;
      })
      this.form.class = newClass;
    },
    // 选中作业表
    addJob(val) {
      // 格式化对象数组为数组
      const newJob = [];
      let index = 0;
      val.forEach(obj => {
        newJob[index] = `${obj.job}`;
        index++;
      })
      this.form.job = newJob;
    },
    // 提交表单
    commit(form) {  
      // 点击确定进行表单提交验证
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 春/秋季学期 留下 春/秋
          this.form.season = this.form.season.replace('季学期','');
          // 拼接字符串成为学期
          this.form.semester = `${this.form.year}${this.form.season}`;
          // 生成时间
          this.form.time = this.$moment().format("YYYY-MM-DD HH:mm:ss");
          // lesson用于接收表单数据
          const lesson = this.form;
          // 如果修改id为空则需新生成id并调用addLesson方法添加课程
          if(this.changedId === '') {
            // 生成id
            this.form.id = nanoid();
            // 提交id到vuex中的添加课程方法
            this.$store.commit('addLesson', lesson);
            // 添加成功
            this.isCommit = 1;       
          } else {
            // 如果修改id不为空则需调用changeLesson方法修改课程
            this.$store.commit('changeLesson', this.changedId, lesson);
            // 修改成功
            this.isCommit = 2;
          }
          // 路由replace跳转并传值
          this.$router.replace({
            name: 'Lesson',
            // 传 1 过去说明添加成功; 传 2 过去说明修改成功
            params:{isCommit: this.isCommit}
          }) 
        } else {
          console.log('error submit!!');
          return false;
        }
      }); 
    },
    // 点击返回路由跳转到表格页面
    back() {
      // 路由replace跳转
      this.$router.replace({
            path: '/Lesson',
          }) 
    },
  }
}
</script>

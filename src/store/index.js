import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有课表
    lessons: [
      // 默认用来测试的两组数据
      {id:'001',semester:'2021秋', lesson:'课程1',school:'学校1',academy:['学院1','学院2'],major:['专业1'],class:['班级1'],teacher:['教师1'],job:['作业表1'],time:'01',year:'2021',season:'春季学期'},
      {id:'002',semester:'2021春', lesson:'课程2',school:'学校2',academy:['学院2'],major:['专业2'],class:['班级2'],teacher:['教师2'],job:['作业表2'],time:'02',year:'2020',season:'春季学期'},
    ],
  },
  mutations: {
    // 添加课程
    addLesson(state, obj) {
      state.lessons.push(obj);
    },
    // 删除课程
    delLesson(state, id) {
      state.lessons = state.lessons.filter(obj => {
        return obj.id !== id
      })
    },
    // 修改课程
    changeLesson(state, id, changedObj) {
      state.lessons.forEach(obj => {
        if(obj.id === id) obj = changedObj;
      })
    }
  },
  actions: {
  },
  modules: {
  }
})

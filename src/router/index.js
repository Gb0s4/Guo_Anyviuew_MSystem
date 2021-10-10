import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入主页面
import Home from '../views/Home.vue'
// 按顺序引入
import Student from '../views/Student'
import Lesson from '../views/Lesson'
import QtBank from '../views/QtBank'
import JobsTable from '../views/JobsTable'
import CheckWork from '../views/CheckWork'
import CpEvaluation from '../views/CpEvaluation'
import ExamMm from '../views/ExamMm'
import CheckCode from '../views/CheckCode'
import AddPage from '../views/AddPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/Student',
        component: Student
      },
      {
        path: '/Lesson',
        name: 'Lesson',
        component: Lesson
      },
      {
        path: '/QtBank',
        component: QtBank
      },
      {
        path: '/JobsTable',
        component: JobsTable
      },
      {
        path: '/CheckWork',
        component: CheckWork
      },
      {
        path: '/CpEvaluation',
        component: CpEvaluation
      },
      {
        path: '/ExamMm',
        component: ExamMm
      },
      {
        path: '/CheckCode',
        component: CheckCode
      },
      {
        path: '/AddPage',
        name: 'AddPage',
        component: AddPage
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login.vue'
import BlogList from '../pages/blogList.vue'
import ArticleList from '../pages/articleList.vue'
import ArticleEdit from '../pages/articleEdit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: login
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: login
    },
    {
      path: '/blogList',
      component: BlogList,
      redirect: { path: '/blogList/articleList' },
      children: [
        {
          path: 'articleList',
          component: ArticleList
        },
        {
          path: 'articleEdit',
          component: ArticleEdit 
        }
      ]
    }
  ]
})

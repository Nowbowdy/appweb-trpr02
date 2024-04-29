import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/score',
      name: 'Score',
      component: () => import('../views/ScoreView.vue')
    },
    {
      path: '/game/:playerName/:shipName/',
      name: 'Game',
      component: () => import('../views/GameView.vue'),
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
  
  export default routes
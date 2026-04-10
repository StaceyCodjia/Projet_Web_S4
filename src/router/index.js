import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/favorites', component: () => import('../views/FavoritesView.vue') },
    { path: '/character/:id', component: () => import('../views/CharacterView.vue') }
  ]
})

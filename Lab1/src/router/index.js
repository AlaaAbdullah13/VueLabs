import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import AboutView from '../views/AboutView.vue';
import NotFound from '../views/NotFound.vue';

export default createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
  routes: [
    { path: '/', component: HomeView },
    { path: '/product/:id', component: ProductView },
    { path: '/about', component: AboutView },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
});
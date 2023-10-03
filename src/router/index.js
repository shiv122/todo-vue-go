import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '@/stores/auth';


const routes =  [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guest: true }
    },
  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isLoggedIn) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (authStore.isLoggedIn) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router

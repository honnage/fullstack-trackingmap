import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import NotFound from '@/views/404.vue'

import Dashboard from '@/views/Dashboard.vue'
// import MapView from '@/views/Map.vue'


const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    icon: 'bi bi-grid',
    meta: { auth: true }
  },
  {
    path: '/device',
    name: 'Device',
    component: Dashboard,
    icon: 'bi bi-journal-text',
    meta: { auth: true },
    // children: [
    //   {
    //     path: 'map',
    //     name: 'map',
    //     component: () => import('../views/Map.vue'),
    //     icon: 'bi bi-dash-circle',
    //     meta: { auth: true }
    //   }
    // ]
  },
  {
    path: '/Transactions',
    name: 'Transactions',
    component: Dashboard,
    icon: 'bi bi-layout-text-window-reverse',
    meta: { auth: true }
  },
  {
    path: '/Management',
    name: 'Management',
    component: Dashboard,
    icon: 'bi bi-person',
    meta: { auth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // const token = store.state.token;
  const token = localStorage.getItem('user-token');

  if (to.name === 'login' && token) { // ถ้าผู้ใช้มี token และพยายามเข้าถึงหน้า login
    next({ name: 'dashboard' }); // เปลี่ยนเส้นทางไปยังหน้าหลัก
  } else if (to.meta.auth && !token) { // ต้องการสิทธิ์การเข้าถึงและไม่มี token
    next({ name: 'login' }); // เปลี่ยนเส้นทางไปยังหน้า login
  } else {
    next(); // เปลี่ยนเส้นทางตามปกติ
  }
})

export default router

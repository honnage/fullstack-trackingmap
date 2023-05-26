import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
// import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {auth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) { // ต้องการสิทธิ์การเข้าถึง
    // const token = store.state.token;
    const token = localStorage.getItem('token-user')

    if (token) { // ตรวจสอบว่ามี token หรือไม่
      next(); // มี token ให้ไปต่อ
    } else {
      next('/login'); // ไม่มี token ให้เปลี่ยนเส้นทางไปยังหน้า "/login"
    }
  } else {
    next(); // ไม่ต้องการสิทธิ์การเข้าถึง ให้ไปต่อโดยไม่ต้องตรวจสอบ token
  }
});
export default router

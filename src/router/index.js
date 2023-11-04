import VueRouter from 'vue-router';

import Train from "../pages/Train";
import Login from "../pages/Login";

const router = new VueRouter({
  routes: [
    {
      path: '/Train',
      name: 'Train',
      component: Train,
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
  ],
});

export default router;

import VueRouter from 'vue-router';

import Train from "../pages/Train";
import Login from "../pages/Login";
import Test from "../pages/Test";

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
    {
      path: '/Test',
      name: 'Test',
      component: Test,
    },
  ],
});

export default router;

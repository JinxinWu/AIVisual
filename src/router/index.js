import VueRouter from 'vue-router';

import Train from "../pages/Train";
import Login from "../pages/Login";
import Test from "../pages/Test";
import Log from "../pages/Log";

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
    {
      path: '/Log',
      name: 'Log',
      component: Log,
    },
  ],
});

export default router;

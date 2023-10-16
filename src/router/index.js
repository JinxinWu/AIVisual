import VueRouter from 'vue-router';

import Train from "../pages/Train";
import Test from "../pages/Test";
import Login from "../pages/Login";
import VueTest from "@/components/Test";

const router = new VueRouter({
  routes: [
    {
      path: '/Train',
      name: 'Train',
      component: Train,
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/VueTest',
      name: 'VueTest',
      component: VueTest,
    }
  ],
});

export default router;

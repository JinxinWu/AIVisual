import VueRouter from 'vue-router';

import Train from "../pages/Train";
import Login from "../pages/Login";
import Log from "../pages/Log";
import Chat from "../pages/Chat";
import Predict from "../pages/Predict";
import Test from "../pages/Test"

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
      path: '/Log',
      name: 'Log',
      component: Log,
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat,
    },
    {
      path: '/Predict',
      name: 'Predict',
      component: Predict,
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test,
    }
  ],
});

export default router;

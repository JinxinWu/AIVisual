import VueRouter from 'vue-router';

import Train from "../pages/Train";
import Login from "../pages/Login";
import ModelLog from "../pages/ModelLog";
import ApplyLog from "../pages/ApplyLog";
import Chat from "../pages/Chat";
import Predict from "../pages/Predict";
import Test from "../pages/Test";
import Administrator from "../pages/Administrator";
import AdLog from "../pages/AdLog";
import AdMolLog from "../pages/AdMolLog";
const router = new VueRouter({
  routes: [
    {
      path: '/Train',
      name: 'Train',
      component: Train,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    //默认为登录页面
    {
      path: '/',
			name: '/',
			redirect: '/login',
    },
    {
      path: '/ModelLog',
      name: 'ModelLog',
      component: ModelLog,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/ApplyLog',
      name: 'ApplyLog',
      component: ApplyLog,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/Predict',
      name: 'Predict',
      component: Predict,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/Administrator',
      name: 'Administrator',
      component: Administrator,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/AdLog',
      name: 'AdLog',
      component: AdLog,
      meta: {
				requireAuth: true
			},
    },
    {
      path: '/AdMolLog',
      name: 'AdMolLog',
      component: AdMolLog,
      meta: {
				requireAuth: true
			},
    }
  ],
});

export default router;


//登录拦截
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       //如果需要就执行下面的代码
//       var num=sessionStorage.getItem("isLogin");//登录页面设置
//       if (num==1) {  
//           //如果登录了，就跳转到'/index'路径
//           next();
//       }
//   else {
//           next({
//               path: '/login',//返回登录界面
//               // query: {redirect: to.fullPath}  
//           })
//       }
//   }
//   else {
//       next();
//   }
// })

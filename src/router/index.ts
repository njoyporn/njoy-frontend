import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.view.vue'
import BrowseComponent from "@/components/home/BrowseComponent.vue";
import WatchView from '@/views/Watch.view.vue';
import WatchComponent from '@/components/watch/WatchComponent.vue';
import { AccountsAPI } from '@/api/accounts/accounts.api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'BrowseComponent',
          component: BrowseComponent
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.view.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.view.vue')
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('../views/Logout.view.vue')
    },
    {
      path: '/disclaimer',
      name: 'Disclaimer',
      component: () => import('@/components/shared/legal/DisclaimerComponent.vue')
    },
    {
      path: '/impressum',
      name: 'Impressum',
      component: () => import('@/components/shared/legal/ImpressumComponent.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue'),
      children: [
        {
          path: '',
          name: 'DashboardComponent',
          component: () => import('@/components/dashboard/DashboardComponent.vue')
        }
      ]
    },
    {
      path: '/watch',
      name: 'Watch',
      component: WatchView,
      children: [
        {
          path: ':id',
          name: 'WatchComponent',
          component: WatchComponent
        }
      ]
    },
    {
      path: '/category',
      name: 'Category',
      component: () => import('@/views/Category.view.vue'),
      children: [
        {
          path: '',
          name: 'CategoriesComponent',
          component: () => import("@/components/category/CategoriesComponent.vue")
        }
      ]
    },
    {
      path: '/search',
      name : 'Search',
      component: () => import('@/views/Search.view.vue'),
      children: [
        {
          path: '',
          name: 'SearchComponent',
          component: () => import('@/components/search/SearchComponent.vue')
        },
        {
          path: ':search',
          name: 'ParamSearchComponent',
          component: () => import('@/components/search/SearchComponent.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: "/",
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (to.path == '/dashboard' && !await AccountsAPI.verifyRole('administrator')) {
    router.push({path: "/"})
  }
})

export default router

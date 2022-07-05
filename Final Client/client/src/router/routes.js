const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/about', component: () => import('pages/AboutPage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/signup', component: () => import('pages/SignupPage.vue') },
      { path: '/account', component: () => import('pages/AccountPage.vue') },
      { path: '/articles', component: () => import('pages/ArticlesPage.vue') },
      { path: '/article/:id', component: () => import('pages/ArticlePage.vue') },
      { path: '/cart', component: () => import('pages/ShoppingCartPage.vue') },
      { path: '/orders', component: () => import('pages/OrdersPage.vue') },
      { path: '/orders/:id', component: () => import('pages/OrderPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

export default {
  path: '/movie',
  component: () => import('@/views/Movie'),
  children:[
    {
      path: 'city',
      component: () => import('@/components/City')
    },
    {
      path: 'commingsoon',
      component: () => import('@/components/Commingsoon')
    },
    {
      path: 'nowplaying',
      component: () => import('@/components/Nowplaying')
    },
    {
      path: 'search',
      component: () => import('@/components/Search')
    },
    {
      path:'/movie',
      redirect:'/movie/city'
    }
  ]
}

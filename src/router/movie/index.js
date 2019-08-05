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
      // 动态路由传递id
      path: 'detail/1/:movieid',
      // 命名视图配置是conponents
      components:{
        // 当列表页有多个路由区域，点击到详情页的时候列表页会有一个白屏，所以呢要加一个default,默认匹配到哪个列表
        default: () => import('@/components/Nowplaying'),
        detail: () => import('@/views/Movie/detail')
      },
      props:{
        detail:true  //在使用了多视图的情况下，要配置命名为true
      }
    },
    {
      path: 'detail/2/:commid',
      components: {
        default: () => import('@/components/Commingsoon'),
        detail: () => import('@/views/Movie/detail')
      },
      props: {
        detail: true
      }
    },
    {
      path:'/movie',
      redirect:'/movie/city'
    }
  ]
}

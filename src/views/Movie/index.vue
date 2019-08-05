<template>
  <div id="main">
    <Header title="喵喵电影"></Header>
    <div id="content">
      <div class="movie_menu">
        <router-link to="/movie/city" tag="div" class="city_name active">
          <span>{{ $store.state.City.nm }}</span><i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link to="/movie/nowplaying" tag="div" class="hot_item">正在热映</router-link>
          <router-link to="/movie/commingsoon" tag="div" class="hot_item">即将上映</router-link>
        </div>
        <router-link to="/movie/search" tag="div" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
    </div>
    <keep-alive>
      <!-- Keep-alive是vue内置的一个组件，可以使被包裹的组件保留状态，
        避免重新渲染 缓存 movie/city  movie/nowplaying  movie/commingsoon-->
        <router-view />
    </keep-alive>
    </div>
    <TabBar/>
    <!-- 命名视图 -->
    <router-view name="detail" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import { messageBox } from '@/components/JS';
export default {
  name: 'Movie',
  components: {
    Header,
    TabBar,
  },
  mounted(){
            this.axios.get('/api/getLocation').then((res)=>{
                var msg = res.data.msg;
                if(msg === 'ok'){
                  console.log(res)
                    var nm = res.data.data.nm;
                    var id = res.data.data.id;
                    if( this.$store.state.City.id == id ){return;}
                    messageBox({
                        title : '定位',
                        content : nm,
                        cancel : '取消',
                        ok : '切换定位',
                        handleOk(){
                            window.localStorage.setItem('newnm',nm);
                            window.localStorage.setItem('newid',id);
                            window.location.reload();
                        }
                    });
                }
            });
  }
}
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}

.slide-enter-active{ animation : 13s detailMove;}
@keyframes detailMove{
	0%{
		transform : translateX(100%);
	}
	100%{
		transform : translateX(0);
	}
}

</style>

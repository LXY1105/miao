<template>
  <div id="footer">
	<ul>
		<router-link to="/movie" tag="li" activeClass="active">
			<i class="iconfont icon-dianying"></i>
			<p>电影</p>
		</router-link> 
		<router-link to="/cinema" tag="li">
			<i class="iconfont icon-yingyuan"></i>
			<p>影院</p>
		</router-link>
		<router-link to="/mine" tag="li">
			<i class="iconfont icon-wode"></i>
			<p>我的</p>
		</router-link>
	</ul>
	</div>
</template>

<script>
export default {
}
</script>

<style scoped>
#footer{width: 100%;height: 50px;background: white;position: fixed;
left:0;bottom: 0;border-top:2px #ebe8e3 solid;}
#footer ul{display: flex;text-align: center;align-items: flex-start;height:50px;}
#footer ul li{flex:1;height: 40px;}
#footer ul li.active{ color: #f03d37;}
/* vue自带的一个类 */
#footer ul li.router-link-active{ color: #f03d37;}
#footer ul i{ font-size: 20px;}
#footer ul p{ font-size: 12px; line-height: 18px;}
</style>

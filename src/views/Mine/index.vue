<template>
  <div id="main">
    <!-- 父组件传值 静态直接用属性title=""，动态用v-bind:title=""-->
    <Header title="我的喵喵"></Header>
    <div id="content">
      <login></login>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Login from '@/components/Login';
export default {
  name:'Mine',
  components: {
    Header,
    TabBar,
    Login
  }
}
</script>

<style>

</style>

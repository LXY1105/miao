<template>
  <div id="Header">
		<h1>{{title}} </h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  // 子组件使用props来接受，
  props: {
    title: {
      type: String,
      default: '喵喵电影'
    }
  }
}
</script>

<style scoped>
/* align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
#Header{width: 100%;height: 50px;background: #e54847;color:#FFF; position: relative;
border-bottom: 1px solid #e54847;}
#Header h1{font-size: 18px;font-weight: normal;text-align: center;line-height: 50px;}

</style>

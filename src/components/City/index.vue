<template>
<div class="city_body">
  <div class="city_list">
        <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
                <li v-for="item in HotList" :key="item.id">{{ item.nm }}</li>
            </ul>
        </div>
        <div class="city_sort" ref="city_sort">
            <div v-for="item in CityList" :key="item.index">
                <h2>{{ item.index }}</h2>
                <ul>
                    <li v-for="itemList in item.list" :key="itemList.id" >{{ itemList.nm }}</li>
                </ul>
            </div>	
        </div>
    </div>
    <div class="city_index">
        <ul>
            <li v-for="(item,idx) in CityList" :key="item.idx" 
            @touchstart="handleToIndex(idx)">{{ item.index }}</li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
  name:'city',
  data(){
    return {
      CityList:[],
      HotList:[]
    }
  },
  mounted() {
    this.axios('/api/cityList').then((res)=>{
      var cities = res.data.data.cities;
      // 数据改造格式 [{index:'B'},{nm:'北京',py: "beijing"}]
      var{CityList,HotList} = this.ReseCitytlist(cities);
      this.CityList = CityList;
      this.HotList = HotList;
    })
    },
    methods:{
      ReseCitytlist(cities){
        var CityList = [];
        var HotList = [];

        // 热门城市
        for(var i=0;i<cities.length;i++){
          if(cities[i].isHot === 1){
            HotList.push(cities[i])
          }
        }

        for (var i = 0; i < cities.length; i++) {
          var firstLetter = cities[i].py.substring(0,1).toUpperCase();
            if(toCon(firstLetter)){//新添加
              CityList.push( { index : firstLetter, list : [{ nm : cities[i].nm, id: cities[i].id }]})
            }else{
              for(var j=0;j<CityList.length;j++){
                if(CityList[j].index === firstLetter){
                  //r如果py字母之间相等，就累加城市
                  CityList[j].list.push({ nm : cities[i].nm, id: cities[i].id })
                }
              }
            }
        }

      //从A-M排序
      CityList.sort((n1,n2)=>{
        if(n1.index>n2.index){
          return 1;
        }else if(n1.index<n2.index){
          return -1;
        }else{
          return 0
        }
      })

        function toCon(firstLetter){
          for (var i = 0; i < CityList.length; i++) {
              if(CityList[i].index === firstLetter){//累加条件
                return false;
              }
          }
          return true;//新添加条件
        }
        console.log(CityList,HotList)
        return {
          CityList,
          HotList
        }
      },
      handleToIndex(idx){
        var h2 = this.$refs.city_sort.getElementsByTagName('h2');
        this.$refs.city_sort.parentNode.scrollTop = h2[idx].offsetTop;
        // h2标签本身也是一个数组,与idx有一一对应关系
      }
    }
  }
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: fixed;
 top: 53px; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>

<template>
<div class="cinema_body">
    <Loading v-if="isLoading"/>
    <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
        <ul>
            <li class="pullDown">{{pullDownMsg}}</li>
            <li v-for="item in cinemaList" :key="item.id">
                <div>
                    <span>{{ item.nm }}</span>
                    <span class="q"><span class="price">{{ item.sellPrice }}</span> 元起</span>
                </div>
                <div class="address">
                    <span>{{ item.addr }}</span>
                    <span>{{ item.distance }}</span>
                </div>
                <div class="card">
                    <div v-for="(num,key) in item.tag"  v-if="num===1" :key="key" :class=" key | classCard ">{{ key | formatCard}}</div>
                </div>
            </li>
        </ul>
    </Scroller>
</div>    
</template>

<script>
export default {
    name: 'Clist',
    data() {
        return {
            cinemaList:[],
            pullDownMsg:'',
            isLoading: true
        }
    },
    activated () {
        var cityId = this.$store.state.City.id;
        this.axios.get('/api/cinemaList?cityId='+cityId).then((res)=>{
            var msg = res.data.msg;
            if(msg === 'ok'){
                this.cinemaList = res.data.data.cinemas;
                this.isLoading = false
            }   
        });
    },
    filters: {
        formatCard: function (key) {
            var car = [
            { key : 'allowRefund', value : '分配' },
            { key : 'endorse', value : '签名' },
            { key : 'sell', value : '折扣卡' },
            { key : 'snack' , value : '小吃'}
            ];
            for(var i = 0; i < car.length; i++ ){
                if( car[i].key === key ){
                    return car[i].value;
                }
            }
            return '';
        },
        classCard: function (key) {
            var car = [
            { key : 'allowRefund', value : 'or' },
            { key : 'endorse', value : 'or' },
            { key : 'sell', value : 'bl' },
            { key : 'snack' , value : 'bl'}
            ];
            for(var i = 0; i < car.length; i++ ){
                if( car[i].key === key ){
                    return car[i].value;
                }
            }
            return '';
        }
    },
    methods : {
        handleToScroll (pos) {
            if(pos.y>30){
                this.pullDown = '正在下拉刷新中'
            }
            
        },
        handleToTouchEnd (pos) {
            if(pos.y>30){
                this.pullDownMsg = '更新成功';
                this.axios.get('/api/cinemaList?cityId=10').then((res)=>{
                    var msg = res.data.msg;
                    if(msg === 'ok'){
                        setTimeout(()=>{
                            this.cinemaList = res.data.data.cinemas;
                            this.pullDownMsg = '';
                        },100);
                    }
                });
            }
        }
    }
}
</script>

<style>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
.cinema_body .pullDown{ margin:0; padding:0; border:none;}
</style>

<template>
    <div class="index_bg">
        <div class="index_move" :class="{ 'index_move_toggle': toggle }">
            <p class="index_move_p">
                <span :class="{ 'fade': !toggle }">Britain</span>
                <span :class="{ 'fade': toggle }" class="fr">China</span>
            </p>
        </div>
        <div class="index_center text-center">
            <div class="index_time">
                <div class="outterCircle"><img src="/static/img/secondBoxOutterCircle.png" class="img-responsive"></div>
                <div class="innerCircle"><img src="/static/img/secondBoxInnerCircle.png" class="img-responsive"></div>
                <h1 class="index_h1"  v-if="toggleTime">{{hour}}<span @click="move"> H </span>{{minute}}</h1>
                <div class="second_box">
                    <transition-group name="second" tag="div">
                        <span v-for="decade in secondDecade" :key="decade" class="second_s second_decade">
                            {{ decade }}
                        </span>
                    </transition-group>
                    <transition-group name="second" tag="div">
                        <span v-for="unit in secondUnit" :key="unit" class="second_s second_unit">
                            {{ unit }}
                        </span>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment-timezone'

    export default {
        data(){
            return {
                hour: '',
                minute: '',
                secondDecade: [],
                secondUnit: [],
                toggle: false,
                toggleTime: true
            }
        },
        mounted(){
            const localToggle = localStorage.getItem('indexToggle');
            if(localToggle) this.toggle = true;
            this.getTime();
            this.startTime = setInterval(this.getTime,500)
        },
        methods: {
            getTime(){
                const site = this.toggle? "Europe/London":"Asia/Shanghai";
                var today = moment().tz(site);
                var h = today.format('H');
                var m = today.format('m');
                var s = today.format('s');
                h = this.checkTime(h);
                m = this.checkTime(m);
                s = this.checkTime(s);
                this.hour = h;
                this.minute = m;
                this.secondDecade.pop();
                this.secondDecade.push(s.toString()[0]);
                this.secondUnit.pop();
                this.secondUnit.push(s.toString()[1])
            },
            checkTime(i){
                if (i < 10) {
                    i = "0" + i
                }
                return i
            },
            move(){
                this.toggle = !this.toggle;
                this.toggle? localStorage.setItem('indexToggle',"1"):localStorage.removeItem('indexToggle');

            }
        },
        beforeDestroy () {
            clearInterval(this.startTime);
        }
    }
</script>

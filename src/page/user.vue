<template>
    <div>
        <com-userBanner></com-userBanner>
        <div class="container pad_t15">
            <com-userTab :uid="uid"></com-userTab>
            <router-view :uid="uid"></router-view>
        </div>
    </div>
</template>

<script>
    import userBanner from '../components/user/banner'
    import userTab from '../components/user/tab'
    import { mapGetters,mapActions } from 'vuex'

    export default {
        components: {
            comUserBanner: userBanner,
            comUserTab:userTab
        },
        data(){
            return {
                uid:this.$route.params.uid
            }
        },
        computed: {
            ...mapActions({
                userInfo: 'userInfo'
            })
        },
        mounted(){
            if(this.uid){
                this.$store.dispatch('userInfo',this.uid);
            }
        },
        watch:{
            $route(){
                if(this.$route.params.uid && this.uid !== this.$route.params.uid){
                    this.uid = this.$route.params.uid;
                    this.$store.dispatch('userInfo',this.$route.params.uid);
                }
            }
        }
    }
</script>

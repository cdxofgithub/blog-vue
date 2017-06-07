<template>
    <div class="header">
        <div class="container">
            <div class="logo"><router-link to="/"><img src="/static/img/xinboke.png" alt="眼镜博客" width="150" height="50"></router-link></div>
            <div class="nav_category" @click="toggleNav"><i class="iconfont icon-category"></i></div>
            <div class="nav_mobile" v-show="showNav" @click="toggleNav">
                <ul>
                    <li><router-link to="/"  class="nav_mobile_a">主页</router-link></li>
                    <li><router-link to="/dairy" class="nav_mobile_a">博客</router-link></li>
                    <li><router-link to="/photo" class="nav_mobile_a">照片墙</router-link></li>
                    <li v-if="!getAuth"><router-link to="/login" class="nav_mobile_a">登录</router-link></li>
                    <li v-else>
                        <router-link :to="{ name: 'userIndex', params: { uid: getAuth.id }}">{{getAuth.nickname}}</router-link>
                    </li>
                </ul>
            </div>
            <div class="nav clearfix">
                <ul>
                    <li><router-link to="/"  class="nav_a" active-class="nav_active" exact>主页</router-link></li>
                    <li><router-link to="/dairy" class="nav_a" active-class="nav_active">博客</router-link></li>
                    <li><router-link to="/photo" class="nav_a" active-class="nav_active">照片墙</router-link></li>
                    <li v-if="!getAuth"><router-link to="/login" class="nav_a" active-class="nav_active">登录</router-link></li>
                    <li v-else>
                        <a href="javascript:void(0)" class="nav_user">
                            <img :src="getAuth.header" class="circle" width="30" height="30"> {{getAuth.nickname}}
                            <ul class="nav_user_ul">
                                <li><router-link :to="{ name: 'userIndex', params: { uid: getAuth.id }}">我的主页</router-link></li>
                                <li><router-link :to="{ name: 'userAlbum', params: { uid: getAuth.id }}">我的相册</router-link></li>
                                <li><router-link to="/set/">管理中心</router-link></li>
                                <li class="nav_user_line"></li>
                                <li><a href="javascript:void(0)" class="text-center" @click="logout()">退出</a></li>
                            </ul>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters ,mapActions } from 'vuex'

    export default {
        data(){
            return {
                showNav: false
            }
        },
        computed: {
            ...mapGetters({
                getToken: 'getToken',
                getAuth:'getAuth'
            }),
            ...mapActions({
                userLogout: 'userLogout',
                authInfo: 'authInfo'
            })
        },
        mounted(){
            if(this.getToken){
                this.$store.dispatch('authInfo');
            }
        },
        methods:{
            logout(){
                this.$store.dispatch('userLogout');
            },
            toggleNav(){
                this.showNav = !this.showNav;
            }
        }
    }
</script>

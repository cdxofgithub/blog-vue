<template>
    <div>
        <div class="panel_s clearfix" v-if="user()">
            <router-link to="/article" class="btn btn-info col-xs-12">写博客</router-link>
        </div>
        <div class="panel_s">
            <div class="panel_homepage_num clearfix text-center">
                <div class="col-xs-4 panel_homepage_box">
                    <router-link :to="{ name: 'userIndex', params: { uid }}">
                        <strong>{{getUser.info.articleCount}}</strong>
                        <span>博客</span>
                    </router-link>
                </div>
                <div class="col-xs-4 panel_homepage_box">
                    <router-link :to="{ name: 'userIndex', params: { uid }}">
                        <strong>{{getUser.info.collectCount}}</strong>
                        <span>收藏</span>
                    </router-link>
                </div>
                <div class="col-xs-4 panel_homepage_box">
                    <router-link :to="{ name: 'userAlbum', params: { uid }}">
                        <strong>{{getUser.info.photoCount}}</strong>
                        <span>相册</span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="panel_s" v-if="getUser.info.friend">
            <h5>小伙伴</h5>
            <div class="panel_s_body">
                <router-link :to="{ name: 'userTogether', params: { uid: getUser.info.friend._id }}">
                    <img class="circle" :src="getUser.info.friend.header" alt="" width="50" height="50">
                    <strong>{{getUser.info.friend.nickname}}</strong>
                </router-link>
            </div>
        </div>
        <div class="panel_s">
            <h5>个人信息</h5>
            <div class="panel_s_body">
                <ul class="ul_text">
                    <li>昵称：{{getUser.info.nickname}}</li>
                    <li v-if="getUser.info.sex == 1">性别：男</li>
                    <li v-if="getUser.info.sex == 2">性别：女</li>
                    <li v-if="getUser.info.showEmail == 1">邮箱：{{getUser.info.email}}</li>
                    <li v-if="getUser.info.birthdayMonth != 0 && getUser.info.birthdayDay != 0">生日： {{getUser.info.birthdayMonth}}月{{getUser.info.birthdayDay}}日</li>
                    <li v-if="getUser.info.summary">简介：{{getUser.info.summary}}</li>
                </ul>
            </div>
            <div class="panel_s_foot">
                <router-link :to="{ name: 'userInfo', params: { uid }}">
                    <strong>查看更多</strong>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data(){
            return {

            }
        },
        props: {
            uid: ''
        },
        computed: {
            ...mapGetters({
                getUser:'getUser'
            })
        },
        methods:{
            user(){
                return this.getUser.own;
            }
        }
    }
</script>

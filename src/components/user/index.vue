<template>
    <div class="row">
        <div class="col-md-3">
            <com-userSidebar :uid="uid"></com-userSidebar>
        </div>
        <div class="col-md-9 pad_l0">
            <div class="row dairy-line">
                <div class="col-md-12">
                    <div class="panel panel_dairy hover_sh" v-for="arcitle in getArticleUser.list">
                        <div class="panel_tit">
                            <router-link :to="{ name: 'page', params: { aid: arcitle._id }}">
                                <h4>{{arcitle.title}}</h4>
                            </router-link>
                        </div>
                        <div class="panel_body">
                            <div class="row">
                                <div class="col-sm-10">
                                    <router-link :to="{ name: 'page', params: { aid: arcitle._id }}">
                                        <div class="panel_content" v-html="arcitle.content"></div>
                                    </router-link>
                                </div>
                                <div class="col-sm-2 col-xs-6 pad_l0">
                                    <img class="panel_body_img" :src="arcitle.image">
                                </div>
                            </div>
                        </div>
                        <div class="panel_foot">
                            <span title="日期"><i class="iconfont icon-clock"></i> {{arcitle.created | date}}</span>
                            <span class="hide_mobile" title="标签"><i class="iconfont icon-discount"></i> {{arcitle.tag}}</span>
                            <span class="hide_mobile" title="阅读"><i class="iconfont icon-browse"></i> {{arcitle.pv}}</span>
                            <span class="hide_mobile" title="留言"><i class="iconfont icon-comments"></i> {{arcitle.commentCount}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel_msg">
                <template v-if="getArticleUser.status == 0">加载更多</template>
                <template v-if="getArticleUser.status == 1">加载中...</template>
                <template v-if="getArticleUser.status == 2">没有更多博客啦</template>
            </div>
        </div>
    </div>
</template>
<script>
    import userSidebar from './sidebar'
    import { mapGetters ,mapActions } from 'vuex'

    export default {
        components:{
            comUserSidebar:userSidebar
        },
        data(){
            return {

            }
        },
        props: {
            uid: ''
        },
        computed: {
            ...mapGetters({
                getArticleUser: 'getArticleUser',
            }),
            ...mapActions({
                articleUser: 'articleUser',
                articleUserClear: 'articleUserClear',
            }),

        },
        mounted(){
            this.$store.dispatch('articleUserClear');
            this.loadArticle();
            window.addEventListener('scroll',this.loadMore);
        },
        methods: {
            loadArticle(){
                const id = this.$route.params.uid;
                const lastArcitle = this.getArticleUser.list[this.getArticleUser.list.length - 1 ];
                const time = lastArcitle?new Date(lastArcitle.created):new Date();
                const data = id + '/' + time.getTime();
                this.$store.dispatch('articleUser', data);
            },
            loadMore() {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const allHeight = document.body.scrollHeight;
                const pageHeight =  document.documentElement.clientHeight;
                if(scrollTop == allHeight - pageHeight && this.getArticleUser.status == 0){
                    this.loadArticle()
                }
            }
        },
        filters: {
            date: function (value) {
                var date = new Date(value);
                return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"

            }
        },
        beforeDestroy () {
            window.removeEventListener('scroll',this.loadMore);
        },
        watch:{
            uid(){
                this.$store.dispatch('articleUserClear');
                this.loadArticle();
            }
        }
    }
</script>

<template>
    <div class="together_line">
        <div class="row" v-for="arcitle in getArticleTogether.list">
            <div class="col-md-6" v-bind:class="{'col-md-offset-6': arcitle.authId.sex == 2}">
                <div class="panel hover_sh" v-bind:class="[arcitle.authId.sex == 1?'panel_dairy':'panel_dairy_right']">
                    <div class="panel_tit">
                        <router-link :to="{ name: 'page', params: { aid: arcitle._id }}">
                            <h4>{{arcitle.title}}</h4>
                        </router-link>
                    </div>
                    <div class="panel_body">
                        <div class="row">
                            <div class="col-sm-9">
                                <router-link :to="{ name: 'page', params: { aid: arcitle._id }}">
                                    <div class="panel_content" v-html="arcitle.content"></div>
                                </router-link>
                            </div>
                            <div class="col-sm-3 col-xs-6 pad_l0">
                                <img class="panel_body_img" :src="arcitle.image">
                            </div>
                        </div>
                    </div>
                    <div class="panel_foot">
                        <span title="日期"><i class="iconfont icon-clock"></i> {{arcitle.created | date}}</span>
                        <span><i class="iconfont icon-account"></i> <router-link :to="{ name: 'userIndex', params: { uid:arcitle.authId._id }}" class="link"> {{arcitle.authId.nickname}}</router-link></span>
                        <span class="hide_mobile" title="标签"><i class="iconfont icon-discount"></i> {{arcitle.tag}}</span>
                        <span class="hide_mobile" title="阅读"><i class="iconfont icon-browse"></i> {{arcitle.pv}}</span>
                        <span class="hide_mobile" title="留言"><i class="iconfont icon-comments"></i> {{arcitle.commentCount}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel_msg">
            <template v-if="getArticleTogether.status == 0">加载更多</template>
            <template v-if="getArticleTogether.status == 1">加载中...</template>
            <template v-if="getArticleTogether.status == 2">没有更多博客啦</template>
        </div>
    </div>
</template>
<script>
    import { mapGetters ,mapActions } from 'vuex'

    export default {
        data(){
            return {

            }
        },
        computed: {
            ...mapGetters({
                getArticleTogether: 'getArticleTogether',
            }),
            ...mapActions({
                articleTogether: 'articleTogether',
                articleTogetherClear: 'articleTogetherClear',
            }),
        },
        mounted(){
            this.$store.dispatch('articleTogetherClear');
            this.loadArticle();
            window.addEventListener('scroll',this.loadMore);
        },
        methods: {
            loadArticle(){
                const id = this.$route.params.uid;
                const lastArcitle = this.getArticleTogether.list[this.getArticleTogether.list.length - 1 ];
                const time = lastArcitle?new Date(lastArcitle.created):new Date();
                const data = id + '/' + time.getTime();
                this.$store.dispatch('articleTogether', data);
            },
            loadMore() {
                const scrollTop = document.body.scrollTop;
                const allHeight = document.body.scrollHeight;
                const pageHeight =  document.documentElement.clientHeight;
                if(scrollTop == allHeight - pageHeight && this.getArticleTogether.status == 0){
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
    }
</script>

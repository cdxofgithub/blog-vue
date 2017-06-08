<template>
    <div>
        <com-search @keyword-change="keywordChange"></com-search>
        <div class="container pad_t15">
            <div class="row">
                <div class="col-md-9">
                    <div class="panel_h">
                        <h3><i class="iconfont icon-office h3_icon"></i> 博客</h3>
                    </div>
                    <div class="row dairy-line">
                        <div class="col-md-12">
                            <div class="panel panel_dairy hover_sh" v-for="arcitle in getArticleList.list">
                                <div class="panel_tit">
                                    <router-link :to="{ name: 'page', params: { aid: arcitle._id }}"><h4>{{arcitle.title}}</h4></router-link>
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
                                    <span><i class="iconfont icon-account"></i> <router-link :to="{ name: 'userIndex', params: { uid: arcitle.authId._id }}" class="link">{{arcitle.authId.nickname}}</router-link></span>
                                    <span class="hide_mobile" title="标签"><i class="iconfont icon-discount"></i> {{arcitle.tag}}</span>
                                    <span class="hide_mobile" title="阅读"><i class="iconfont icon-browse"></i> {{arcitle.pv}}</span>
                                    <span class="hide_mobile" title="留言"><i class="iconfont icon-comments"></i> {{arcitle.commentCount}}</span>
                                </div>
                            </div>
                       </div>
                    </div>
                    <div class="panel_msg">
                        <template v-if="getArticleList.status == 0">加载更多</template>
                        <template v-if="getArticleList.status == 1">加载中...</template>
                        <template v-if="getArticleList.status == 2">没有更多博客啦</template>
                    </div>
                </div>
                <div class="col-md-3 pad_l0 hide_mobile">
                    <div class="panel_s" v-if="getAuth">
                        <div class="panel_head">
                            <div class="panel_head_img">
                                <router-link :to="{ name: 'userIndex', params: { uid: getAuth.id }}">
                                    <img class="circle" :src="getAuth.header" width="100" height="100">
                                </router-link>
                            </div>
                        </div>
                        <div class="panel_user">
                            <p>
                                <router-link :to="{ name: 'userIndex', params: { uid: getAuth.id }}">
                                    <strong>{{getAuth.nickname}}</strong>
                                </router-link>
                            </p>
                            <div class="panel_homepage_num clearfix text-center">
                                <div class="col-xs-4 panel_homepage_box">
                                    <router-link :to="{ name: 'userIndex', params: { uid: getAuth.id }}">
                                        <strong>{{getAuth.articleCount}}</strong>
                                        <span>博客</span>
                                    </router-link>
                                </div>
                                <div class="col-xs-4 panel_homepage_box">
                                    <router-link :to="{ name: 'userIndex', params: { uid: getAuth.id }}">
                                        <strong>{{getAuth.collectCount}}</strong>
                                        <span>收藏</span>
                                    </router-link>
                                </div>
                                <div class="col-xs-4 panel_homepage_box">
                                    <router-link :to="{ name: 'userAlbum', params: { uid: getAuth.id }}">
                                        <strong>{{getAuth.photoCount}}</strong>
                                        <span>图片</span>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="panel_s">
                        <h5>
                           标签
                        </h5>
                        <div class="panel_s_body">
                            <ul class="ul_text">
                               <li v-for="(tag,index) in getTags">
                                   <a href="javascript:void(0)" v-bind:class="{link: tagName==getTags[index]}" @click="tagChange(index)">{{tag}}</a>
                               </li>
                            </ul>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    </div>
</template>

<script>
    import search from '../components/search'
    import { mapGetters ,mapActions } from 'vuex'

    export default {
        components: {
            comSearch: search
        },
        data(){
            return {
                keyword: '',
                tagName: ''
            }
        },
        computed: {
            ...mapGetters({
                getArticleList: 'getArticleList',
                getAuth: 'getAuth',
                getTags: 'getTags',
                getSearch: 'getSearch'
            }),
            ...mapActions({
                articleList: 'articleList',
                articleClear: 'articleClear',
                articleKeyword: 'articleKeyword',
                articleTagName: 'articleTagName',
                tags: 'tags'
            })

        },
        mounted(){
            this.$store.dispatch('articleClear');
            this.$store.dispatch('tags');
            this.tagName = this.getArticleList.tagName;
            this.loadArticle();
            window.addEventListener('scroll',this.loadMore);

        },
        methods: {
            keywordChange(val){
                this.keyword = val;
            },
            tagChange(index){
                if(this.tagName == this.getTags[index]){
                    this.tagName = ''
                }else{
                    this.tagName = this.getTags[index]
                }
                this.$store.dispatch('articleClear');
                this.$store.dispatch('articleTagName',this.tagName);
                this.loadArticle()
            },
            loadArticle(){
                const lastArcitle = this.getArticleList.list[this.getArticleList.list.length - 1 ];
                const time = lastArcitle?new Date(lastArcitle.created):new Date();
                var data = time.getTime();
                if(this.getArticleList.keyword || this.getArticleList.tagName){
                    data += '?';
                    if(this.getArticleList.keyword) data = data + 'search=' + this.getArticleList.keyword;
                    if(this.getArticleList.tagName) data = data + '&tag=' + this.getArticleList.tagName;
                }
                this.$store.dispatch('articleList', data);
            },
            loadMore() {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const allHeight = document.body.scrollHeight;
                const pageHeight =  document.documentElement.clientHeight;
                if(scrollTop == allHeight - pageHeight && this.getArticleList.status == 0){
                    this.loadArticle()
                }
            }
        },
        watch:{
            keyword(){
                this.$store.dispatch('articleClear');
                this.$store.dispatch('articleKeyword',this.keyword);
                this.loadArticle()
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
        }

    }
</script>


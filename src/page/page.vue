<template>
    <div>
        <div class="container pad_t75" v-if="getArticle.authId">
            <div class="panel_h clearfix">
                <h3 class="row">
                    <div class="col-md-4 col-xs-6"><i class="iconfont icon-toys h3_icon"></i> {{getArticle.created | date}}</div>
                    <div class="col-md-4 col-xs-3 text-center">{{getArticle.created | week}}</div>
                    <div class="col-md-4 col-xs-3 text-center">{{getArticle.weather}}</div>
                </h3>
            </div>
            <div class="row">
                <div class="col-md-9">
                    <div class="panel">
                        <div class="panel_tit">
                            <h4>{{getArticle.title}}</h4>
                        </div>
                        <div class="panel_body">
                            <div class="row markdown-body">
                                <div class="col-sm-12" v-html="getArticle.content"></div>
                            </div>
                        </div>
                        <div class="panel_foot">
                            <span title="标签"><i class="iconfont icon-discount"></i> {{getArticle.tag}}</span>
                            <span title="阅读"><i class="iconfont icon-browse"></i> {{getArticle.pv}}</span>
                            <span v-if="getArticleOwn"><router-link :to="{ name: 'edit', params: {aid}}">编辑</router-link></span>
                            <span v-if="getArticleOwn" class="page_more">
                                <a href="javascript:void(0)">更多</a>
                                <ul class="page_more_ul">
                                    <li>
                                        <a href="javascript:void(0)" @click="toggelStatus">
                                            <template v-if="getArticle.status == 0">未公开</template>
                                            <template v-if="getArticle.status == 1">已公开</template>
                                        </a>
                                    </li>
                                    <li><a href="javascript:void(0)" @click="delArticleModal">删除</a></li>
                                </ul>
                            </span>
                        </div>
                    </div>
                    <div class="panel_s">
                        <h5>留言板</h5>
                        <div class="panel_s_body">
                            <textarea class="form-control textarea_comment" rows="6" placeholder="我也要留言" v-model="commentContent"></textarea>
                            <p class="text-right">
                                <button class="btn btn-sm btn-info" @click="commentSub">发布</button>
                            </p>
                        </div>
                        <ul class="ul_text">
                            <li class="panel_comments clearfix" v-for="comment in getCommentList">
                                <div class="fl">
                                    <img class="circle" :src="comment.userId.header" width="50" height="50">
                                </div>
                                <div class="panel_comments_content">
                                    <div class="panel_comments_head">
                                        <span>
                                            <router-link :to="{ name: 'userIndex', params: { uid:getArticle.authId._id }}" class="link">
                                                <strong>{{comment.userId.nickname}}</strong>
                                            </router-link>
                                        </span>
                                        <span class="panel_color_grey">{{comment.created | minute}}</span>
                                        <span class="fr" v-if="myComment(comment.userId._id)"><a href="javascript:void(0)" class="link" @click="delCommentModal(comment._id)" title="删除"><i class="iconfont icon-delete"></i></a></span>
                                    </div>
                                    <div>{{comment.content}}</div>
                                </div>
                            </li>
                        </ul>
                        <div class="panel_s_foot" v-if="getCommentList.length < getArticle.commentCount">
                            <a href="javascript:void(0)" @click="commentAll">
                                <strong>查看全部</strong>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 pad_l0">
                    <div class="panel_s">
                        <h5>作者</h5>
                        <div class="panel_s_body panel_page_user text-center">
                            <p>
                                <router-link :to="{ name: 'userIndex', params: { uid:getArticle.authId._id }}">
                                    <img class="circle" :src="getArticle.authId.header" width="100" height="100">
                                </router-link>
                            </p>
                            <p>
                                <router-link :to="{ name: 'userIndex', params: { uid:getArticle.authId._id }}">
                                    <strong>{{getArticle.authId.nickname}}</strong>
                                </router-link>
                            </p>
                            <div class="panel_color_grey">{{getArticle.authId.summary}}</div>
                        </div>
                        <div class="panel_homepage_num clearfix text-center" v-bind:class="{panel_page_border: commentBox}">
                            <div class="col-xs-6 panel_homepage_box panel_page_triangle">
                                <a href="javascript:void(0)" @click="toggleCollect">
                                    <strong v-bind:class="{link: getArticleCollect}">{{getArticle.collectCount}}</strong>
                                    <span v-if="getArticleCollect">已收藏</span>
                                    <span v-else>收藏</span>
                                </a>
                            </div>
                            <div class="col-xs-6 panel_homepage_box">
                                <a href="javascript:void(0)" @click="showComment">
                                    <strong v-bind:class="{link: commentBox}">{{getArticle.commentCount}}</strong>
                                    <span>留言</span>
                                </a>
                            </div>
                        </div>
                        <div class="clearfix" v-show="commentBox">
                            <textarea class="page_comment" placeholder="非常赞，我是跪着看完的！" v-model="commentContent"></textarea>
                            <button class="btn btn-info page_comment_btn col-md-12" @click="commentSub">发布</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters ,mapActions } from 'vuex'

    export default {
        data(){
            return {
                aid: this.$route.params.aid,
                commentBox: false,
                commentContent: ''
            }
        },
        computed: {
            ...mapGetters({
                getModal: 'getModal',
                getModalConfirm: 'getModalConfirm',
                getArticle: 'getArticle',
                getArticleDelete: 'getArticleDelete',
                getArticleCollect: 'getArticleCollect',
                getCommentList: 'getCommentList',
                getArticleOwn: 'getArticleOwn',
                getAuth: 'getAuth'
            }),
            ...mapActions({
                showModal: 'showModal',
                articlePage: 'articlePage',
                delArticle: 'delArticle',
                articleCollect: 'articleCollect',
                commentList: 'commentList',
                commentListAll: 'commentListAll',
                addComment: 'addComment',
                articleStatus: 'articleStatus'
            })
        },
        mounted(){
            this.$store.dispatch('articlePage',this.aid);
            this.$store.dispatch('commentList',this.aid);
        },
        methods: {
            showComment(){
                this.commentBox = !this.commentBox
            },
            toggleCollect(){
                this.$store.dispatch('articleCollect',this.aid);
            },
            commentSub(){
                const data ={
                    aid: this.aid,
                    content: this.commentContent
                };
                this.$store.dispatch('addComment',data);
            },
            commentAll(){
                this.$store.dispatch('commentListAll',this.aid);
            },
            toggelStatus(){
                this.$store.dispatch('articleStatus',this.aid);
            },
            myComment(uid){
                if(this.getAuth){
                    return this.getAuth.id == uid;
                }
            },
            delArticleModal(){
                const data = {
                    name: 'delArticle',
                    info: {
                        text: '真的要删除吗?',
                        id: this.getArticle._id
                    }
                };
                this.$store.dispatch('showModal',data);
            },
            delCommentModal(cid){
                const data = {
                    name: 'delComment',
                    info: {
                        text: '真的要删除吗?',
                        id: cid
                    }
                };
                this.$store.dispatch('showModal',data);
            }
        },
        filters: {
            date: function (value) {
                var date = new Date(value);
                return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
            },
            minute: function (value) {
                var date = new Date(value);
                return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            },
            week:function (value) {
                var date = new Date(value);
                var week = date.getDay();
                var weekStr = ["日", "一", "二", "三", "四", "五", "六"];
                return "星期" + weekStr[week]
            }
        },
        watch:{
            getArticleDelete(){
                if(this.getArticleDelete){
                    this.$router.push({ name: 'userIndex', params: { uid: this.getAuth.id }})
                }
            },
            getCommentList(){
                this.commentContent = ''
            },
            getModalConfirm(){
                if(this.getModalConfirm && this.getModal.name == 'delComment'){
                    this.$store.dispatch('delComment',this.getModal.info.id);
                }else if(this.getModalConfirm && this.getModal.name == 'delArticle') {
                    this.$store.dispatch('delArticle', this.getModal.info.id);
                }
            }
        }
    }
</script>

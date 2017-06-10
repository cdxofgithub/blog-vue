<template>
    <div class="container pad_t75" v-show="getArticleOwn">
        <div class="panel">
            <div class="panel_tit">
                <div class="row">
                    <h4 class="col-md-4">
                        <label>
                            <span>标题：</span>
                            <input type="text" name="title" class="form-control panel_tit_input" :value="getArticle.title" @change="newArticle">
                        </label>
                    </h4>
                    <h4 class="col-md-4 col-md-offset-4 text-right">
                        <label>
                            <span>天气：</span>
                            <input type="text" name="weather" class="form-control panel_tit_input" :value="getArticle.weather" @change="newArticle">
                        </label>
                    </h4>
                </div>
            </div>
            <div class="panel_body">
                <div class="set_form clearfix">
                    <div class="tit">是否公开</div>
                    <div class="inp">
                        <input type="checkbox" name="status" :checked="getArticle.status == 1" value="true" @change="newArticleCheckbox">
                    </div>
                </div>
                <div class="set_form clearfix">
                    <div class="tit">标签</div>
                    <div class="inp">
                        <select class="form-control panel_tit_input" name="tag" :value="getArticle.tag" @change="newArticle">
                            <option v-for="option in getTags" :value="option">{{option}}</option>
                        </select>
                        <button class="btn btn-info" @click="addTag">{{tag.text}}</button>
                        <input type="text" class="form-control panel_tit_input" v-model.trim="tag.newTag" v-show="tag.show" placeholder="添加标签">
                    </div>
                </div>
            </div>
    
            <div class="indexContainer">
                <markdown :mdValuesP="getArticle.mdValue" :fullPageStatusP="false" :editStatusP="false" :previewStatusP="false" :navStatusP="false" :icoStatusP="true" @childevent="childEventHandler"></markdown>
            </div>
    
            <!--<div id="editor" v-html="getArticle.content"></div>-->
            <div class="panel_body text-right">
                <button class="btn btn-sm btn-info" @click="articleSub">我改好啦</button>
                <button class="btn btn-sm btn-danger" @click="$router.go(-1)">我不改了</button>
            </div>
        </div>
    </div>
</template>
<script>
import WE from 'wangeditor'
import { mapGetters, mapActions } from 'vuex'
import markdown from '../components/markdown'

export default {

    data() {
        return {
            aid: this.$route.params.aid,
            tag: {
                text: '添加',
                show: false,
                newTag: ''
            },
            newArticleContent: {},
            msgShow: '我要显示的内容',
            msg: {
                mdValue: '',
                htmlValue: ''
            }
        }
    },
    components: {
        markdown
    },
    computed: {
        ...mapGetters([
            'getTags',
            'getArticle',
            'getArticleOwn'
        ]),
        ...mapActions([
            'articlePage',
            'editArticle',
            'tags',
            'newTag'
        ])
    },
    mounted() {
        this.$store.dispatch('articlePage', this.aid)
        this.$store.dispatch('tags')
    },
    methods: {
        childEventHandler: function (res) {
            // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
            this.msg = res;
        },
        newArticle(e) {
            this.newArticleContent[e.target.name] = e.target.value
        },
        newArticleCheckbox(e) {
            this.newArticleContent[e.target.name] = e.target.checked
        },

        addTag() {
            var tag = this.tag.newTag
            if (this.tag.show && tag && tag.length < 10) {
                this.tag.show = false
                this.tag.text = '添加'
                this.$store.dispatch('newTag', tag)
                this.tag.newTag = ''
            } else {
                this.tag.show = true
                this.tag.text = '确定'
            }
        },
        articleSub() {
            this.newArticleContent.aid = this.aid;
            this.newArticleContent.content = this.msg.htmlValue;
            this.newArticleContent.mdValue = this.msg.mdValue;
            if (this.newArticleContent.status === false) this.newArticleContent.status = 0
            if (this.newArticleContent.status === true) this.newArticleContent.status = 1
            /*this.newArticleContent.image = this.editor.$txt.find('img').eq(0).attr('src')*/
            this.$store.dispatch('editArticle', this.newArticleContent)
        }
    },
    watch: {
        getArticle() {
            if (!this.getArticleOwn) this.$router.go(-1)  // 如果不公开，就退回上一页
        }
    }
}
</script>


<style lang="scss">
.indexContainer {
    width: 100%;
    height: 500px;
    background: #f1efef;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-top: 2px solid #eee
}

.btnsContainer {
    position: absolute;
    z-index: 10;
    left: 65px;
    top: 5px;
    height: 25px;
    min-width: 300px; // background: pink;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .btn {
        display: inline-block;
        border: 1px solid #ccc;
        margin-right: 10px;
        box-sizing: border-box;
        padding: 0 10px;
        background: #fff;
        font-size: 12px;
        height: 25px;
        line-height: 25px;
        cursor: pointer;
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -khtml-user-select: none;
        /* you could also put this in a class */
        -webkit-user-select: none;
        /* and add the CSS class here instead */
        -ms-user-select: none;
        user-select: none;
        /**禁止选中文字*/
        &:active {
            opacity: 0.8;
            background: lightblue;
        }
    }
}

.maskContainer {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5); // z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    .contentContainer {
        width: 60%;
        height: 60%;
        background: #fefefe;
        padding: 20px;
        box-sizing: border-box;
        position: relative;
        .showAreaContainer {
            height: 100%;
            width: 100%;
            outline: none;
            background: #eee;
            display: block;
            resize: none;
            padding: 10px;
            box-sizing: border-box;
        }
        .closeBtnContainer {
            position: absolute;
            height: 30px;
            width: 30px;
            right: -40px;
            top: -40px;
            border: 1px solid #fff;
            border-radius: 50%;
            &::before {
                content: '';
                position: absolute;
                width: 70%;
                height: 2px;
                display: bblock;
                background: #fff;
                left: 15%;
                top: calc(50% - 1px);
                transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
                -moz-transform: rotate(45deg);
            }
            &::after {
                content: '';
                position: absolute;
                width: 70%;
                height: 2px;
                display: bblock;
                background: #fff;
                left: 15%;
                top: calc(50% - 1px);
                transform: rotate(-45deg);
                -webkit-transform: rotate(-45deg);
                -moz-transform: rotate(-45deg);
            }
        }
    }
}
</style>
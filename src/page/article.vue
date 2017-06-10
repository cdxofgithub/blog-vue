<template>
    <div class="container pad_t75">
        <div class="panel">
            <div class="panel_tit">
                <div class="row">
                    <h4 class="col-md-4">
                        <label>
                            <span>标题：</span>
                            <input type="text" class="form-control panel_tit_input" v-model="article.title">
                        </label>
                    </h4>
                    <h4 class="col-md-4 col-md-offset-4 text-right">
                        <label>
                            <span>天气：</span>
                            <input type="text" class="form-control panel_tit_input" v-model="article.weather">
                        </label>
                    </h4>
                </div>
            </div>
            <div class="panel_body">
                <div class="set_form clearfix">
                    <div class="tit">是否公开</div>
                    <div class="inp">
                        <input type="checkbox" v-model="article.status">
                    </div>
                </div>
                <div class="set_form clearfix">
                    <div class="tit">标签</div>
                    <div class="inp">
                        <select class="form-control panel_tit_input" v-model="article.tag">
                            <option v-for="option in getTags" :value="option">{{option}}</option>
                        </select>
                        <button class="btn btn-info" @click="addTag">{{tag.text}}</button>
                        <input type="text" class="form-control panel_tit_input" v-model.trim="tag.newTag" v-show="tag.show" placeholder="添加标签">
                    </div>
                </div>
            </div>
    
            <div class="indexContainer">
                <markdown id="editor" :mdValuesP="msg.mdValue" :fullPageStatusP="false" :editStatusP="false" :previewStatusP="false" :navStatusP="false" :icoStatusP="true" @childevent="childEventHandler"></markdown>
            </div>
    
            <!--<div id="editor"></div>-->
            <div class="panel_body text-right">
                <button class="btn btn-sm btn-info" @click="articleSub">我写完啦</button>
                <button class="btn btn-sm btn-danger" @click="$router.go(-1)">我不写了</button>
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
            article: {
                title: '',
                weather: '',
                status: true,
                tag: '',
                content: ''
            },
            tag: {
                text: '添加',
                show: false,
                newTag: ''
            },
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
        ...mapGetters({
            getTags: 'getTags',
            getArticle: 'getArticle'
        }),
        ...mapActions({
            addArticle: 'addArticle',
            tags: 'tags',
            newTag: 'newTag'
        })
    },
    mounted() {
        this.$store.dispatch('tags');
        this.article.tag = this.getTags[0];
    },
    methods: {
        childEventHandler: function (res) {
            // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
            this.msg = res;
        },
        addTag() {
            var tag = this.tag.newTag;
            if (this.tag.show && tag && tag.length < 10) {
                this.tag.show = false;
                this.tag.text = '添加';
                this.$store.dispatch('newTag', tag);
                this.article.tag = tag;
                this.tag.newTag = '';
            } else {
                this.tag.show = true;
                this.tag.text = '确定'
            }
        },
        articleSub() {
            this.article.content = this.msg.htmlValue;
            this.article.mdValue = this.msg.mdValue;
            this.article.status ? this.article.status = 1 : this.article.status = 0;
            this.$store.dispatch('addArticle', this.article);
        }
    },
    watch: {
        getArticle: function () {
            if (this.getArticle._id) {
                this.$router.push({ name: 'page', params: { aid: this.getArticle._id } })
            }
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
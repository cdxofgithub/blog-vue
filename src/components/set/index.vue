<template>
    <div class="col-md-9 pad_l0">
        <div class="row">
            <div class="col-md-12">
                <div class="panel">
                    <div class="panel_tit">
                        <h4>我的信息</h4>
                    </div>
                    <div class="panel_body">
                        <div class="row" v-if="getUser.own">
                            <div class="col-md-8">
                                <div class="set_form clearfix">
                                    <div class="tit">昵称</div>
                                    <div class="inp">
                                        <input type="text" name="nickname" :value="getUser.info.nickname"  class="form-control" @input="newUser">
                                    </div>
                                </div>
                                <div class="set_form clearfix">
                                    <div class="tit">性别</div>
                                    <div class="radio">
                                        <label class="radio-inline">
                                            <input type="radio" name="sex" :checked="getUser.info.sex == 1" value="1" @change="newUser">男
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="sex" :checked="getUser.info.sex == 2" value="2" @change="newUser">女
                                        </label>
                                    </div>
                                </div>
                                <div class="set_form clearfix">
                                    <div class="tit">公开邮箱</div>
                                    <div class="checkbox">
                                        <label class="checkbox-inline">
                                            <input type="checkbox" name="showEmail" :checked="getUser.info.showEmail == 1" value="getUser.info.showEmail" @change="newShowEmail">
                                        </label>
                                    </div>
                                </div>
                                <div class="set_form clearfix">
                                    <div class="tit">生日</div>
                                    <div class="inp">
                                        <span>
                                            <select  name="birthdayMonth" :value="getUser.info.birthdayMonth" class="form-control set_select" @change="newUser">
                                                <option value="0"></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                            月
                                        </span>
                                        <span>
                                            <select name="birthdayDay" :value="getUser.info.birthdayDay" class="form-control set_select" @change="newUser">
                                                <option value="0"></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                            </select>
                                            日
                                        </span>
                                    </div>
                                </div>
                                <div class="set_form clearfix">
                                    <div class="tit">血型</div>
                                    <div class="inp">
                                        <select name="blood" :value="getUser.info.blood"  @change="newUser" class="form-control">
                                            <option value="0"></option>
                                            <option value="1">A</option>
                                            <option value="2">B</option>
                                            <option value="3">AB</option>
                                            <option value="4">O</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="set_form clearfix">
                                    <div class="tit">简介</div>
                                    <div class="inp">
                                        <textarea name="summary" :value="getUser.info.summary" class="form-control" @input="newUser" placeholder="请填写简介"></textarea>
                                    </div>
                                </div>
                                <div class="set_form clearfix">
                                    <div class="tit">博客地址</div>
                                    <div class="inp">
                                        <input type="text" name="url" :value="getUser.info.url" class="form-control" @input="newUser" placeholder="请填写博客地址">
                                    </div>
                                </div>
                                <div class="set_form clearfix">
                                    <div class="tit">QQ</div>
                                    <div class="inp">
                                        <input type="text" name="qqnumber" :value="getUser.info.qqnumber" class="form-control" @input="newUser" placeholder="请填写QQ">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="set_header ">
                                    <p class="tit">头像</p>
                                    <img :src="getUser.info.header" width="200px" height="200px">
                                    <button class="btn btn-default col-xs-12" @click="toggleShow()">设置头像</button>
                                    <com-setUpload field="img"
                                               @crop-success="cropSuccess"
                                               @crop-upload-success="cropUploadSuccess"
                                               @crop-upload-fail="cropUploadFail"
                                               v-model="show"
                                               :value="show"
                                               :width="200"
                                               :height="200"
                                               :url="url"
                                               :headers="headers">
                                    </com-setUpload>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel_foot set_sub">
                        <button class="btn btn-info btn-sm" @click="update">提交</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import setUpload from './upload';
    import { mapGetters ,mapActions } from 'vuex'

    export default {
        data() {
            return {
                show: false,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('user').replace(/(^\")|(\"$)/g, '')
                },
                url: '',
                newUserInfo:{}
            }
        },
        components: {
            'comSetUpload': setUpload
        },
        computed: {
            ...mapGetters({
                getUser:'getUser'
            }),
            ...mapActions({
                userSet: 'userSet',
                updateUser: 'updateUser',
                updateHeader: 'updateHeader'
            }),

        },
        mounted(){
            this.$store.dispatch('userSet');
            this.url = (process.env.NODE_ENV === 'production')
                ? 'http://118.89.50.59:3000/user/header'
                :'http://localhost:3000/user/header';
        },
        methods: {
            newUser (e) {
                this.newUserInfo[e.target.name] = e.target.value;
            },
            newShowEmail(e){
                if(e.target.checked){
                    e.target.value = 1
                }else{
                    e.target.value = 0
                }
                this.newUser (e)
            },
            update(){
                this.$store.dispatch('updateUser',this.newUserInfo);
            },
            toggleShow() {
                this.show = !this.show;
            },
            /**
             * crop success
             *
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccess(imgDataUrl, field){
                console.log('-------- crop success --------');

            },
            /**
             * upload success
             *
             * [param] jsonData   服务器返回数据，已进行json转码
             * [param] field
             */
            cropUploadSuccess(jsonData, field){
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
                this.$store.dispatch('updateHeader',jsonData)
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field){
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            }
        }
    }
</script>

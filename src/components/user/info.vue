<template>
    <div class="row">
        <div class="col-md-3">
            <com-userSidebar :uid="uid"></com-userSidebar>
            </div>
            <div class="col-md-9 pad_l0">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel">
                        <div class="panel_tit">
                            <h4>个人信息</h4>
                        </div>
                        <div class="panel_body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="set_form clearfix">
                                        <div class="tit">昵称</div>
                                        <div class="inp">{{getUser.info.nickname}}</div>
                                    </div>
                                    <div class="set_form clearfix">
                                        <div class="tit">性别</div>
                                        <div class="inp" v-if="getUser.info.sex == 1">
                                            男
                                        </div>
                                        <div class="inp" v-if="getUser.info.sex == 2">
                                            女
                                        </div>
                                    </div>
                                    <div class="set_form clearfix" v-if="getUser.info.showEmail == 1">
                                        <div class="tit">邮箱</div>
                                        <div class="inp">
                                            {{getUser.info.email}}
                                        </div>
                                    </div>
                                    <div class="set_form clearfix" v-if="getUser.info.birthdayMonth != 0 && getUser.info.birthdayDay != 0">
                                        <div class="tit">生日</div>
                                        <div class="inp">
                                            {{getUser.info.birthdayMonth}}月{{getUser.info.birthdayDay}}日
                                        </div>
                                    </div>
                                    <div class="set_form clearfix" v-if="getUser.info.blood">
                                        <div class="tit">血型</div>
                                        <div class="inp">
                                            <template v-if="getUser.info.blood == 1">A</template>
                                            <template v-if="getUser.info.blood == 2">B</template>
                                            <template v-if="getUser.info.blood == 3">AB</template>
                                            <template v-if="getUser.info.blood == 4">O</template>
                                        </div>
                                    </div>
                                    <div class="set_form clearfix" v-if="getUser.info.summary">
                                        <div class="tit">简介</div>
                                        <div class="inp">
                                            {{getUser.info.summary}}
                                        </div>
                                    </div>
                                    <div class="set_form clearfix" v-if="getUser.info.url">
                                        <div class="tit">博客地址</div>
                                        <div class="inp">
                                            {{getUser.info.url}}
                                        </div>
                                    </div>
                                    <div class="set_form clearfix" v-if="getUser.info.qqnumber">
                                        <div class="tit">QQ</div>
                                        <div class="inp">
                                            {{getUser.info.qqnumber}}
                                        </div>
                                    </div>
                                    <div class="set_form clearfix">
                                        <div class="tit">注册日期</div>
                                        <div class="inp">
                                            {{getUser.info.created | time}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import userSidebar from './sidebar'
    import { mapGetters } from 'vuex'

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
                getUser:'getUser'
            })
        },
        filters: {
            time: function (value) {
                var date =new Date(value);
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

            }
        }
    }
</script>

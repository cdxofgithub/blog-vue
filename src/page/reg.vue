<template>
    <div>
        <div class="container pad_t150">
            <div class="row">
                <div class="col-md-6 center-block">
                    <div class="panel hover_sh clearfix">
                        <div class="panel_tit"><h4>注册</h4></div>
                        <form class="panel_body panel_form center-block" method="post" @submit.prevent="reg">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="iconfont icon-account addon_icon"></i></span>
                                <input type="text" v-model="user.nickname" class="form-control" placeholder="昵称" >
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="iconfont icon-email addon_icon"></i></span>
                                <input type="text"
                                       v-model="user.email"
                                       class="form-control"
                                       placeholder="邮箱">
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="iconfont icon-lock addon_icon"></i></span>
                                <input type="password"
                                       v-model="user.password"
                                       class="form-control"
                                       placeholder="密码">
                            </div>
                            <div class="input-group">
                                <span class="input-group-addon"><i class="iconfont icon-lock addon_icon"></i></span>
                                <input type="password" v-model="user.passwordRepeat" class="form-control" placeholder="确认密码">
                            </div>
                            <div class="panel_form_sex text-center">
                                <a href="javascript:void(0)" class="sex_nan" v-bind:class="{sex_def: !sexActive}" @click="sexNan"><i class="iconfont icon-nan"></i></a>
                                <a href="javascript:void(0)" class="sex_nv" v-bind:class="{sex_def: sexActive}" @click="sexNv"><i class="iconfont icon-nv"></i></a>
                            </div>
                            <div class="panel_form_btn">
                                <button type="submit" class="btn btn-info">注 册</button>
                            </div>
                            <p class="text-right"><router-link to="/login">已有账号登录</router-link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters ,mapActions } from 'vuex'

    export default {
        data (){
            return {
                sexActive: true,
                user: {
                    nickname: '',
                    email:'',
                    password: '',
                    passwordRepeat: '',
                    sex: 1
                }
            }
        },
        computed: {
            ...mapGetters({
                getAuth:'getAuth'
            }),
            ...mapActions({
                userReg: 'userReg'
            })
        },
        methods:{
            sexNan(){
                this.user.sex = 1;
                this.sexActive = !this.sexActive
            },
            sexNv(){
                this.user.sex = 2;
                this.sexActive = !this.sexActive
            },
            reg(){
                this.$store.dispatch('userReg', this.user);
            }
        },
        watch:{
            getAuth(){
                if(this.getAuth) {
                    this.$router.push({ name: 'userIndex', params: { uid: this.getAuth.id }})
                }
            }
        }
    }
</script>

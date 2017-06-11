<template>
    <div class="col-md-9 pad_l0">
        <div class="row">
            <div class="col-md-12">
                <div class="panel">
                    <div class="panel_tit">
                        <h4>修改密码</h4>
                    </div>
                    <div class="panel_body">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="set_form clearfix">
                                    <div class="tit">新密码</div>
                                    <div class="inp"><input type="password" class="form-control" v-model="user.password"></div>
                                </div>
                                <div class="set_form clearfix">
                                    <div class="tit">确认密码</div>
                                    <div class="inp"><input type="password" class="form-control"  v-model="user.passwordRepeat"></div>
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
    import { mapGetters ,mapActions } from 'vuex'

    export default {
        data(){
            return {
                user:{
                    password: '',
                    passwordRepeat: ''
                }
            }
        },
        computed: {
            ...mapActions({
                updatePassword: 'updatePassword'
            }),
        },
        methods:{
            update(){
                this.$store.dispatch('updatePassword',this.user);
            }
        }
    }
</script>

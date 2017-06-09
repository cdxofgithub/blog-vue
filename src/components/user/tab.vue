<template>
    <div class="row">
        <div class="col-md-12">
            <div class="panel_h text-center clearfix">
                <div class="tab_user col-md-8 center-block">
                    <table cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr v-if="getUser.info.id">
                            <td>
                                <router-link :to="{ name: 'userIndex', params: { uid }}" class="tab_user_a" active-class="user_active" exact>
                                    <template v-if="me()">我的主页</template>
                                    <template v-else>
                                        <template v-if="getUser.info.sex == 1">他的主页</template>
                                        <template v-if="getUser.info.sex == 2">她的主页</template>
                                    </template>
                                </router-link>
                            </td>
                            <td>
                                <router-link :to="{ name: 'userAlbum', params: { uid }}" class="tab_user_a" active-class="user_active">
                                    <template v-if="me()">我的相册</template>
                                    <template v-else>
                                        <template v-if="getUser.info.sex == 1">他的相册</template>
                                        <template v-if="getUser.info.sex == 2">她的相册</template>
                                    </template>
                                </router-link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data(){
            return {

            }
        },
        props: {
            uid: ''
        },
        computed: {
            ...mapGetters({
                getAuth: 'getAuth',
                getUser: 'getUser'
            })
        },
        methods:{
            me(){
                if(this.getAuth){
                    return this.getAuth.id == this.getUser.info.id
                }
            }
        }
    }
</script>

<template>
    <div class="banner_user">
        <div class="banner_photo text-center">
            <div class="photo_wrap">
                <img :src="getUser.info.header">
            </div>
        </div>
        <div class="banner_name text-center">
            <h3>
                {{getUser.info.nickname}}&nbsp
                <span v-if="getUser.info.sex === 1" class="sex_nan"><i class="iconfont icon-nan"></i></span>
                <span v-if="getUser.info.sex === 2" class="sex_nv"><i class="iconfont icon-nv"></i></span>
            </h3>
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
        computed: {
            ...mapGetters({
                getUser: 'getUser'
            })
        }
    }
</script>

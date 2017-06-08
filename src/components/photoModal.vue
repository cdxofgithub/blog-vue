<template>
    <transition name="photo_modal">
        <div class="photo_modal text-center" v-show="value && loading">
            <div class="photo_modal_dialog panel text-left">
                <div class="panel_tit">
                    <h4>照片</h4>
                </div>
                <div class="panel_body text-center" @click="close">
                    <img :src="photoModal.photo">
                </div>
                <div class="panel_foot" v-if="photoModal.userId">
                    <span title="日期"><i class="iconfont icon-clock"></i> {{photoModal.created | date}}</span>
                    <span><i class="iconfont icon-account"></i> <router-link :to="{ name: 'userAlbum', params: { uid:photoModal.userId._id }}" class="link"> {{photoModal.userId.nickname}}</router-link></span>
                    <span class="photo_like" @click="photoLikeBtn(photoModal._id,index)"><i class="iconfont icon-like"></i> {{photoModal.likeCount}}</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data(){
            return {
                loading: false
            }
        },
        props:{
            value: {
                'default': true
            },
            photoModal: {
                type: Object,
                'default': null
            },
            index: {
                type: Number,
                'default': null
            }
        },
        computed: {
            ...mapGetters({
                getPhotoList: 'getPhotoList'
            }),
            ...mapActions({
                photoLike: 'photoLike'
            }),
        },
        methods: {
            close(){
                this.loading = false;
                this.$emit('input', false);
            },
            photoLikeBtn(pid,index){
                this.$store.dispatch('photoLike',{
                    pid: pid,
                    index: index
                });
            }
        },
        watch:{
            value(){
                if(this.value) {
                    const self = this;
                    const tempImage = new Image();
                    tempImage.onload = function () {
                        self.loading = true;
                    };
                    tempImage.onerror = function () {
                        self.close();
                    };
                    tempImage.src = self.photoModal.photo;
                }
            }
        },
        filters: {
            date: function (value) {
                var date = new Date(value);
                return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
            }
        }
    }
</script>

<style>
    .photo_modal{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        overflow: hidden;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, .5);
        -webkit-overflow-scrolling: touch;
        outline: 0;
        transition: opacity .3s ease;
    }
    .photo_modal_dialog{
        max-width: 1200px;
        min-width: 400px;
        display: inline-block;
        margin: 75px auto;
        transition: all .3s ease;
    }
    .photo_modal_dialog .panel_body{
        cursor: zoom-out;
    }.photo_modal_dialog img{
        max-height: 450px;
    }
    .photo_modal-enter {
        opacity: 0;
    }

    .photo_modal-leave-active {
        opacity: 0;
    }

    .photo_modal-enter .photo_modal_dialog,
    .photo_modal-leave-active .photo_modal_dialog {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>

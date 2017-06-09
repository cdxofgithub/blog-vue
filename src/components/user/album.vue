<template>
    <div class="panel">
        <div class="panel_tit">
            <h4>相册</h4>
        </div>
        <div class="panel_body">
            <div class="panel_album" v-if="getPhotoUser.own">
                <div class="drop_area"
                     @dragleave="preventDefault"
                     @dragover="preventDefault"
                     @dragenter="preventDefault"
                     @drop="handleChange">
                    <p><button class="btn btn-info" @click="handleClick">点击上传图片</button></p>
                    <p class="panel_color_grey">或将照片拖到这里，单次最多可选10张</p>
                    <input type="file"  v-show="false" ref="filephoto" @change="handleChange"  multiple="multiple" accept="image/*">
                </div>
            </div>
            <div class="panel_album" v-for="(item,itemIndex) in getPhotoUser.list">
                <p class="panel_color_grey">{{item.date }}</p>
                <ul class="row">
                    <li class="panel_album_li col-md-3" v-for="(photo,photoIndex) in item.list">
                        <div class="panel panel_album_img" :style="{ backgroundImage: 'url(' + photo.thumbnail + ')'}">
                            <div class="panel_album_top text-right">
                                <span class="panel album_like" @click="photoLikeBtn(photo._id,itemIndex,photoIndex)"><i class="iconfont icon-like"></i> {{photo.likeCount}}</span>
                                <span class="panel album_delete" v-if="getPhotoUser.own" @click="delPhotoModal(photo._id,itemIndex,photoIndex)"><i class="iconfont icon-delete"></i></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="panel_foot text-center">
            <template v-if="getPhotoUser.status == 0">加载更多</template>
            <template v-if="getPhotoUser.status == 1">加载中...</template>
            <template v-if="getPhotoUser.status == 2">没有更多照片啦</template>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data(){
            return {
                fieldName: 'photo'
            }
        },
        props: {
            uid: ''
        },
        computed: {
            ...mapGetters({
                getModal: 'getModal',
                getModalConfirm: 'getModalConfirm',
                getPhotoUser: 'getPhotoUser'
            }),
            ...mapActions({
                showModal: 'showModal',
                addPhoto: 'addPhoto',
                photoUser: 'photoUser',
                photoUserClear: 'photoUserClear',
                photoLikeUser: 'photoLikeUser',
                delPhoto: 'delPhoto'
            })
        },
        mounted(){
            this.$store.dispatch('photoUserClear');
            this.loadPhoto();
            window.addEventListener('scroll',this.loadMore);
        },
        methods: {
            preventDefault(e) {
                e.preventDefault();
                return false;
            },
            handleClick(e) {
                if (e.target !== this.$refs.filephoto) {
                    e.preventDefault();
                    if (document.activeElement !== this.$refs) {
                        this.$refs.filephoto.click();
                    }
                }
            },
            handleChange(e) {
                e.preventDefault();
                const files = e.target.files || e.dataTransfer.files;
                if (!files.length || files.length > 10) return false;
                for(let i = 0;i < files.length;i++) {
                    const formData = new FormData();
                    formData.append(this.fieldName, files[i]);
                    this.$store.dispatch('addPhoto',formData);
                }
            },

            loadPhoto(){
                const id = this.$route.params.uid;
                const lastList = this.getPhotoUser.list[this.getPhotoUser.list.length - 1 ];
                let time;
                if(lastList) {
                    const lastPhoto = lastList.list[lastList.list.length - 1];
                    time = new Date(lastPhoto.created);
                }else{
                    time = new Date();
                }
                const data = id + '/' + time.getTime();
                this.$store.dispatch('photoUser', data);
            },
            loadMore() {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const allHeight = document.body.scrollHeight;
                const pageHeight =  document.documentElement.clientHeight;
                if(scrollTop == allHeight - pageHeight && this.getPhotoUser.status == 0){
                    this.loadPhoto()
                }
            },
            photoLikeBtn(pid,itemIndex,photoIndex){
                this.$store.dispatch('photoLikeUser',{
                    pid: pid,
                    itemIndex: itemIndex,
                    photoIndex: photoIndex
                });
            },
            delPhotoModal(pid,itemIndex,photoIndex){
                const data = {
                    name: 'delPhoto',
                    info: {
                        text: '真的要删除吗?',
                        pid: pid,
                        itemIndex: itemIndex,
                        photoIndex: photoIndex
                    }
                };
                this.$store.dispatch('showModal',data);
            }
        },
        beforeDestroy () {
            window.removeEventListener('scroll',this.loadMore);
        },
        watch:{
            uid(){
                this.$store.dispatch('photoUserClear');
                this.loadPhoto();
            },
            getModalConfirm(){
                if(this.getModalConfirm && this.getModal.name == 'delPhoto'){
                    this.$store.dispatch('delPhoto',this.getModal.info);
                }
            }
        }
    }
</script>

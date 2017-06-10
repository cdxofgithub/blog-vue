<template>
    <div class="container pad_t75">
        <waterfall
            :line-gap="320"
            :min-line-gap="320"
            :max-line-gap="640"
            :single-max-width="640"
            :watch="getPhotoList.list">
            <waterfall-slot
                v-for="(item, index) in getPhotoList.list"
                :width="380"
                :height="item.height"
                :order="index"
                :key="item.index"
                move-class="photo_move">
                <div class="panel photo_box hover_sh">
                    <div class="photo_box_top">
                        <span class="photo_like" @click="photoLikeBtn(item._id,index)"><i class="iconfont icon-like"></i> {{item.likeCount}}</span>
                    </div>
                    <img :src="item.thumbnail" @click="showPhotoModal(item, index)">
                </div>
            </waterfall-slot>
        </waterfall>
        <div class="panel_msg">
            <template v-if="getPhotoList.status == 0">加载更多</template>
            <template v-if="getPhotoList.status == 1">加载中...</template>
            <template v-if="getPhotoList.status == 2">没有更多照片啦</template>
        </div>
        <com-photoModal
            v-model="show"
            :value="show"
            :photoModal="photoModal"
            :index="index">
        </com-photoModal>
    </div>
</template>

<script>
    import { waterfall, waterfallSlot } from 'vue-waterfall'
    import photoModal from '../components/photoModal'
    import { mapGetters ,mapActions } from 'vuex'

    export default {
        data(){
            return {
                show: false,
                photoModal: {},
                index: null
            }
        },
        components: {
            'waterfall': waterfall,
            'waterfallSlot': waterfallSlot,
            'comPhotoModal': photoModal
        },
        computed: {
            ...mapGetters({
                getPhotoList: 'getPhotoList'
            }),
            ...mapActions({
                photoList: 'photoList',
                photoClear: 'photoClear',
                photoLike: 'photoLike'
            })
        },
        mounted(){
            this.$store.dispatch('photoClear');
            this.loadPhoto();
            window.addEventListener('scroll',this.loadMore);
        },
        methods: {
            loadPhoto(){
                const lastPhoto = this.getPhotoList.list[this.getPhotoList.list.length - 1 ];
                const time = lastPhoto?new Date(lastPhoto.created):new Date();
                var data = time.getTime();
                this.$store.dispatch('photoList', data);
            },
            loadMore() {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const allHeight = document.body.scrollHeight;
                const pageHeight =  document.documentElement.clientHeight;
                if(scrollTop == allHeight - pageHeight && this.getPhotoList.status == 0){
                    this.loadPhoto();
                }
            },
            photoLikeBtn(pid,index){
                this.$store.dispatch('photoLike',{
                    pid: pid,
                    index: index
                });
            },
            showPhotoModal(item,index){
                this.photoModal = item;
                this.index = index;
                this.show = true;

            }
        },
        beforeDestroy () {
            window.removeEventListener('scroll',this.loadMore);
        }
    }
</script>

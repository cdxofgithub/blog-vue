<template>
    <transition name="modal">
        <div class="modal" v-if="getModal.status">
            <div class="modal_wrapper">
                <div class="modal-dialog panel">
                    <div class="panel_tit">
                        <h4>提示</h4>
                    </div>
                    <div class="panel_body">
                        <div class="panel_content">{{getModal.info.text}}</div>
                    </div>
                    <div class="panel_foot text-right">
                        <button class="btn btn-info btn-sm" @click="confirm">确定</button>
                        <button class="btn btn-danger btn-sm" @click="close">取消</button>
                    </div>
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

            }
        },
        computed: {
            ...mapGetters({
                getModal: 'getModal'
            }),
            ...mapActions({
                hideModal: 'hideModal'
            }),
        },
        methods: {
            confirm(){
                this.$store.dispatch('hideModal',true);
            },
            close(){
                this.$store.dispatch('hideModal');
            }
        }
    }
</script>

<style>
    .modal{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        overflow: hidden;
        display: table;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, .5);
        -webkit-overflow-scrolling: touch;
        outline: 0;
        transition: opacity .3s ease;
    }
    .modal_wrapper{
        display: table-cell;
        vertical-align: middle;
    }
    .modal-dialog{
        width: 300px;
        margin: 0 auto;
        transition: all .3s ease;
    }
    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-dialog,
    .modal-leave-active .modal-dialog {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>

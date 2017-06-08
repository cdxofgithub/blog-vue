<template>
    <div class="message message-position">
        <transition-group name="message" tag="div">
            <div class="message_div hover_sh" :class="messageTypeClass(m)" v-for="m in message" :key="m.id">
                <div class="message_text">{{ m.content }}</div>
                <button class="message_button" @click="close(m.id)"></button>
            </div>
        </transition-group>
    </div>
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
                message: 'getmessage'
            }),
            ...mapActions({
                hideMsg: 'hideMsg'
            }),
        },
        methods: {
            close(id){
                this.$store.dispatch('hideMsg',id);
            },
            messageTypeClass(message) {
                return `message-type-${message.type}`
            }
        },
    }
</script>

<style>
    .message {
        position: fixed;
        width: 350px;;
        z-index: 100;
    }
    .message_div {
        position: relative;
        box-sizing: border-box;
        margin-bottom: 10px;
        padding: 15px;
        width: 100%;
        color: #fff;
        transition: all .5s ease;
        border-radius: 4px;
    }
    .message_button {
        position: absolute;
        top: 0;
        right: 5px;
        padding: 2px;
        background-color: transparent;
        border-width: 0;
        font-size: 1.5em;
        color: inherit;
        cursor: pointer;
        outline: 0;
        transition: transform 0.18s;
    }
    .message_button:hover{
        transform: rotate(90deg);
    }
    .message_button:before {
        content: '\d7';
    }

    .message-enter-active,
    .message-leave {
        opacity: 1;
    }
    .message-enter,
    .message-leave-active {
        transform: translateX(350px);
        opacity: 0;
    }
    .message-leave-active {
        position: absolute;
    }
    .message-leave-active {
        transform: translateY(-50px);
    }

    .message-position {
        top: 70px;
        right: 10px;
    }

    .message-type-info {
        background-color: #43b4ec;
    }
    .message-type-danger {
        background-color: #f3755e;
    }
</style>

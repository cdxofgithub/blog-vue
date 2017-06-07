<template>
    <div>
        <com-header></com-header>
        <router-view></router-view>
        <com-message></com-message>
        <com-modal></com-modal>
    </div>
</template>

<script>
import header from './components/header'
import message from './components/message'
import modal from './components/modal'

export default {
    components: {
        comHeader: header,
        comMessage: message,
        comModal: modal
    }
}
</script>

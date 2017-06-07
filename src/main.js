import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store/index'

import './assets/css/common.css'
import './assets/css/iconfont.css'
import "../static/css/github-markdown.css";

var app = new Vue({
    el: '#app',
    router,
    store,
    ...App,
});

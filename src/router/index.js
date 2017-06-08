import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import store from '../store/index'

import index from '../page/index'
import dairy from '../page/dairy'
import photo from '../page/photo'
import login from '../page/login'
import reg from '../page/reg'
import user from '../page/user'
import set from '../page/set'
import page from '../page/page'
import article from '../page/article'
import edit from '../page/edit'

import userIndex from '../components/user/index'
import userAlbum from '../components/user/album'
import userTogether from '../components/user/together'
import userInfo from '../components/user/info'
import setIndex from '../components/set/index'
import setFriend from '../components/set/friend'
import setPassword from '../components/set/password'

const routes = [{
    path: '/',
    component: index,
    meta: { auth: false }
}, {
    path: '/dairy',
    component: dairy,
    meta: { auth: false }
}, {
    path: '/photo',
    component: photo,
    meta: { auth: false }
}, {
    path: '/login',
    component: login,
},{
    path: '/reg',
    component: reg,
    meta: { auth: false }
},{
    path: '/article',
    component: article,
},{
    path: '/p/:aid',
    name: 'page',
    component: page,
    meta: { auth: false }
},{
    path: '/p/:aid/edit',
    name: 'edit',
    component: edit,
},{
    path : '/set',
    component : set,
    children : [{
        path: '',
        name: 'setIndex',
        component : setIndex,
    },{
        path : 'password',
        name: 'setPassword',
        component : setPassword,
    },{
        path : 'friend',
        name: 'setFriend',
        component : setFriend,
    }]
}, {
    path: '/u/:uid',
    component: user,
    children: [{
        path: '',
        name: 'userIndex',
        component: userIndex,
        meta: { auth: false }
    }, {
        path: 'album',
        name: 'userAlbum',
        component: userAlbum,
        meta: { auth: false }
    }, {
        path: 'together',
        name: 'userTogether',
        component: userTogether,
        meta: { auth: false }
    }, {
        path: 'info',
        name: 'userInfo',
        component: userInfo,
        meta: { auth: false }
    }]
}];

const router = new VueRouter({
    mode: 'history',
    saveScrollPosition: true,
    routes
});

router.beforeEach(({meta, path}, from, next) => {
    var { auth = true } = meta;
    var isLogin = Boolean(store.state.auth.token); //true用户已登录， false用户未登录

    if (auth && !isLogin && path !== '/login') {
        return next({ path: '/login' })
    }
    if(isLogin && (path == '/login' || path == '/reg')){
        return next({ path: '/' })
    }
    next()
});

export default router;


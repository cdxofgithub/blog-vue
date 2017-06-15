import { USER_LOGIN,USER_LOGOUT,USER_REG,AUTH_INFO,UPDATE_HEADER } from '../types'

const isLoggedIn = function() {
    const token = localStorage.getItem('user');
    if (token) {
        const payload = JSON.parse(window.atob(token.split('.')[1]));
        if( payload.exp > Date.now() / 1000 ){
            return JSON.parse(localStorage.getItem('user'))
        }else{
            localStorage.removeItem('user');
        }
    } else {
        return false;
    }
};

const state = {
    token: isLoggedIn() || null,
    info: null
};

const mutations = {
    [USER_LOGIN](state, data) {
        localStorage.setItem('user',JSON.stringify(data.token));
        state.token = data.token;
    },
    [USER_LOGOUT](state) {
        localStorage.removeItem('user');
        state.token = null;
        state.info = null;
    },
    [USER_REG](state, data) {
        localStorage.setItem('user',JSON.stringify(data.token));
        state.token = data.token;
    },
    [AUTH_INFO](state, data) {
        state.token = data.token;
        state.info = data.info;
    },
    [UPDATE_HEADER](state, data) {
        state.info.header = data.url;
    }
};

export default {
    state,
    mutations
}

import { USER_INFO,USER_SET,UPDATE_USER,UPDATE_HEADER } from '../types'

const state = {
    own: false,
    info: {}
};

const mutations = {
    [USER_INFO](state, data) {
        state.own = data.own;
        state.info = data.info;
    },
    [USER_SET](state, data) {
        state.own = data.own;
        state.info = data.info;
    },
    [UPDATE_USER](state, data) {
        state.info = data.info;
    },
    [UPDATE_HEADER](state, data) {
        state.info.header = data.url;
    },
};

export default {
    state,
    mutations
}

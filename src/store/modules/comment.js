import { COMMENT_LIST,ADD_COMMENT } from '../types'

const state = {
    list: []
};

const mutations = {
    [COMMENT_LIST](state, data) {
        state.list = data.comment;
    },
    [ADD_COMMENT](state,data) {
        state.list.push(data.comment);
    }
};

export default {
    state,
    mutations
}

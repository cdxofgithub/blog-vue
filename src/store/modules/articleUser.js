import { ARTICLE_USER,ARTICLE_USER_STATUS,ARTICLE_USER_CLEAR } from '../types'

const state = {
    list: [],
    status: 0,
};

const mutations = {
    [ARTICLE_USER](state, data){
        state.list = state.list.concat(data.list);
        state.status = data.status;
    },
    [ARTICLE_USER_STATUS](state, data){
        state.status = data.status;
    },
    [ARTICLE_USER_CLEAR](state){
        state.list = [];
        state.status = 0;
    }

};

export default {
    state,
    mutations
}

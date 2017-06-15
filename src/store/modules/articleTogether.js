import { ARTICLE_TOGETHER,ARTICLE_TOGETHER_STATUS,ARTICLE_TOGETHER_CLEAR } from '../types'

const state = {
    list: [],
    status: 0,
};

const mutations = {
    [ARTICLE_TOGETHER](state, data){
        state.list = state.list.concat(data.list);
        state.status = data.status;
    },
    [ARTICLE_TOGETHER_STATUS](state, data){
        state.status = data.status;
    },
    [ARTICLE_TOGETHER_CLEAR](state){
        state.list = [];
        state.status = 0;
    }

};

export default {
    state,
    mutations
}

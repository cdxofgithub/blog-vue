import { ARTICLE_LIST,ARTICLE_USER,ARTICLE_CLEAR,ARTICLE_STATUS,ARTICLE_KEYWORD,ARTICLE_TAGNAME } from '../types'

const state = {
    list: [],
    status: 0,
    keyword: '',
    tagName: ''
};

const mutations = {
    [ARTICLE_LIST](state, data){
        state.list = state.list.concat(data.list);
        state.status = data.status;
    },
    [ARTICLE_USER](state, data){
        state.list = state.list.concat(data.list);
        state.status = data.status;
    },
    [ARTICLE_STATUS](state, data){
        state.status = data.status;
    },
    [ARTICLE_KEYWORD](state, data){
        state.keyword = data.keyword;
    },
    [ARTICLE_TAGNAME](state, data){
        state.tagName = data.tagName;
    },
    [ARTICLE_CLEAR](state){
        state.list = [];
        state.status = 0;
    }

};

export default {
    state,
    mutations
}

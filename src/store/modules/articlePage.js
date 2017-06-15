import { ARTICLE_PAGE,ARTICLE_DELETE,ARTICLE_COLLECT,ARTICLE_COMMENT,ARTICLE_PAGE_STATUS } from '../types'

const state = {
    page: {},
    collected: false,
    own: false,
    deleted: false
};

const mutations = {
    [ARTICLE_PAGE](state, data){
        state.page = data.page;
        state.collected = data.collected;
        state.own = data.own
    },
    [ARTICLE_DELETE](state, data){
        state.deleted = data.deleted;
    },
    [ARTICLE_COLLECT](state, data){
        state.page.collectCount = data.collectCount;
        state.collected = data.collected;
    },
    [ARTICLE_COMMENT](state, data){
        state.page.commentCount = data.commentCount;
    },
    [ARTICLE_PAGE_STATUS](state, data){
        state.page.status = data.articleStatus;
    }
};

export default {
    state,
    mutations
}

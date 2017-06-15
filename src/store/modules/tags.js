import { TAGS,NEW_TAG } from '../types'

const state = {
    tags: []
};

const mutations = {
    [TAGS](state, data) {
        state.tags = data.tags;
    },
    [NEW_TAG](state,data){
        state.tags.push(data);
    }
};

export default {
    state,
    mutations
}

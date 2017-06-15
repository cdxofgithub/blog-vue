import { PHOTO_LIST,PHOTO_STATUS,PHOTO_CLEAR,PHOTO_LIKE } from '../types'

const state = {
    list: [],
    status: 0
};

const mutations = {
    [PHOTO_LIST](state, data) {
        state.list = state.list.concat(data.list);
        state.status = data.status;
    },
    [PHOTO_STATUS](state, data){
        state.status = data.status;
    },
    [PHOTO_CLEAR](state){
        state.list = [];
        state.status = 0;
    },
    [PHOTO_LIKE](state,data){
        state.list[data.index].likeCount = data.likeCount;
    }
};

export default {
    state,
    mutations
}

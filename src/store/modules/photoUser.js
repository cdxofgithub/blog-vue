import { PHOTO_USER,PHOTO_ADD,PHOTO_USER_STATUS,PHOTO_USER_CLEAR,PHOTO_LIKE_USER,PHOTO_DEL } from '../types'

const state = {
    list: [],
    own: false,
    status: 0
};

const mutations = {
    [PHOTO_USER](state, data) {
        const last = state.list[state.list.length -1];
        if(last && data.list[0] && last.date == data.list[0].date){
            last.list = last.list.concat(data.list[0].list);
            data.list.shift()
        }
        state.list = state.list.concat(data.list);
        state.own = data.own;
        state.status = data.status;
    },
    [PHOTO_ADD](state, data){
        if(!state.list[0] || state.list[0].date != '上传列表'){
            const data = {
                date: "上传列表",
                list: []
            };
            state.list.unshift(data)
        }
        state.list[0].list.push(data.photo);
    },
    [PHOTO_USER_STATUS](state, data){
        state.status = data.status;
    },
    [PHOTO_USER_CLEAR](state){
        state.list = [];
        state.own = false;
        state.status = 0;
    },
    [PHOTO_DEL](state,data){
        state.list[data.itemIndex].list.splice(data.photoIndex,1);
    },
    [PHOTO_LIKE_USER](state,data){
        state.list[data.itemIndex].list[data.photoIndex].likeCount = data.likeCount;
    }
};

export default {
    state,
    mutations
}

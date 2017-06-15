import { SHOW_MSG, HIDE_MSG } from '../types'

const state = {
    message: []
};

const mutations = {
    [SHOW_MSG](state , data){
        state.message.push(data)
    },
    [HIDE_MSG](state , id){
        state.message = state.message.filter(m => m.id !== id)
    }
};

export default {
    state,
    mutations
}

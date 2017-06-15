import { SHOW_MODAL, HIDE_MODAL } from '../types'

const state = {
    name: '',
    info: {},
    confirm: false,
    status: false
};

const mutations = {
    [SHOW_MODAL](state , data){
        state.name = data.name;
        state.info = data.info;
        state.confirm = false;
        state.status = true;
    },
    [HIDE_MODAL](state , data){
        state.confirm = data || false;
        state.status = false;
    }
};

export default {
    state,
    mutations
}

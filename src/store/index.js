import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import msg from './modules/msg'
import modal from './modules/modal'
import auth from './modules/auth'
import user from './modules/user'
import tags from './modules/tags'
import articlePage from './modules/articlePage'
import articleList from './modules/articleList'
import articleUser from './modules/articleUser'
import articleTogether from './modules/articleTogether'
import comment from './modules/comment'
import photo from './modules/photo'
import photoUser from './modules/photoUser'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  modules: {
      msg,
      modal,
      auth,
      user,
      tags,
      articlePage,
      articleList,
      articleUser,
      articleTogether,
      comment,
      photo,
      photoUser
  },
  strict: debug
})

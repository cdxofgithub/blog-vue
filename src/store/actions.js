import api from '../api/index'
import * as types from './types'

export const showMsg = ({ commit }, data) => {
    const id = new Date().getTime();
    data.id = id;
    commit(types.SHOW_MSG, data);
    setTimeout(() => commit(types.HIDE_MSG, id), 5000)
};

export const hideMsg = ({ commit }, id) => {
    commit(types.HIDE_MSG, id)
};

export const showModal = ({ commit }, data) => {
    commit(types.SHOW_MODAL, data);
};

export const hideModal = ({ commit }, data) => {
    commit(types.HIDE_MODAL, data);
};

export const userLogin = ({ commit }, data) => {
    api.localLogin(data).then(function (response) {
        commit(types.USER_LOGIN, {
            token: response.data.token
        });
        authInfo({ commit });
        showMsg({ commit },{
            content: '登录成功',
            type: 'info'
        })
    })
        .catch(function (error) {
            if (error.response) {
                showMsg({ commit },{
                    content: error.response.data.errorMsg || '登录失败',
                    type: 'danger'
                })
            }
        });
};

export const userLogout = ({ commit }) => {
    commit(types.USER_LOGOUT);
    window.location.pathname = '/login'
};

export const userReg = ({ commit }, data) => {
    api.localReg(data).then(function (response) {
        commit(types.USER_REG, {
            token: response.data.token,
        });
        authInfo({commit});
        showMsg({commit}, {
            content: '注册成功',
            type: 'info'
        })
    })
        .catch(function (error) {
            if (error.response) {
                showMsg({commit}, {
                    content: error.response.data.errorMsg || '注册失败',
                    type: 'danger'
                })
            }
        });
};

export const authInfo = ({ commit }) => {
    api.authInfo().then(function (response) {
        commit(types.AUTH_INFO, {
            token: response.data.token,
            info: response.data.authInfo
        })
    })
        .catch(function (error) {
            commit(types.AUTH_INFO)
    });

};

export const userInfo = ({ commit },data) => {
    api.userInfo(data).then(function (response) {
        commit(types.USER_INFO, {
            own: response.data.own,
            info: response.data.userInfo
        })
    })
        .catch(function (error) {
            commit(types.USER_INFO)
        });
};

export const userSet = ({ commit }) => {
    api.userSet().then(function (response) {
        commit(types.USER_SET, {
            own: response.data.own,
            info: response.data.userInfo
        })
    })
        .catch(function (error) {
            commit(types.USER_SET)
        });
};

export const updateUser = ({ commit }, data) => {
    api.updateUser(data).then(function (response) {
        commit(types.UPDATE_USER,{
            info:response.data.userInfo
        });
        showMsg({ commit },{
            content: '更新成功',
            type: 'info'
        })
    })
        .catch(function (error) {
            if (error.response) {
                showMsg({commit}, {
                    content: error.response.data.errorMsg || '更新失败',
                    type: 'danger'
                })
            }
        });
};

export const updateHeader = ({ commit }, data) => {
    commit(types.UPDATE_HEADER,data)
};

export const updatePassword = ({ commit }, data) => {
    api.updatePassword(data).then(function (response) {
        showMsg({ commit },{
            content: '更新成功',
            type: 'info'
        })
    })
        .catch(function (error) {
            if (error.response) {
                showMsg({commit}, {
                    content: error.response.data.errorMsg || '更新失败',
                    type: 'danger'
                })
            }
        });
};

export const tags = ({ commit }) => {
    api.tags().then(function (response) {
        commit(types.TAGS, {
            tags: response.data.tags
        })
    })
        .catch(function (error) {
        commit(types.TAGS)
        });
};

export const newTag = ({ commit },data) => {
    commit(types.NEW_TAG, data)
};

export const articlePage = ({ commit },data) => {
    api.articlePage(data).then(function (response) {
        commit(types.ARTICLE_PAGE, {
            page: response.data.article,
            collected: response.data.collected,
            own: response.data.own
        })
    })
        .catch(function (error) {
            commit(types.ARTICLE_PAGE)
        });
};

export const articleCollect = ({ commit,state },data) => {
    if(state.auth.info){
        api.articleCollect(data).then(function (response) {
            commit(types.ARTICLE_COLLECT, {
                collectCount: response.data.collectCount,
                collected: response.data.collected
            })
        })
            .catch(function (error) {
                commit(types.ARTICLE_PAGE)
            });
    }else{
        showMsg({commit}, {
            content: '请登录',
            type: 'danger'
        })
    }

};

export const addArticle = ({ commit },data) => {
    api.addArticle(data).then(function (response) {
        commit(types.ARTICLE_PAGE, {
            page: response.data
        });
        showMsg({ commit },{
            content: '提交成功',
            type: 'info'
        })
    })
        .catch(function (error) {
            if (error.response) {
                showMsg({commit}, {
                    content: error.response.data.errorMsg || '提交失败',
                    type: 'danger'
                })
            }
        });
};


export const editArticle = ({ commit }, data) => {
    api.editArticle(data).then(function (response) {
        commit(types.ARTICLE_PAGE, {
            page: response.data.article
        });
        showMsg({ commit },{
            content: '修改成功',
            type: 'info'
        })
    })
        .catch(function (error) {
            if (error.response) {
                showMsg({commit}, {
                    content: error.response.data.errorMsg || '修改失败',
                    type: 'danger'
                })
            }
        });
};

export const delArticle = ({ commit },data) => {
    api.delArticle(data).then(function (response) {
        commit(types.ARTICLE_DELETE,{
            deleted: response.data.success
        });
        showMsg({ commit },{
            content: '删除成功',
            type: 'info'
        })
    })
        .catch(function (error) {
            if (error.response) {
                showMsg({ commit },{
                    content: error.response.data.errorMsg || '删除失败',
                    type: 'danger'
                })
            }
        });
};

export const articleList = ({ commit },data) => {
    commit(types.ARTICLE_STATUS, {status: 1});
    api.articleList(data).then(function (response) {
        const status = response.data.article.length == 10?0:2;
        commit(types.ARTICLE_LIST, {
            list: response.data.article,
            status: status
        })
    })
        .catch(function (error) {
            commit(types.ARTICLE_STATUS, {status: 0});
            if (error.response) {
                showMsg({ commit },{
                    content: error.response.data.errorMsg || '网络故障',
                    type: 'danger'
                })
            }
        });
};

export const articleKeyword = ({ commit },data) => {
    commit(types.ARTICLE_KEYWORD, {
        keyword: data
    })
};

export const articleTagName = ({ commit },data) => {
    commit(types.ARTICLE_TAGNAME, {
        tagName: data
    })
};

export const articleClear = ({ commit }) => {
    commit(types.ARTICLE_CLEAR)
};


export const articleUser = ({ commit },data) => {
    commit(types.ARTICLE_USER_STATUS, {status: 1});
    api.articleUser(data).then(function (response) {
        const status = response.data.article.length == 10?0:2;
        commit(types.ARTICLE_USER, {
            list: response.data.article,
            status: status
        })
    })
        .catch(function (error) {
            commit(types.ARTICLE_USER_STATUS, {status: 0});
            if (error.response) {
                showMsg({ commit },{
                    content: error.response.data.errorMsg || '网络故障',
                    type: 'danger'
                })
            }
        });
};

export const articleUserClear = ({ commit }) => {
    commit(types.ARTICLE_USER_CLEAR)
};

export const articleTogether = ({ commit },data) => {
    commit(types.ARTICLE_TOGETHER_STATUS, {status: 1});
    api.articleTogether(data).then(function (response) {
        const status = response.data.article.length == 10?0:2;
        commit(types.ARTICLE_TOGETHER, {
            list: response.data.article,
            status: status
        })
    })
        .catch(function (error) {
            commit(types.ARTICLE_TOGETHER_STATUS, {status: 0});
            if (error.response) {
                showMsg({ commit },{
                    content: error.response.data.errorMsg || '网络故障',
                    type: 'danger'
                })
            }
        });
};

export const articleTogetherClear = ({ commit }) => {
    commit(types.ARTICLE_TOGETHER_CLEAR)
};

export const commentList = ({ commit },data) => {
    api.commentList(data).then(function (response) {
        commit(types.COMMENT_LIST, {
            comment: response.data.comment
        })
    })
        .catch(function (error) {
            commit(types.COMMENT_LIST)
        });
};

export const commentListAll = ({ commit },data) => {
    api.commentListAll(data).then(function (response) {
        commit(types.COMMENT_LIST, {
            comment: response.data.comment
        })
    })
        .catch(function (error) {
            commit(types.COMMENT_LIST)
        });
};

export const addComment = ({ commit,state },data) => {
    api.addComment(data).then(function (response) {
        const comment = response.data.comment;
        comment.userId = {
            _id: state.auth.info.id,
            nickname: state.auth.info.nickname,
            header: state.auth.info.header
        };
        commit(types.ADD_COMMENT, {
            comment: comment
        });
        commit(types.ARTICLE_COMMENT,{
            commentCount: response.data.commentCount
        });
        showMsg({ commit },{
            content: '留言成功',
            type: 'info'
        })
    })
        .catch(function (error) {
            if (error.response) {
                showMsg({ commit },{
                    content: error.response.data.errorMsg || '留言失败，登录后可以留言',
                    type: 'danger'
                })
            }
        });
};

export const delComment = ({ commit },data) => {
    api.delComment(data).then(function (response) {
        commentList({ commit }, response.data.aid );
        commit(types.ARTICLE_COMMENT,{
            commentCount: response.data.commentCount
        });
        showMsg({ commit },{
            content: '删除成功',
            type: 'info'
        })
    })
        .catch(function (error) {
            if (error.response) {
                showMsg({ commit },{
                    content: error.response.data.errorMsg || '删除失败',
                    type: 'danger'
                })
            }
        });
};

export const articleStatus = ({ commit },data) => {
    api.articleStatus(data).then(function (response) {
        commit(types.ARTICLE_PAGE_STATUS, {
            articleStatus: response.data.articleStatus
        });
        showMsg({ commit },{
            content: '修改成功',
            type: 'info'
        })
    })
        .catch(function (error) {
            if (error.response) {
                showMsg({commit}, {
                    content: error.response.data.errorMsg || '修改失败',
                    type: 'danger'
                })
            }
        });
};

export const addPhoto = ({ commit },data) => {
    api.addPhoto(data).then(function (response) {
        commit(types.PHOTO_ADD, {
            photo: response.data.photo
        })
    })
};

export const photoList = ({ commit },data) => {
    commit(types.PHOTO_STATUS, {status: 1});
    api.photoList(data).then(function (response) {
        if(response.data.photo.length == 0){
            return commit(types.PHOTO_STATUS, {status: 2});
        }
        const status = response.data.photo.length == 20 ? 0 : 2;
        let photoCount = 0;
        for(let i=0;i < response.data.photo.length;i++){
            const tempImage = new Image();
            tempImage.onload = function() {
                photoCount++;
                response.data.photo[i].height = tempImage.height + 30;
                if( photoCount == response.data.photo.length) {
                    commit(types.PHOTO_LIST, {
                        list: response.data.photo,
                        status: status
                    })
                }
            };
            tempImage.onerror = function(){
                photoCount++;
                response.data.photo[i].height = 0;
                if( photoCount == response.data.photo.length) {
                    commit(types.PHOTO_LIST, {
                        list: response.data.photo,
                        status: status
                    })
                }
            };
            tempImage.src = response.data.photo[i].thumbnail;
        }
    })
        .catch(function (error) {
            commit(types.PHOTO_STATUS, {status: 0});
            if (error.response) {
                showMsg({commit}, {
                    content: error.response.data.errorMsg || '网络故障',
                    type: 'danger'
                })
            }
        });
};

export const photoClear = ({ commit }) => {
    commit(types.PHOTO_CLEAR)
};

export const photoUser = ({ commit },data) => {
    commit(types.PHOTO_USER_STATUS, {status: 1});
    api.photoUser(data).then(function (response) {
        const status = response.data.photo.length == 0 ? 2 : 0;
        commit(types.PHOTO_USER, {
            list: response.data.photo,
            own: response.data.own,
            status: status
        })
    })
        .catch(function (error) {
            commit(types.PHOTO_USER_STATUS, {status: 0});
            if (error.response) {
                showMsg({commit}, {
                    content: error.response.data.errorMsg || '网络故障',
                    type: 'danger'
                })
            }
        });
};

export const photoUserClear = ({ commit }) => {
    commit(types.PHOTO_USER_CLEAR)
};

export const delPhoto = ({ commit },data) => {
    api.delPhoto(data.pid).then(function (response) {
        if(response.data.photo._id == data.pid) {
            commit(types.PHOTO_DEL, {
                itemIndex: data.itemIndex,
                photoIndex: data.photoIndex
            });
            showMsg({commit}, {
                content:  '删除成功',
                type: 'info'
            })
        }
    })
        .catch(function (error) {
            if (error.response) {
                showMsg({commit}, {
                    content: error.response.data.errorMsg || '网络故障',
                    type: 'danger'
                })
            }
        });
};

export const photoLike = ({ commit },data) => {
    api.photoLike(data.pid).then(function (response) {
        if (data.pid == response.data.pid) {
            commit(types.PHOTO_LIKE, {
                index: data.index,
                likeCount: response.data.likeCount
            })
        }
    })
        .catch(function (error) {
            if (error.response) {
                showMsg({commit}, {
                    content: error.response.data.errorMsg || '点赞失败',
                    type: 'danger'
                })
            }
        });
};

export const photoLikeUser = ({ commit },data) => {
    api.photoLike(data.pid).then(function (response) {
        if (data.pid == response.data.pid) {
            commit(types.PHOTO_LIKE_USER, {
                itemIndex: data.itemIndex,
                photoIndex: data.photoIndex,
                likeCount: response.data.likeCount
            })
        }
    })
        .catch(function (error) {
            if (error.response) {
                showMsg({commit}, {
                    content: error.response.data.errorMsg || '点赞失败',
                    type: 'danger'
                })
            }
        });
};

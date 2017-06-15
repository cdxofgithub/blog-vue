export const getmessage = state => state.msg.message;
export const getModal = state => state.modal;
export const getModalConfirm = state => state.modal.confirm;

export const getToken = state => state.auth.token;
export const getAuth = state => state.auth.info;

export const getUser = state => state.user;

export const getTags = state => state.tags.tags;

export const getArticle = state => state.articlePage.page;
export const getArticleDelete = state => state.articlePage.deleted;
export const getArticleCollect = state => state.articlePage.collected;
export const getArticleOwn = state => state.articlePage.own;
export const getArticleList = state => state.articleList;
export const getArticleUser = state => state.articleUser;
export const getArticleTogether = state => state.articleTogether;

export const getCommentList = state => state.comment.list;

export const getPhotoList = state => state.photo;

export const getPhotoUser = state => state.photoUser;

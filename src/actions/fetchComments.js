import axios from 'axios';
import {REQUEST_POSTS, RECEIVE_POSTS, SELECT_REDDIT, INVALIDATE_REDDIT} from '../assets/string.js';


export const requestPosts = (redditId, redditLink) => ({
  type: REQUEST_POSTS,
  redditId,
  redditLink
})

export const receivePosts = (redditId, redditLink, json) => { 
  // console.log('fetchComments => receivePosts => json.data.children', json.data.children)
  return ({
    type: RECEIVE_POSTS,
    redditId,
    redditLink,
    commentsObjects: json.data.children,
    receivedAt: Date.now()
  })
}

const fetchPosts = (redditId, redditLink) => dispatch => {
  dispatch(requestPosts(redditId, redditLink))
  return axios({
    method:'get',
    url:`https://www.reddit.com${redditLink}.json?raw_json=1`,
    responseType:'json'
  }).then((response) => {
    dispatch(receivePosts(redditId, redditLink, response.data[1]))      
  }).catch((error) => {
    console.log(error)      
  })
}

const shouldFetchPosts = (state, redditLink) => {
  const posts = state.comments[redditLink]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchComments = (redditId, redditLink) => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), redditLink)) {
    return dispatch(fetchPosts(redditId, redditLink))
  }
}
import axios from 'axios';
import {REQUEST_POSTS, RECEIVE_POSTS, SELECT_REDDIT, INVALIDATE_REDDIT} from '../assets/string.js';


export const requestPosts = redditId => ({
  type: REQUEST_POSTS,
  redditId
})

export const receivePosts = (redditId, json) => { 
  return ({
    type: RECEIVE_POSTS,
    redditId,
    detailObject: json.data.children[0].data,
    receivedAt: Date.now()
  })
}

const fetchPosts = redditId => dispatch => {
  dispatch(requestPosts(redditId))
  console.log('fetchDetail => fetchPosts => redditId =>', redditId)
  return axios({
    method:'get',
    url:`https://www.reddit.com/by_id/${redditId}.json?raw_json=1`,
    responseType:'json'
  }).then((response) => {
    if (response.data.data.children){
      dispatch(receivePosts(redditId, response.data))      
    }
  }).catch((error) => {
    console.log(error)      
  })
}

const shouldFetchPosts = (state, redditId) => {
  const posts = state.postsByRedditId[redditId]
  if (!posts) {
    console.log('Fetch again!')
    return true
  }
  if (posts.isFetching) {
    console.log('Not Fetch')
    return false
  }
  console.log('Not Fetch')  
  return posts.didInvalidate
}

export const fetchDetailByRedditId = redditId => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), redditId)) {
    return dispatch(fetchPosts(redditId))
  }
  // console.log('fetchDetail => fetchDetailByRedditId', redditId)
}
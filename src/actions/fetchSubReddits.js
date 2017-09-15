import axios from 'axios';
import { SELECT_SUB_REDDIT, INVALIDATE_SUB_REDDIT,
  REQUEST_SUB_REDDITS, RECEIVE_SUB_REDDITS, RE_REQUEST_SUB_REDDITS, RE_RECEIVE_SUB_REDDITS
} from '../assets/string.js';


const requestPosts = () => ({
  type: REQUEST_SUB_REDDITS,
})

const receivePosts = (json) => {   
  return ({
    type: RECEIVE_SUB_REDDITS,
    before: json.data.before,
    after: json.data.after,
    subRedditsObjects: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  })
}

const fetchPosts = () => dispatch => {
  dispatch(requestPosts())
  return axios({
      method:'get',
      url:`https://www.reddit.com/subreddits/popular.json`,
      responseType:'json'
    }).then((response) => {
      dispatch(receivePosts(response.data))
    }).catch((error) => {
      console.log(error)      
    })
}

export const fetchSubReddits = () => (dispatch, getState) => {
  return dispatch(fetchPosts())  
}



const reRequestPosts = reddit => ({
  type: RE_REQUEST_SUB_REDDITS,
  reddit,
})

const reReceivePosts = (reddit, json) => {  
  return ({
    type: RE_RECEIVE_SUB_REDDITS,
    reddit,
    before: json.data.before,
    after: json.data.after,
    topicObject: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  })
}

export const reFetchSubReddits = (reddit, after) => dispatch => {
  dispatch(reRequestPosts(reddit))
  return axios({
      method:'get',
      url:`https://www.reddit.com/subreddits/popular.json?after=${after}`,
      responseType:'json'
    }).then((response) => {
      dispatch(reReceivePosts(reddit, response.data))
    }).catch((error) => {
      console.log(error)      
    })
}
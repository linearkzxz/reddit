import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../assets/string.js'

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: {}
}, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.detailObject,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsByRedditId = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.redditId]: posts(state[action.redditId], action)
      }
    default:
      return state
  }
}

export default postsByRedditId
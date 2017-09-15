import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS, RE_REQUEST_POSTS, RE_RECEIVE_POSTS
} from '../assets/string.js'

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  after: '',
  before: '',
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
        didInvalidate: false,
      }
    case RECEIVE_POSTS:    
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.topicObject,
        after: action.after,
        before: action.before,
        lastUpdated: action.receivedAt
      }
    case RE_REQUEST_POSTS:    
      return {
      ...state,
      isFetching: true,
      didInvalidate: false,
    }
    case RE_RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: [...state.items, ...action.topicObject],
        after: action.after,
        before: action.before,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsByReddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
    case RE_RECEIVE_POSTS:      
    case RE_REQUEST_POSTS:
      return {
        ...state,
        [action.reddit]: posts(state[action.reddit], action)
      }
    default:
      return state
  }
}

// const rootReducer = combineReducers({
//   postsByReddit,
//   selectedReddit
// })

export default postsByReddit
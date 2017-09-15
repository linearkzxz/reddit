import {
  SELECT_SUB_REDDIT, INVALIDATE_SUB_REDDIT,
  REQUEST_SUB_REDDITS, RECEIVE_SUB_REDDITS, RE_REQUEST_SUB_REDDITS, RE_RECEIVE_SUB_REDDITS
} from '../assets/string.js'

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  after: '',
  before: '',
}, action) => {
  console.log('subReddits => post => action', action)
  switch (action.type) {
    case INVALIDATE_SUB_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_SUB_REDDITS:    
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case RECEIVE_SUB_REDDITS:    
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.subRedditsObjects,
        after: action.after,
        before: action.before,
        lastUpdated: action.receivedAt
      }
    case RE_REQUEST_SUB_REDDITS:    
      return {
      ...state,
      isFetching: true,
      didInvalidate: false,
    }
    case RE_RECEIVE_SUB_REDDITS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: [...state.items, ...action.subRedditsObjects],
        after: action.after,
        before: action.before,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const subReddits = (state = { }, action) => {
  console.log('action', action)
  switch (action.type) {
    case INVALIDATE_SUB_REDDIT:
    case RECEIVE_SUB_REDDITS:
    case REQUEST_SUB_REDDITS:
    case RE_RECEIVE_SUB_REDDITS:      
    case RE_REQUEST_SUB_REDDITS:
      return {
        ...state,
        datas: posts(state.datas, action)
      }
    default:
      return state
  }
}

export default subReddits
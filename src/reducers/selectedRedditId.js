import {
  SELECT_REDDIT_ID
} from '../assets/string.js'

const selectedReddit = (state = '', action) => {
  switch (action.type) {
    case SELECT_REDDIT_ID:
      return action.redditId
    default:
      return state
  }
}

export default selectedReddit

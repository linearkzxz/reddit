import {
  SELECT_REDDIT_ID
} from '../assets/string.js'

export const selectRedditId = redditId => ({
  type: SELECT_REDDIT_ID,
  redditId
})

export default selectRedditId

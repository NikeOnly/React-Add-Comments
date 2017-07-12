import {PropTypes} from 'react'

export function createUserShape() {
  return PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string
  })
}

export function createCommentShape() {
  return PropTypes.shape({
    id: PropTypes.string,
    msg: PropTypes.string,
    author: createUserShape(),
    createTime: PropTypes.number,
    likes: PropTypes.number,
    viewReplies: PropTypes.number,
    replies: PropTypes.arrayOf(PropTypes.any)
  })
}

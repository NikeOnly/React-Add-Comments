import React from 'react'
import _ from 'lodash'

class CommentListItemReplies extends React.PureComponent {
  render() {
    const {comment: {author, msg}} = this.props;
    return <div className='comment-list-item-replies__wrapper'>
      <div className='comment-list__header'>{author.firstName} {author.lastName}</div>
      <div>{msg}</div>
    </div>
  }
}

export default CommentListItemReplies;

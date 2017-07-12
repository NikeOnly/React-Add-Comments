import React from 'react'
import Avatar from '../user/Avatar'

class CommentListItemReplyInput extends React.PureComponent {
  render() {
    const {replyComment, onHandleReplyComment, onAddReply, userInfo, error, errorClassName} = this.props;
    return <form className={`${this.props.inputClassName || 'hidden'} comment-list-item-reply-input`}>
      <div className='comment-list-item-reply-input__wrapper'>
        <Avatar url={userInfo.avatarUrl} className='add-comment__avatar' />
        <input className={`comment-list-item-reply-input__input ${errorClassName}`}
          placeholder='reply...'
          value={replyComment}
          onChange={onHandleReplyComment}
        />
      </div>
      <button className='comment-list-item-reply-input__add-btn' onClick={onAddReply}>Add</button>
      <button className='comment-list-item-reply-input__cancel-btn' onClick={this.props.onHideReplyInput}>Cancel</button>
      <div className='comment-list-item-reply-input_error'>
        {error}
      </div>
    </form>
  }
}

export default CommentListItemReplyInput;

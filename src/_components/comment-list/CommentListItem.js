import React, {PropTypes} from 'react'
import CommentListItemReplies from './CommentListItemReplies'
import CommentListItemReplyInput from './CommentListItemReplyInput'
import Avatar from '../user/Avatar'
import {createCommentShape} from '../../_shapes/index'
import './comment-list-item.scss'

class CommentList extends React.PureComponent {
  static propTypes = {
    userInfo: PropTypes.any.isRequired,
    comment: createCommentShape().isRequired,

    addCommentReply: PropTypes.func.isRequired,
    validateComment: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = this.getInitState()
    this.onValidateCommentDebounced = _.debounce(this.onValidateComment, 500)
  }

  getInitState() {
    return {
      replyComment: '',
      showReplies: false,
      error: '',
      isValidatingComment: false
    }
  }

  onShowReplies() {
    if (this.state.showReplies) {
      this.setState({ showReplies: false })
      this.props.setCommentId(!this.props.comment.id)
    } else {
      this.setState({ showReplies: true })
    }
  }

  onShowReplyInput(inputClassName) {
    if (inputClassName === 'visible') {
      this.props.setCommentId(!this.props.comment.id)
    } else {
      this.props.setCommentId(this.props.comment.id)
    }
  }

  onAddReply() {
    if (this.state.isValidatingComment) {
      this.setState({ error: 'Validation is going on' })
    } else if (!this.state.error) {
      this.props.addCommentReply(this.props.userInfo, this.state.replyComment, this.props.comment).then(({payload: httpResponse}) => {
        if (httpResponse.error) {
          this.setState({error: httpResponse.error});
          setTimeout(() => {
            this.setState({error: ''});
          }, 1500)
          return;
        } else {
          this.setState({ ...this.getInitState(), showReplies: true })
        }
      })
    }
  }

  onHandleReplyComment(e) {
    const comment = e.target.value;

    this.setState({ replyComment: comment, isValidatingComment: true })
    this.onValidateCommentDebounced(comment);
  }

  onHideReplyInput() {
    this.props.setCommentId(!this.props.comment.id)
    this.setState({ replyComment: '' })
  }

  onValidateComment(comment) {
    if (!this.state.isValidatingComment) {
      this.setState({ isValidatingComment: true })
    }

    this.props.validateComment(comment).then(({payload: httpResponse}) => {
      this.setState({ error: httpResponse.error, isValidatingComment: false })
    })
  }

  render() {
    const {comment, commentId, onShowReplies, userInfo} = this.props;
    const {showReplies, error} = this.state;
    const inputClassName = `${commentId === comment.id ? 'visible' : 'hidden'}`;
    const errorClassName = error ? 'comment-list-item-reply-input__input_error' : '';

    let replies;
    if (comment.replies !== null) {
      const repliesArray = Array.from(comment.replies.values());

      replies = showReplies ?
      _.map(repliesArray, comment => <CommentListItemReplies key={comment.id} comment={comment}/>)
      : null;
    }

    const likeLabel = comment.likes > 0 ? `Like (${comment.likes})` : 'Like';
    const viewRepliesLabel = comment.viewReplies > 0 ? `View replies (${comment.viewReplies})` : '';

    return <li key={comment.id} className='comment-list__item'>
      <div className='comment-list__wrapper'>
        <Avatar className='comment-list__avatar' url={comment.author.avatarUrl} />
        <div className='comment-list__info'>
          <div className='comment-list__header'>{comment.author.firstName} {comment.author.lastName}</div>
          <div>{comment.msg}</div>
        </div>
      </div>
      <a>{likeLabel} </a>
      <a onClick={() => this.onShowReplyInput(inputClassName)}>Reply </a>
      <a onClick={::this.onShowReplies}>{viewRepliesLabel}</a>
      {replies}
      <CommentListItemReplyInput replyComment={this.state.replyComment}
        onHandleReplyComment={::this.onHandleReplyComment}
        onAddReply={::this.onAddReply}
        inputClassName={inputClassName}
        onHideReplyInput={() => this.onHideReplyInput(inputClassName)}
        userInfo={userInfo}
        error={error}
        errorClassName={errorClassName}
      />
    </li>
  }
}

export default CommentList;

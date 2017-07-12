import React, {PropTypes} from 'react'
import CommentListItem from './CommentListItem'
import Loader from '../loaders/Loader'
import './comment-list.scss'

class CommentList extends React.PureComponent {
  static propTypes = {
    commentInfo: PropTypes.instanceOf(Map),
    loadComments: PropTypes.func.isRequired
  }

  state = {
    isLoading: this.props.commentInfo === null,
    commentId: '',
  }

  componentDidMount() {
    if (this.props.commentInfo === null) {
      this.initCommentsLoad()
    }
  }

  initCommentsLoad() {
    if (!this.state.isLoading) {
      this.setState({isLoading: true});
    }

    this.props.loadComments().then(() => {
      this.setState({isLoading: false});
    })
  }

  setCommentId(commentId) {
    this.setState({ commentId: commentId })
  }

  render() {
    const {addCommentReply, userInfo, validateComment} = this.props;
    const {commentId} = this.state;

    if(this.state.isLoading) {
      return <Loader className='comment-list__loader' />
    }

    const commentArray = Array.from(this.props.commentInfo.values());
    const commentList = _.chain(commentArray)
    // .orderBy(['createdDate'], ['desc'])
    .map(comment => <CommentListItem key={comment.id}
      comment={comment}
      addCommentReply={addCommentReply}
      userInfo={userInfo}
      commentId={commentId}
      setCommentId={::this.setCommentId}
      validateComment={validateComment}
    />)
    .value();

    return <div>
      {commentList}
    </div>
  }
}

export default CommentList;

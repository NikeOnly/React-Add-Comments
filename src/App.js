import React from 'react';
import {connect} from 'react-redux';
import {loadComments, addComment, addCommentReply, validateComment} from './_reducers-and-actions/commentInfoActions'
import NewCommentForm from './_components/new-comment/NewCommentForm';
import CommentList from './_components/comment-list/CommentList';

/**
 * Main Wrapper
 */

 const mapStateToProps = state => ({
   commentInfo: state.commentInfo.idToComment,
   userInfo: state.userInfo
 })

@connect(mapStateToProps, {loadComments, addComment, addCommentReply, validateComment})
class App extends React.PureComponent {
  render() {
    const {commentInfo, userInfo, loadComments, addComment, addCommentReply, validateComment} = this.props;
    return <div>
      <NewCommentForm addComment={addComment}
        userInfo={userInfo}
        validateComment={validateComment}
      />
      <CommentList commentInfo={commentInfo}
        loadComments={loadComments}
        addCommentReply={addCommentReply}
        userInfo={userInfo}
        validateComment={validateComment}
      />
    </div>
  }
}

export default App;

import { ADD_COMMENT, LOAD_COMMENTS, NO_REDUCER } from '../_constants/actions'
import {Comment, comments} from '../_mock-data/commentInfo'

export function loadComments() {
  const request = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({data: comments});
    }, 1500);
  });

  return {
    type: LOAD_COMMENTS,
    payload: request
  }
};

export function addComment(user, comment) {
  const request = new Promise((resolve, reject) => {
    if (!comment) {
      resolve({error: 'Cannot be empty!'});
    }
    const newComment = new Comment(
      comment,
      user,
      new Date().getTime(),
      0,
      0,
      null
    )

    resolve({data: newComment});
  });

  return {
    type: ADD_COMMENT,
    payload: request
  }
}

export function addCommentReply(user, replyComment, comment) {
  const request = new Promise((resolve, reject) => {
    if (!replyComment) {
      resolve({error: 'Cannot be empty!'});
    } else {
      let newReplyComment = comment;
      const replyList = _.union(newReplyComment.replies, [
        new Comment(
          replyComment,
          user,
          new Date().getTime(),
          null,
          null,
          null
        )
      ]);

      newReplyComment.replies = replyList;
      newReplyComment.viewReplies = comment.replies.length

      resolve({data: newReplyComment});
    }
  });

  return {
    type: ADD_COMMENT,
    payload: request
  }
}

export function validateComment(comment) {
  const request = new Promise((resolve, reject) => {
    setTimeout(() => {
      const errorMessage = comment && comment.length > 25 ? 'Comment cannot be longer than 25 characters' : null;
      resolve({error: errorMessage})
    }, 200)
  })
  return {
    type: NO_REDUCER,
    payload: request
  }
}

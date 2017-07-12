import _ from 'lodash'
import { ADD_COMMENT, LOAD_COMMENTS } from '../_constants/actions'

const INITIAL_STATE = {
  idToComment: null,
};

const reducerMap = {
  [LOAD_COMMENTS]: (state, httpResponse) => {
    const idToComment = _.reduce(httpResponse.data, (idToComment, comment) => {
      return idToComment.set(comment.id, comment);
    }, new Map());

    return {idToComment}
  },
  [ADD_COMMENT]: (state, httpResponse) => {
    if (httpResponse.error) {
      return state;
    }

    const addedComment = httpResponse.data;
    const updatedIdToComment = new Map(state.idToComment);

    updatedIdToComment.set(addedComment.id, addedComment)
    return {idToComment: updatedIdToComment}
  }
};


export default(state = INITIAL_STATE, action) => {
  let stateUpdates = state;

  const reducer = reducerMap[action.type];
  if (reducer) {
    stateUpdates = reducer(state, action.payload);
  }

  return stateUpdates == state? state: {...state, ...stateUpdates};
}

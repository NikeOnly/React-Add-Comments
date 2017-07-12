import {currentUser} from '../_mock-data/userInfo'
import { ADD_COMMENT, LOAD_COMMENTS } from '../_constants/actions'

const INITIAL_STATE = {
    id: currentUser.id,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    avatarUrl: currentUser.avatarUrl
};

const reducerMap = {
  ['USER_ACTION']: (state, httpResponse) => {
    return {}
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

import { USER_REGISTER } from '../const/actionTypes';

const INITIAL_STATE = {
  user: {},
  loading: false,
  error: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case USER_REGISTER.PENDING:
      return { ...state, loading: true };
    case USER_REGISTER.SUCCESS:
      return { ...state, user: payload, loading: false, error: {} };
    case USER_REGISTER.FAIL:
      return { ...state, loading: false, error: payload.response.data };
    default:
      return state;
  }
};

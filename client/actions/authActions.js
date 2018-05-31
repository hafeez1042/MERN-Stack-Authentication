import { APIInstance as axios, setAccessTokenHeader } from '../helpers/axios';
import { REGISTER_API } from '../const/API';
import { USER_REGISTER } from '../const/actionTypes';

export const register = (data) => {
  return dispatch => {
    dispatch({ type: USER_REGISTER.PENDING });
    axios.post(REGISTER_API, data)
      .then(({ data: { accessToken, user } }) => {
        setAccessTokenHeader(accessToken);
        saveToken(accessToken, false);
        dispatch({
          type: USER_REGISTER.SUCCESS,
          payload: user,
        });
        redirectOnSuccess();
      }).catch( err => {
        dispatch({
          type: USER_REGISTER.FAIL,
          payload: err,
        });
      });
  };
};

const saveToken = (token, remember = true) => {
  if (remember) {
    localStorage.setItem('token', token);
  }
  sessionStorage.setItem('token', token);
};

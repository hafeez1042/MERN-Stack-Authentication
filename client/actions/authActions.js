import { APIInstance as axios, setAccessTokenHeader } from '../helpers/axios';
import { REGISTER_API, LOGIN_API } from '../const/API';
import { USER_REGISTER, USER_LOGIN, USER_LOGOUT } from '../const/actionTypes';

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
      }).catch(err => {
        dispatch({
          type: USER_REGISTER.FAIL,
          payload: err,
        });
      });
  };
};

export const login = (data) => {
  return dispatch => {
    dispatch({ type: USER_REGISTER.PENDING });
    axios.post(LOGIN_API, data)
      .then(({ data: { accessToken, user } }) => {
        setAccessTokenHeader(accessToken);
        saveToken(accessToken, data.remember);
        dispatch({
          type: USER_LOGIN.SUCCESS,
          payload: user,
        });
      }).catch(err => {
        dispatch({
          type: USER_LOGIN.FAIL,
          payload: err,
        });
      });
  };
};

export const verifyAuth = () => {

};

export const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  return { type: USER_LOGOUT };
};

const saveToken = (token, remember = false) => {
  if (remember) {
    localStorage.setItem('token', token);
  }
  sessionStorage.setItem('token', token);
};

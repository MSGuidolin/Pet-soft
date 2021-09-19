import axios from 'axios';
import actionsTypes from '../constants/constants';
import {
  EVENTS,
  GET_USERS,
  HOST,
  RESERVATIONS,
  USER,
} from '../../utils/constants';

// login
export const LoginUser = (data) => {
  return (dispatch) => {
    return axios
      .post(`${HOST}/auth/signin`, data)
      .then((response) => {
        dispatch({
          type: actionsTypes.LOGIN_SUCCESSFUL,
          payload: response.data,
        });
        return response.data;
      })
      .catch((error) => {
        if (error.response?.status !== 404 || 422)
          /* alert('El usuario ingresado no existe'); */
          dispatch({ type: actionsTypes.LOGIN_FAIL, payload: null });
      });
  };
};

//logout
export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: actionsTypes.LOGOUT,
      payload: '',
    });
  };
};

export const userActiveSession = () => {
  window.localStorage.getItem('loggedSpatifyApp');
  const user = JSON.parse(window.localStorage.getItem('loggedSpatifyApp'));
  return (dispatch) => {
    dispatch({
      type: actionsTypes.LOGGIN_IN_SESSION,
      payload: user.userFound.firstName,
    });
  };
};

//USER PROFILE

export const getUserProfile = (userId) => async (dispatch) => {
  dispatch({ type: actionsTypes.GET_USER_DATA_PROFILE_REQUEST });

  try {
    if (/^(?:[1-9]\d*|\d)$/.test(userId)) {
      const { data } = await axios.get(`${HOST}/users/google/${userId}`);
      dispatch({
        type: actionsTypes.GET_USER_DATA_PROFILE_SUCCESS,
        payload: data,
      });
    } else {
      const { data } = await axios.get(`${HOST}/users/${userId}`);
      dispatch({
        type: actionsTypes.GET_USER_DATA_PROFILE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionsTypes.GET_USER_DATA_PROFILE_FAIL,
      payload: error.message,
    });
  }
};

//DELETE USER
export const deleteUser = (id) => async () => {
  try {
    await axios.delete(`${HOST}/users/${id}`);
  } catch (error) {
    console.log(error);
  }
};

//USERS UPDATE AFTER LOGIN GOOGLE

// export const updateUsersAfterGoogle = (id, dataUpdate) => (dispatch) => {
//   try {
//     const { data } = axios.put(`${HOST}/users/${id}`, dataUpdate);
//     dispatch({
//       type: actionsTypes.UPDATE_USERS_AFTER_GOOGLE,
//       payload: data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

//USER RESERVATIONS

export const getUserReservations = (userId) => async (dispatch) => {
  dispatch({ type: actionsTypes.GET_USER_RESERVATIONS_REQUEST });

  try {
    const { data } = await axios.get(`${HOST}${EVENTS}${USER}/${userId}`);

    console.log("Aca hago el GET", "`${HOST}${EVENTS}/${USER}/${userId}`");

    dispatch({
      type: actionsTypes.GET_USER_RESERVATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionsTypes.GET_USER_RESERVATIONS_FAIL,
      payload: error.message,
    });
  }
};
//DELETE USER RESERVATIONS

export const deleteUserReservation = (payload) => async (dispatch) => {
  dispatch({ type: actionsTypes.DELETE_USER_RESERVATIONS_REQUEST });
  try {
    const { data } = await axios.post(
      `${HOST}${EVENTS}/cancel${USER}`,
      payload
    );

    dispatch({
      type: actionsTypes.DELETE_USER_RESERVATIONS_SUCCESS,
      payload: payload.event,
    });
  } catch (error) {
    dispatch({
      type: actionsTypes.DELETE_USER_RESERVATIONS_FAIL,
      payload: error.message,
    });
  }
};
///POST REVIEW

export const postUserReview = (payload) => async (dispatch) => {
  dispatch({ type: actionsTypes.POST_USER_RESERVATIONS_REVIEW_REQUEST });
  try {
    const { data } = await axios.post(`${HOST}${EVENTS}/review`, payload.input);

    dispatch({
      type: actionsTypes.POST_USER_RESERVATIONS_REVIEW_SUCCES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionsTypes.POST_USER_RESERVATIONS_REVIEW_SUCCES,
      payload: error.message,
    });
  }
};

// GET ALL USERS
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: actionsTypes.GET_ALL_USERS });
  try {
    const { data } = await axios.get(`${GET_USERS}`);
    dispatch({ type: actionsTypes.GET_ALL_USERS_SUCCES, payload: data });
  } catch (error) {
    dispatch({
      type: actionsTypes.GET_ALL_USERS_FAIL,
    });
  }
};
//USER ADDRESSES

export const getUserAddresses = (userId) => async (dispatch) => {
  dispatch({ type: actionsTypes.GET_USER_ADDRESSES_REQUEST });

  try {
    const { data } = await axios.get(`${GET_USERS}/${userId}/addresses`);
    dispatch({
      type: actionsTypes.GET_USER_ADDRESSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionsTypes.GET_USER_ADDRESSES_FAIL,
      payload: error.message,
    });
  }
};
//POST USER DATA ->>> UPDATE PROFILE

//DELETE  //"/:id/addresses/:idAd"

export const deleteUserAddresses = (payload) => async (dispatch) => {
  dispatch({ type: actionsTypes.DELETE_USER_ADDRESS_REQUEST });
  try {
    const { data } = await axios.delete(
      `${GET_USERS}/${payload.userID}/addresses/${payload.addressId}`
    );

    dispatch({
      type: actionsTypes.DELETE_USER_ADDRESS_SUCCESS,
      payload: payload.addressId,
    });
  } catch (error) {
    dispatch({
      type: actionsTypes.DELETE_USER_ADDRESS_FAIL,
      payload: error.message,
    });
  }
};

//POST USER DATA ->>> UPDATE PROFILE

export const putUserData = (userId, updatedData) => async (dispatch) => {
  dispatch({ type: actionsTypes.POST_USER_DATA_PROFILE_REQUEST });

  try {
    const { data } = await axios.put(`${GET_USERS}/${userId}`, updatedData);
    dispatch({
      type: actionsTypes.POST_USER_DATA_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionsTypes.POST_USER_DATA_PROFILE_FAIL,
      payload: error.message,
    });
  }
};

export const sortDateNew = () => (dispatch) => {
  dispatch({
    type: actionsTypes.SORT_EVENTS_NEW,
  });
};

export const sortDateOld = () => (dispatch) => {
  dispatch({
    type: actionsTypes.SORT_EVENTS_OLD,
  });
};

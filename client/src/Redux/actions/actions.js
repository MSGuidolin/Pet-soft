import axios from "axios";
import actionsTypes from "../constants/constants";
import { HOST, GET_PROVIDERS, GET_SERVICES } from "../../utils/constants.js";

export const getServices = () => async (dispatch) => {
  dispatch({
    type: actionsTypes.SET_SERVICES_REQUEST,
  });
  try {
    const data = await axios.get(GET_SERVICES);
    dispatch({ type: actionsTypes.SET_SERVICES_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: actionsTypes.SET_SERVICES_FAIL, payload: error.message });
  }
};

export const getServiceDetails = (serviceId) => async (dispatch) => {
  dispatch({ type: actionsTypes.GET_SERVICES_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(`${GET_SERVICES}/${serviceId}`);
    dispatch({ type: actionsTypes.GET_SERVICES_DETAILS_SUCCES, payload: data });
  } catch (error) {
    dispatch({
      type: actionsTypes.GET_SERVICES_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const getProviderDetails = (providerId) => async (dispatch) => {
  dispatch({ type: actionsTypes.GET_PROVIDER_DETAILS_REQ });
  try {
    const { data } = await axios.get(`${GET_PROVIDERS}/${providerId}`);
    dispatch({ type: actionsTypes.GET_PROVIDER_DETAILS_SUCC, payload: data });
  } catch (error) {
    dispatch({
      type: actionsTypes.GET_PROVIDER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const getAllProviders = () => async (dispatch) => {
  dispatch({ type: actionsTypes.GET_ALL_PROVIDERS });
  try {
    const { data } = await axios.get(`${GET_PROVIDERS}`);
    dispatch({ type: actionsTypes.GET_ALL_PROVIDERS_SUCCES, payload: data });
  } catch (error) {
    dispatch({
      type: actionsTypes.GET_ALL_PROVIDERS_FAIL,
      payload: error.message,
    });
  }
};

export const handleKeyword = (keyword) => (dispatch) => {
  dispatch({ type: actionsTypes.GET_KEYWORD_SEARCHBAR, payload: keyword });
};

export const getProviderServices = (providerId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${GET_PROVIDERS}/${providerId}/services`);
    dispatch({
      type: actionsTypes.GET_SERVICES_BY_PROVIDER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleSearchBar = (data) => (dispatch) => {
  dispatch({ type: actionsTypes.RENDER_SEARCHBAR, payload: data });
};

export const handleSetSearchBar = (data) => (dispatch) => {
  dispatch({ type: actionsTypes.SET_SEARCHBAR, payload: data });
};

export const getProviderRating = (providerId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${HOST}/providers/review/${providerId}/`);
    dispatch({
      type: actionsTypes.GET_ALL_RATING_BY_PROVIDER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sortByRating = (payload) => {
  return {
    type: actionsTypes.SORT_BY_RATING,
    payload,
  };
};

export const getProvidersbyServiceName = (serviceName) => async (dispatch) => {
  dispatch({ type: actionsTypes.GET_PROVIDERS_BY_SERVICE_REQUEST });
  try {
    const { data } = await axios.get(
      `${GET_PROVIDERS}/services/${serviceName}`
    );
    dispatch({
      type: actionsTypes.GET_PROVIDERS_BY_SERVICE_SUCCES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionsTypes.GET_PROVIDERS_BY_SERVICE_FAIL,
      payload: error.message,
    });
  }
};

export const updateProvider =
  (providerId, providerData) => async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${GET_PROVIDERS}/${providerId}`,
        providerData
      );
      const success = "Datos de perfil actualizados correctamente";
      dispatch({ type: actionsTypes.SET_PROVIDER_UPDATE, payload: success });
    } catch (error) {
      const err = "Ocurrió un error al actualizar los datos de tu perfil";
      dispatch({ type: actionsTypes.SET_PROVIDER_UPDATE, payload: err });
    }
  };

export const getAllProvidersAddresses = (providerId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${GET_PROVIDERS}/${providerId}/addresses`
    );
    dispatch({ type: actionsTypes.GET_PROVIDERS_ADDRESSES, payload: data });
  } catch (error) {
    const err = "Ocurrió un error al cargar tus direcciones";
    dispatch({ type: actionsTypes.GET_PROVIDERS_ADDRESSES, payload: err });
  }
};

export const createProviderAddress =
  (providerId, addressData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${GET_PROVIDERS}/${providerId}/addresses`,
        addressData
      );
      const success = "Dirección agregada correctamente";
      dispatch({ type: actionsTypes.SET_PROVIDER_ADDRESS, payload: success });
    } catch (error) {
      const err = "Ocurrió un error al crear tu dirección";
      dispatch({ type: actionsTypes.SET_PROVIDER_ADDRESS, payload: err });
    }
  };

export const updateProviderAddress =
  (providerId, addressId, addressData) => async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${GET_PROVIDERS}/${providerId}/addresses/${addressId}`,
        addressData
      );
      const success = "Dirección actualizada correctamente";
      dispatch({
        type: actionsTypes.SET_PROVIDER_ADDRESS_UPDATE,
        payload: success,
      });
    } catch (error) {
      const err = "Ocurrió un error al actualizar tu dirección";
      dispatch({
        type: actionsTypes.SET_PROVIDER_ADDRESS_UPDATE,
        payload: err,
      });
    }
  };

export const serviceSearch = (payload) => (dispatch) => {
  dispatch({ type: actionsTypes.SEARCH_SERVICE_BY_NAME, payload });
};

export const reservationStatus = (data) => async (dispatch) => {
  const default_data = {
    loading: true,
    message: "Loading...",
  };
  dispatch({
    type: actionsTypes.SET_RESERVATION_STATUS_LOADING,
    payload: default_data,
  });
  try {
    const { message } = await axios.post(`${HOST}/reservations`, data);
    const success = "Turno agregado con éxito";
    dispatch({ type: actionsTypes.SET_RESERVATION_STATUS, payload: success });
  } catch (error) {
    const err = "Error al agregar el turno";
    dispatch({ type: actionsTypes.SET_RESERVATION_STATUS, payload: err });
  }
};

export const checkoutMP = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${HOST}/paymentMP/create_preference`,
      payload
    );
    window.location = response.data.response.sandbox_init_pont;
  } catch (error) {
    console.error(error);
  }
};

//ADD PROVIDERS
export const addServicesToProvider = (services) => async () => {
  try {
    await axios.post(`${GET_PROVIDERS}/allServices`, services);
  } catch (error) {
    console.log(error);
  }
};

export const addHoursJobToProvider = (hours) => async () => {
  try {
    await axios.post(`${GET_PROVIDERS}/calendar`, hours);
  } catch (error) {
    console.log(error);
  }
};

export const addAddressesToProvider = (addresses) => async () => {
  try {
    await axios.post(
      `${GET_PROVIDERS}/${addresses.provider}/addresses`,
      addresses
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateProfileProvider = (updateData) => async () => {
  try {
    await axios.put(`${GET_PROVIDERS}/${updateData.provider}`, updateData);
  } catch (error) {
    console.log(error);
  }
};

export const getEventsHoursProvider = (providerId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${GET_PROVIDERS}/calendar/${providerId}`);
    dispatch({ type: actionsTypes.GET_PROVIDERS_EVENTS_HOURS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateEventsHoursProvider =
  (providerId, updateData) => async () => {
    try {
      const data = {
        eventsHours: updateData.eventsHours,
      };
      await axios.put(`${GET_PROVIDERS}/calendar/${providerId}`, data);
    } catch (error) {
      console.log(error);
    }
  };

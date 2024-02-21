import actionsTypes from "../constants/constants";
import {
  editAddress,
  findService,
  sortByDate,
  updateReservation,
} from "../../utils/filter.js";
import sortRatingCB from "../../utils/sortRatingCB";

const initialState = {
  services: {
    loading: true,
    data: [],
  },
  userActive: "",
  loginData: {},

  serviceDetails: { loading: true, data: {} },

  allProviders: {
    loading: true,
    data: [],
  },
  providerDetails: { loading: true, data: {} },
  providersByService: { loading: true, data: [] },
  servicesByProvider: [],
  providerEventsHours: {},
  providersAddresses: [],
  providerRating: {},
  provider_address_status: {},
  provider_address_update_status: {},
  provider_update_status: {},
  reservation_status: {},
  setStateSearch: "",
  renderSearchBar: "",
  userActive: "",
  loginData: {},
  userData: {
    loading: true,
    data: {},
  },
  userAddresses: { loading: true, data: [] },
  userReservations: { loading: true, data: [] },
  allUsers: [],
  keyword: "",
  sortType: "default",
  sortRating: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET SERVICES
    case actionsTypes.SET_SERVICES_REQUEST:
      return {
        ...state,
        services: { loading: true },
        allServices: { loading: false, data: action.payload },
      };
    case actionsTypes.SET_SERVICES_SUCCESS:
      return {
        ...state,
        allServices: { loading: false, data: action.payload },
        services: { loading: false, data: action.payload },
      };
    case actionsTypes.SET_SERVICES_FAIL:
      return {
        ...state,

        services: { loading: false, error: action.payload },
        allServices: { loading: false, error: action.payload },
      };

    //USERS LOGIN
    case actionsTypes.LOGIN_SUCCESSFUL:
      window.localStorage.setItem(
        "loggedPetSoftApp",
        JSON.stringify(action.payload)
      );
      return {
        ...state,
        loginData: action.payload,
        userActive: action.payload.userFound
          ? action.payload.userFound.firstName
          : action.payload.providerFound.firstName,
      };

    //LOGOUT USERS
    case actionsTypes.LOGOUT:
      window.localStorage.setItem("loggedPetSoftApp", "");
      // window.localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        loginData: {},
        userActive: action.payload,
      };

    case actionsTypes.LOGIN_IN_SESSION:
      return {
        ...state,
        userActive: action.payload,
      };

    //UPDATE USERS AFTER LOGIN GOOGLE
    // case actionsTypes.UPDATE_USERS_AFTER_GOOGLE:
    //   window.localStorage.setItem(
    //     'loggedPetSoftApp',
    //     JSON.stringify(action.payload)
    //   );
    //   return {
    //     loginData: action.payload,
    //     userActive: action.payload.userFound
    //       ? action.payload.userFound.firstName
    //       : action.payload.providerFound.firstName,
    //   };

    //GET SERVICES --> DETAILS
    case actionsTypes.GET_SERVICES_DETAILS_REQUEST:
      return {
        ...state,
        serviceDetails: { loading: true },
      };
    case actionsTypes.GET_SERVICES_DETAILS_SUCCES:
      return {
        ...state,
        serviceDetails: { loading: false, data: action.payload },
      };
    case actionsTypes.GET_SERVICES_DETAILS_FAIL:
      return {
        ...state,
        serviceDetails: { loading: false, error: action.payload },
      };

    //GET PROVIDERS BY SERVICE
    case actionsTypes.GET_PROVIDERS_BY_SERVICE_REQUEST:
      return {
        ...state,
        providersByService: { loading: true },
      };
    case actionsTypes.GET_PROVIDERS_BY_SERVICE_SUCCES:
      return {
        ...state,
        providersByService: { loading: false, data: action.payload },
      };
    case actionsTypes.GET_PROVIDERS_BY_SERVICE_FAIL:
      break;

    //GET SERVICES BY PROVIDER
    case actionsTypes.GET_SERVICES_BY_PROVIDER:
      return {
        ...state,
        servicesByProvider: action.payload,
      };
    case actionsTypes.GET_KEYWORD_SEARCHBAR:
      return {
        ...state,
        keyword: action.payload,
      };

    case actionsTypes.GET_ALL_PROVIDERS_SUCCES:
      return {
        ...state,
        allProviders: { loading: false, data: action.payload },
      };

    case actionsTypes.GET_PROVIDER_DETAILS_REQ:
      return {
        ...state,
        providerDetails: { loading: true },
      };

    case actionsTypes.GET_PROVIDER_DETAILS_SUCC:
      return {
        ...state,
        providerDetails: { loading: false, data: action.payload },
      };
    case actionsTypes.GET_PROVIDER_DETAILS_FAIL:

    //PROVIDERS' RATING
    case actionsTypes.GET_ALL_RATING_BY_PROVIDER:
      return {
        ...state,
        providerRating: action.payload,
      };
    case actionsTypes.SORT_BY_RATING:
      return {
        ...state,
        sortType: action.payload,
        sortRating: sortRatingCB(
          state.providersByService.data,
          action.payload
        ),
      };

    //GET PROVIDERS ADDRESSES
    case actionsTypes.GET_PROVIDERS_ADDRESSES:
      return {
        ...state,
        providersAddresses: action.payload,
      };

    //SET PROVIDER ADDRESS
    case actionsTypes.SET_PROVIDER_ADDRESS:
      return {
        ...state,
        provider_address_status: { message: action.payload },
      };

    //SET PROVIDER ADDRESS UPDATE
    case actionsTypes.SET_PROVIDER_ADDRESS_UPDATE:
      return {
        ...state,
        provider_address_update_status: { message: action.payload },
      };

    //SET PROVIDER UPDATE
    case actionsTypes.SET_PROVIDER_UPDATE:
      return {
        ...state,
        provider_update_status: { message: action.payload },
      };

    //EVENTS HOURS PROVIDER
    case actionsTypes.GET_PROVIDERS_EVENTS_HOURS:
      return {
        ...state,
        providerEventsHours: action.payload,
      };

    ///SEARCH SERVICE BY NAME
    case actionsTypes.SEARCH_SERVICE_BY_NAME:
      return {
        ...state,
        services: { data: findService(state.allServices.data, action.payload) },
      };

    //SET RESERVATIONS FOR USERS
    case actionsTypes.SET_RESERVATION_STATUS:
      return {
        ...state,
        reservation_status: { loading: false, message: action.payload },
      };
    case actionsTypes.SET_RESERVATION_STATUS_LOADING:
      return {
        ...state,
        reservation_status: action.payload,
      };

    /// GET USER DATA (PROFILE)
    case actionsTypes.GET_USER_DATA_PROFILE_REQUEST:
      return {
        ...state,
        userData: { loading: true },
      };
    case actionsTypes.GET_USER_DATA_PROFILE_SUCCESS:
      return {
        ...state,
        userData: { loading: false, data: action.payload },
      };
    case actionsTypes.GET_USER_DATA_PROFILE_FAIL:
      return {
        ...state,
        userData: { loading: false, error: action.payload },
      };

    /// GET USER ADDRESES
    case actionsTypes.GET_USER_ADDRESSES_REQUEST:
      return {
        ...state,
        userAddresses: { loading: true },
      };
    case actionsTypes.GET_USER_ADDRESSES_SUCCESS:
      return {
        ...state,
        userAddresses: { loading: false, data: action.payload },
      };
    case actionsTypes.GET_USER_ADDRESSES_FAIL:
      return {
        ...state,
        userAddresses: { loading: false, error: action.payload },
      };

    //DETELE USER ADDRESS

    case actionsTypes.DELETE_USER_ADDRESS_REQUEST:
      return {
        ...state,
        userAddresses: { ...state.userAddresses, loading: true },
      };
    case actionsTypes.DELETE_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        userAddresses: {
          loading: false,
          data: state.userAddresses.data.filter(
            (a) => a._id !== action.payload
          ),
        },
      };
    case actionsTypes.DELETE_USER_ADDRESS_FAIL:
      return {
        ...state,
        userAddresses: { loading: false, error: action.payload },
      };

    //GET USER RESERVATIONS

    case actionsTypes.GET_USER_RESERVATIONS_REQUEST:
      return {
        ...state,
        userReservations: { loading: true },
      };
    case actionsTypes.GET_USER_RESERVATIONS_SUCCESS:
      return {
        ...state,
        userReservations: { loading: false, data: action.payload },
      };
    case actionsTypes.GET_USER_RESERVATIONS_FAIL:
      return {
        ...state,
        userReservations: { loading: false, error: action.payload },
      };
    ///GET ALL USERS
    case actionsTypes.GET_ALL_USERS_SUCCES:
      return {
        ...state,
        allProviders: { loading: false, data: action.payload },
      };
    ///RENDER SEARCHBAR

    case actionsTypes.RENDER_SEARCHBAR:
      return {
        ...state,
        renderSearchBar: action.payload,
      };
    case actionsTypes.SET_SEARCHBAR:
      return {
        ...state,
        setStateSearch: action.payload,
      };

    //DETELE USER RESERVATIONS  ------>>

    case actionsTypes.DELETE_USER_RESERVATIONS_REQUEST:
      return {
        ...state,
        userReservations: { ...state.userReservations, loading: true },
      };
    case actionsTypes.DELETE_USER_RESERVATIONS_SUCCESS:
      console.log("Esto es reservations", state.userReservations.data);
      return {
        ...state,
        userReservations: {
          loading: false,
          data: updateReservation(state.userReservations.data, action.payload),
        },
      };

    case actionsTypes.DELETE_USER_RESERVATIONS_FAIL:
      return {
        ...state,
        userReservations: { loading: false, error: action.payload },
      };

    //POST USER REVIEW

    case actionsTypes.POST_USER_RESERVATIONS_REVIEW_REQUEST:
      return {
        ...state,
        userReservations: { ...state.userReservations, loading: true },
      };
    case actionsTypes.POST_USER_RESERVATIONS_REVIEW_SUCCES:
      return {
        ...state,
        userReservations: {
          loading: false,
          data: [...state.userReservations.data, action.payload.data],
        },
      };
    case actionsTypes.POST_USER_RESERVATIONS_REVIEW_FAIL:
      return {
        ...state,
        userReservations: { loading: false, error: action.payload },
      };

    ///SORT EVENTS BY DATE

    case actionsTypes.SORT_EVENTS_NEW:
      return {
        ...state,
        userReservations: {
          data: sortByDate(state.userReservations.data),
          loading: false,
        },
      };

    case actionsTypes.SORT_EVENTS_OLD:
      return {
        ...state,
        userReservations: {
          data: sortByDate(state.userReservations.data).reverse(),
          loading: false,
        },
      };

    default:
      return state;
  }
};

export default appReducer;

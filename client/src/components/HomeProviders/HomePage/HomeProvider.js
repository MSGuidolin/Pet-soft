import React, { useState, useEffect } from "react";
import "./HomeProviders.scss";
import banner from "../../../img/banner.png";
import VerticalLinearStepper from "../Stepper/SelectService";
import RecipeReviewCard from "../PendingServices/PendingServices";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import ProviderProfileData from "../../ProviderProfile/ProviderProfileData/ProviderProfileData";
import { red, green, orange } from "@material-ui/core/colors";
import ServicesProvider from "../../HomeProviders/ServicesProvider/ServicesProvider";
import ProviderProfileAddresses from "../../ProviderProfile/ProviderProfileAddresses/ProviderProfileAddresses";
import {
  getAllProvidersAddresses,
  getEventsHoursProvider,
  getProviderDetails,
  getProviderServices,
  getServices,
} from "../../../Redux/actions/actions";
import ActiveEvents from "./Events/ActiveEvents";

const boughtServices = [
  {
    image: "https://pymstatic.com/44253/conversions/xavier-molina-medium.jpg",
    firstName: "Mario",
    lastName: "Martinez",
    _id: "60f1bfde1497da2570de1a3a",
    gender: "Male",
    email: "lau@gmail.com",
    phone: 3152964865,
    services: ["Corte y peinado - Caballero"],
    addresses: ["calle 15 # 4a - 55"],
  },
  {
    image: "https://muhimu.es/wp-content/uploads/2017/04/FRENTE-NITIDA.jpg",
    firstName: "Euge",
    _id: "60f1bfde1497da2570de1a3e",
    lastName: "Butazzoni",
    gender: "Male",
    email: "Dani@gmail.com",
    phone: 1344560987,
    services: ["Corte y peinado - Niño"],
    addresses: ["calle 15 # 4a - 55"],
  },
];

//STYLES
const useStyles = makeStyles(() => ({
  providerProfile: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 30,
  },
  gridItem: {
    width: "70%",
    height: "auto",
  },
  gridBanner: {
    width: "100%",
    height: "auto",
    alignSelf: "flex-start",
  },
  gridProfile: {
    height: "auto",
    width: "auto",
  },
  gridForm: {
    height: "auto",
    width: "80%",
  },
  paper: {
    margin: "auto 10px",
    padding: 15,
  },
  containerBanner: {
    position: "relative",
    textAlign: "center",
    boxShadow: "0px 2px 2px #888888",
    marginBottom: 30,
    borderRadius: 3,
  },
  bannerText: {
    position: "absolute",
    top: "20%",
    left: 16,
  },
  bannerTextSubt: {
    position: "absolute",
    top: "40%",
    left: 16,
  },
  image: {
    display: "flex",
    justifyContent: "center",
  },
  profileImg: {
    borderRadius: "50%",
    width: 300,
    height: 300,
  },
  bannerImg: {
    width: "100%",
    height: "auto",
  },
  data: {
    marginTop: 20,
  },
  dataItems: {
    margin: "10px auto",
  },
  dataSubtitle: {
    fontWeight: "bold",
  },
  dirItems: {
    margin: "5px auto",
  },
  divider: {
    margin: "20px auto",
  },
  buttonContainer: {
    margin: "30px auto 5px auto",
    width: 200,
  },
  select: {
    width: "100%",
  },
  icon: {

    transform: 'scale(1.0, 1.0) rotate(0deg)',
    transition: '',
    '&:hover': {
      transform: 'scale(1.2, 1.2) rotate(340deg)',
      transition: 'transform 0.5s ease-in-out',

    },
    color: red[500],
  },
}));

//
//function isRendin

const HomeProvider = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const servicesByProvider = useSelector((state) => state.servicesByProvider);
  const services = useSelector((state) => state.services);
  const providerDetails = useSelector((state) => state.providerDetails);
  const providerEventsHours = useSelector((state) => state.providerEventsHours);
  //
  const addresses = useSelector((state) => state.providersAddresses);

  const provider = JSON.parse(
    window.localStorage.getItem("loggedSpatifyApp")
  ).providerFound;

  const [users, setUsers] = useState({
    firstName: "",
    services: [],
  });

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("loggedSpatifyApp"));
    if (user) {
      user.userFound
        ? setUsers({
          ...users,
          firstName: user.userFound?.firstName,
          services: user.userFound?.services,
        })
        : setUsers({
          ...users,
          firstName: user.providerFound?.firstName,
          services: user.providerFound?.services,
        });
    }

    dispatch(getServices());

    dispatch(getProviderServices(user.providerFound?._id));

    dispatch(getProviderDetails(user.providerFound?._id));

    dispatch(getEventsHoursProvider(provider?._id));
    //
    dispatch(getAllProvidersAddresses(provider?._id));
    //
  }, [dispatch]);

  return (
    <div className='container-main'>
      <div className='container'>

        {users.services.length >= 1 ? (
          <div className='user-profile-container'>

            <div className="info-provider">
              <ProviderProfileData
                className="prov-detail"
                classes={classes}
                provider={providerDetails?.data}
                data={addresses}
              />

              <ProviderProfileAddresses
                classes={classes}
                provider={provider}
                data={addresses}
              />

              <ServicesProvider
                classes={classes}
                provider={provider}
                data={servicesByProvider?.data}
                alldata={services.data}
                type="Servicios"
              />
              <ServicesProvider
                classes={classes}
                data={providerEventsHours?.eventsHours}
                alldata={services.data}
                type="Horarios"
              />
            </div>

            <div className="title-background">
              <h1>Pet-soft</h1>
              <h2>¡Bienvenido a tu {users.firstName} online!</h2>
            </div>

            <div className="booking-container">
              <div className="booking-data">
                <h1 className="h1"> MIS TURNOS</h1>
                <h3 className="final-title-back">Proximos Turnos </h3>
                <ActiveEvents />
              </div>
            </div>

          </div>) : null}
        {users.services.length < 1 ? (
          <div className='asdf'>
            <VerticalLinearStepper  data={addresses} providerID={provider?._id} />
          </div>
        ) : null
        }
      </div>
    </div>
  );
};

export default HomeProvider;

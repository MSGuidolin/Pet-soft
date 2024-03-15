
import React from "react";
import { Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import UserRegister from "../components/UserRegister/UserRegister";
import ProvRegister from "../components/ProvRegister/ProvRegister";
import Section from "../components/Section/Section.js";
import Cart from "../components/Cart/Cart";
import ServiceUpload from "../components/Section/Services/Service/ServiceUpload/ServiceUpload";
import { ProvidersByService } from "../components/Section/Providers/ProvidersByService";
import ProviderCalendar from "../components/ProviderCalendar/ProviderCalendar";
import ProviderProfile from "../components/ProviderProfile/ProviderProfile";
import UserProfile from "../components/UserProfile/UserProfile";
import ProviderDetails from "../components/ProviderDetails/ProviderDetails";
import HomeProvider from "../components/HomeProviders/HomePage/HomeProvider";
import Providers from "../components/SearchProvider/Providers";
import ProviderRating from "../components/Section/ProviderRating/ProviderRating";
// import CovidProtocol from "../components/CovidProtocol/CovidProtocol";
import Footer from "../components/Footer/Footer";
import AboutPetSoft from "../components/About/AboutPetSoft.js";
import AboutUs from "../components/About/AboutUs";
import CompletePerfil from '../components/CompletePerfil/CompletePerfil';

// import ConfirmationMail from "../components/ConfirmationMail/ConfirmationMail";
// import ConfirmationMailProvider from "../components/ConfirmationMail/ConfirmationMailProvider";

import EventsHistory from "../components/UserProfile/EventsHistory/EventsHistory";
import Pets from "../components/Pets/Pets";
import SeeHist from "../components/Pets/SeeHist/SeeHist.jsx";

const App = () => {
  return (
    <React.Fragment>

      <Route path='/' component={Header} />
      <Route exact path={['/']} component={(Home, Section)} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/userRegister' component={UserRegister} />
      <Route exact path='/provRegister' component={ProvRegister} />
      <Route exact path='/user/provider' component={HomeProvider} />
      <Route exact path='/complete/profile/:id' component={CompletePerfil} />

      <Route
        exact
        path="/services/providers/:serviceName"
        component={ProvidersByService}
      />
      {/* <Route path='/services/details/:id' component={ServiceDetails} /> */}
      <Route exact path={["/cart", "/cart/:id"]} component={Cart} />
      <Route exact path="/service/upload/:id" component={ServiceUpload} />
      <Route exact path="/providers/:id/profile" component={ProviderProfile} />
      <Route exact path="/providers/review/:id" component={ProviderRating} />
      <Route
        exact
        path="/services/providers/:service/:provider/calendar"
        component={ProviderCalendar}
      />
      <Route exact path="/providers/:id" component={ProviderDetails} />
      <Route exact path="/profile" component={UserProfile} />
      <Route exact path="/search" component={Providers} />
      {/* <Route exact path="/covid" component={CovidProtocol} /> */}
      <Route exact path="/profile/historial" component={EventsHistory} />
      <Route exact path="/pets" component={Pets} />
      <Route exact path="/seehist" component={SeeHist} />

      {/* <Route exact path="/confirmation/user/:id" component={ConfirmationMail} />
      <Route
        exact
        path="/confirmation/provider/:id"
        component={ConfirmationMailProvider}
      /> */}
      <Route exact path="/about-PetSoft" component={AboutPetSoft} />
      <Route exact path="/about-Us" component={AboutUs} />
      <Route path="/" component={Footer} />
    </React.Fragment>
  );
};

export default App;

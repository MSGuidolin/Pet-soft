
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReservations } from "../../../Redux/actions/user.actions";
import AccordionReservations from "./AccordionReservations";
import ReservationsToRate from "./ReservationsToRate";
import "./UserReservations.css";

function UserReservations() {
  return (

    <div className="booking-container">
      <div className="booking-data">
        <h1 className="h1"> MIS TURNOS</h1>
        <h3 className="final-title-back">Proximos Turnos </h3>
        <div className="booking-info">
          <AccordionReservations />
          <h3 className="final-title-back">Turnos por calificar </h3>
          <ReservationsToRate />
        </div>
      </div>
    </div>
  );
}

export default UserReservations;

import React from "react";
import imgDefault from "../../../../../img/masaje_1.jpg";
import "./Event.css";

function Event({ r }) {
  return (
    <div className="event-container">
     <div>
        <img className="img-default" src={imgDefault} alt="service"></img>
        </div>

      {r && (
        <div className="event-info">
          <h3>Servicio Contratado:</h3> {r.service.name}
          
          <p className="p-event-info">Dia: {r.date}</p>
          <p className="p-event-info">Hora: {r.hour} Hs.</p>
          <p className="p-event-info">Precio: ${r.service.price}</p>
          <p className="p-event-info">
            Prestador: {r.provider.firstName} {r.provider.lastName}
          </p>
        </div>
      )}
    </div>
  );
}

export default Event;

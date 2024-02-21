import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserReservation,
  getUserReservations,
} from "../../../Redux/actions/user.actions";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./AccordionReservations.css";
import { toast } from "react-toastify";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios from "axios";
import { HOST } from "../../../utils/constants";

function AccordionReservations() {
  const [ID, setID] = useState("");
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("loggedPetSoftApp")) {
      const storageData = JSON.parse(localStorage.getItem("loggedPetSoftApp"));
      if (storageData.userFound.roles[0].name === "user") {
        setID(storageData.userFound._id);
      }
    }
  }, []);

  useEffect(() => {
    if (ID) {
      dispatch(getUserReservations(ID));
    }
  }, [ID, change]);

  const data = useSelector((state) => state.userReservations.data);
  let reservations = [];
  if (data && data.length) {
    reservations = data;
  }

  const deleteReservation = (reservationId) => {
    toast.success('El turno fue dado de baja, se informará al proveedor', {
      position: toast.POSITION.TOP_CENTER
    })
    const event = reservationId
    dispatch(deleteUserReservation({ event }));
  };

  const checkDelete = async (reservationId) => {
    toast.success('El turno fue removido al historial', {
      position: toast.POSITION.TOP_CENTER
    })
    const event = reservationId;
    await axios.post(`${HOST}/events/alert`, { event: event });
    setChange(!change)
  };

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const [selected, setSelected] = useState(null);
  return (
    <div className="accordion-wrapper">
      <div className="accordion">
        {reservations.map((r, i) => (
          <>
            {r.isActive === true && (
              <div className="accordion-item event-active" onClick={() => toggle(i)}>
                <div className="accordion-title">
                  <p>
                    <b>Servicio Contratado:</b> {r.service.name}
                  </p>
                  <span>
                    {selected == i ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </div>
                <div
                  className={
                    selected == i
                      ? `accordion-description-show`
                      : `accordion-description`
                  }
                >
                  {r && (
                    <div>
                      <p className="p">Dia: {r.date}</p>
                      <p className="p">Hora: {r.hour} Hs.</p>
                      <p className="p">Precio: ${r.service.price}</p>
                      <p className="p">
                        Prestador: {r.provider.firstName} {r.provider.lastName}
                      </p>
                      <p className="p">
                        Mascota: {r.pet.name}
                      </p>
                      <p className="p">{`Dirección: ${r.address.address_1}, ${r.address.city}, ${r.address.state}
                                            , ${r.address.country}`}
                      </p>
                      <p className="p">Detalles: {r.address.address_details}</p>
                      <div className='center-target-button'>
                        <button onClick={() => deleteReservation(r._id)} className="cancel-button" >
                          Cancelar Turno
                          <CancelIcon />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ))}
        <h3 className="final-title-back">Turnos Cancelados</h3>
        {reservations.map((r, i) => (
          <>
            {r.userAlert === true && (
              <div className="accordion-item event-not-active" onClick={() => toggle(i)}>
                <div className="accordion-title">
                  <p>
                    <b>Servicio Contratado:</b> {r.service.name}
                  </p>
                  <span>
                    {selected == i ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </div>
                <div
                  className={
                    selected == i
                      ? `accordion-description-show`
                      : `accordion-description`
                  }
                >
                  {r && (
                    <div>
                      <p className="p">Dia: {r.date}</p>
                      <p className="p">Hora: {r.hour} Hs.</p>
                      <p className="p">Precio: ${r.service.price}</p>
                      <p className="p">
                        Prestador: {r.provider.firstName} {r.provider.lastName}
                      </p>
                      <p className="p">
                        Mascota: {r.pet.name}
                      </p>
                      <p className="p">{`Dirección: ${r.address.address_1}, ${r.address.city}, ${r.address.state}
                                            , ${r.address.country}`}
                      </p>
                      <p className="p">Detalles: {r.address.address_details}</p>
                      <div className='center-target-button'>
                        <button onClick={() => checkDelete(r._id)} className="check-button" >
                          Aceptar
                          <CheckCircleIcon />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default AccordionReservations;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserReservations,
} from "../../../Redux/actions/user.actions";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./AccordionReservations.css";
import RateReviewIcon from '@material-ui/icons/RateReview';
import FormReview from "../Form/FormReview";
import "./ReservationsToRate.css";

function ReservationsToRate() {
  const [ID, setID] = useState("");
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState({});
  const [reservations, setReservations] = useState([]);


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

  useEffect(() => {
    if (data) {
      setReservations(data)
    }
  }, [data]);

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
            {r.isActive === false && r.ratingAlert === true && (
              <div className="accordion-item pending-turn" onClick={() => toggle(i)}>
                <div className="accordion-title ">
                  <p>
                    <b>Servicio Contratado:</b> {r.service.name}
                  </p>
                  <span>
                    {selected === i ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </div>
                <div
                  className={

                    selected === i
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
                      <p className="p">{`Dirección: ${r.address.direction}, ${r.address.city}`}
                      </p>
                      {r.address.address_details && <p className="p">Detalles: {r.address.address_details}</p>}
                      <div className='center-target-button'>
                        <button className="review-button" onClick={() => setShowModal({ [i]: true })}>
                          Calificar al Prestador
                          <RateReviewIcon />
                        </button>
                      </div>

                      <FormReview
                        ind={i}
                        eventId={r._id}
                        showModal={showModal}
                        setShowModal={() => setShowModal({})}
                        setChange={() => setChange(!change)}

                      />

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

export default ReservationsToRate;

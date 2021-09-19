import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserReservations,
  postUserReview,
} from "../../../Redux/actions/user.actions";

import { validate } from "../../../utils/validate-user-profile";
import "./FormReview.css";

const ID = window.localStorage.getItem("loggedSpatifyApp")
  ? JSON.parse(window.localStorage.getItem("loggedSpatifyApp"))
  : null;

function FormReview({ showModal, setShowModal, eventId, setChange, ind }) {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phone: false,
  });

  const [input, setInput] = useState({
    assessment: "",
    comments: "",
    event: eventId,

  });

  useEffect(() => {
    console.log(ind)
  }, [])

  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      //Si hago click afuera del modal (en el wrapper), se cierra el modal gracias a useRef
      setShowModal();
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(postUserReview({ input }));
    setChange();
    toast.success(`Calificación enviada correctamente`, {
      position: toast.POSITION.TOP_CENTER
    })
    setShowModal()
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.name]: e.value,
    });
  };

  return (
    <>
      {showModal[ind] === true && (
        <div className="wrapper" ref={modalRef} onClick={closeModal}>
          <div className="form-container">
            <form>
              <h3 className='modal-title'>CALIFICAR AL PROVEEDOR</h3>

              <div className="form-element-a">
                <label>Puntuacion: </label>
                <input
                  className="input-form"
                  name="assessment"
                  type="number"
                  placeholder="Califique a su prestador un numero del 1 al 5"
                  onChange={(e) => handleInputChange(e.target)}
                />
                {errors.assesment && (
                  <p className="danger">{errors.assesment}</p>
                )}
              </div>
              <div>
                <label>Comentarios: </label>
                <textarea
                  rows="10" cols="40"
                  className="input-form-2"
                  name="comments"
                  type="text-area"
                  placeholder="deje un breve comentario"
                  onChange={(e) => handleInputChange(e.target)}
                />
                {errors.comments && <p className="danger">{errors.comments}</p>}
              </div>

              <div className='center-modal-test'>
                <button
                  className="button"
                  type="submit"
                  onClick={(e) => onSubmitHandler(e)}
                >
                  ENVIAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FormReview;

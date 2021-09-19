import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { putUserData } from "../../../Redux/actions/user.actions";
import { GET_USERS } from "../../../utils/constants";
import { validate } from "../../../utils/validate-user-profile";
import "./Form.css";

const ID = window.localStorage.getItem("loggedSpatifyApp")
  ? JSON.parse(window.localStorage.getItem("loggedSpatifyApp"))
  : null;

function Form({ showModal, setShowModal }) {
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phone: false,
  });

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    phone: null,

  });

  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      //Si hago click afuera del modal (en el wrapper), se cierra el modal gracias a useRef
      setShowModal(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${GET_USERS}/${userId}`, input);
      console.log(res);
      input = setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("loggedSpatifyApp")) {
      const userData = JSON.parse(
        window.localStorage.getItem("loggedSpatifyApp")
      );
      if (userData.userFound.roles[0].name === "user") {
        setUserId(userData.userFound._id);
      }
    }
  }, []);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.name]: e.value,
    });

    /*  var objError = validate({
      ...input,
      [e.name]: e.value,
    });
    setErrors(objError); */
  };

  return (
    <>
      {showModal && (
        <div className="wrapper" ref={modalRef} onClick={closeModal}>
          <div className="form-container">
            <form>
              <h3 className='modal-title'>EDITAR PERFIL</h3>

              <div className="form-element-1">
                <label>Nombre  </label>
                <input
                  className={`${errors.firstName && "danger"}`}
                  className="input-form"
                  name="firstName"
                  value={input.firstName}
                  placeholder="Ingresa su nombre"
                  onChange={(e) => handleInputChange(e.target)}
                />
                {errors.name && <p className="danger">{errors.lastName}</p>}
              </div>

              <div className="form-element-1">
                <label>Apellido  </label>
                <input
                  className={errors.lastName && "danger"}
                  className="input-form"
                  name="lastName"
                  type="text"
                  value={input.lastName}
                  placeholder="Ingrese su Apellido"
                  onChange={(e) => handleInputChange(e.target)}
                />
                {errors.lastName && <p className="danger">{errors.lastName}</p>}
              </div>
              <div className="form-element-1">
                <label>Telefono  </label>
                <input
                  className={errors.phone && "danger"}
                  className="input-form"
                  name="number"
                  type="number"
                  placeholder="Ingrese su numero de telefono"
                  onChange={(e) =>
                    setInput({ ...input, phone: parseInt(e.target.value) })
                  }
                />
                {errors.phone && <p className="danger">{errors.phone}</p>}
              </div>

              <div className='center-modal-test'>
                <button
                  className="button"
                  type="submit"
                  onClick={(e) => onSubmitHandler(e)}
                >
                  ACTUALIZAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Form;

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { GET_USERS } from "../../../utils/constants";
import { validateAddress } from "../../../utils/validate-addresses";
import "./Form.css";

function FormAddresses({ showModal, setShowModal, setChange }) {
  const [ID, setID] = useState("");
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [errors, setErrors] = useState({});
  const [first, setFirst] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("loggedPetSoftApp")) {
      const userData = JSON.parse(
        window.localStorage.getItem("loggedPetSoftApp")
      );
      if (userData.userFound.roles[0].name === "user") {
        setID(userData.userFound._id);
      }
    }
  }, []);

  const [input, setInput] = useState({
    name: "",
    country: "",
    state: "",
    city: "",
    address_1: "",
    address_details: "",
    zip_code: "",
    is_main: false
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      //Si hago click afuera del modal (en el wrapper), se cierra el modal gracias a useRef
      setShowModal(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (ID !== '') {
      if (!first) {
        setFirst(true);
      }
      if (!Object.keys(validateAddress(input)).length) {
        try {
          const { data } = await axios.post(
            `${GET_USERS}/${ID}/addresses`,
            input
          );
          setChange()
          toast.success('Dirección agregada correctamente', {
            position: toast.POSITION.TOP_CENTER
          })
        } catch (error) {
          toast.error('Ocurrió un error al añadir la dirección, intente de nuevo', {
            position: toast.POSITION.TOP_CENTER
          })
        }
        setShowModal(false)
      } else {
        setErrors(validateAddress(input))
        toast.error('Complete los datos para la dirección', {
          position: toast.POSITION.TOP_CENTER
        })
      }

    }
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.name]: e.value,
    });
  };

  const handleMain = (e) => {
    setInput({
      ...input,
      is_main: e.target.checked,
    });
  };

  useEffect(() => {
    if (first) {
      setErrors(validateAddress(input))
    }
  }, [input]);

  return (
    <>
      {showModal && (
        <div className="wrapper" ref={modalRef} onClick={closeModal}>
          <div className="form-container">
            <div className="form-element-a">
              <h3 className='modal-title'>NUEVA DIRECCIÓN</h3>
              <label>Referencia: </label>
              <input
                className={errors.name && "danger"}
                name="name"
                type="text"
                value={input.name}
                placeholder="Nombre para la dirección"
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>
            <div>
              <label>País: </label>
              <input
                className={errors.country && "danger"}
                name="country"
                type="text"
                value={input.country}
                placeholder="Ingrese el País"
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>
            <div>
              <label>Provincia: </label>
              <input
                className={errors.state && "danger"}
                name="state"
                type="text"
                value={input.state}
                placeholder="Ingrese la Provincia"
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>

            <div>
              <label>Ciudad: </label>
              <input
                className={errors.city && "danger"}
                name="city"
                type="text"
                value={input.city}
                placeholder="Ingrese la Ciudad"
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>
            <div>
              <label>Calle: </label>
              <input
                className={errors.address_1 && "danger"}
                name="address_1"
                type="text"
                value={input.address_1}
                placeholder="Ingrese la Calle"
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>

            <div>
              <label>Detalles: </label>
              <input
                className={errors.address_details && "danger"}
                name="address_details"
                type="text"
                value={input.address_details}
                placeholder="Ingrese los detalles"
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>

            <div>
              <label>Codigo Postal: </label>
              <input
                className={errors.zip_code && "danger"}
                name="zip_code"
                type="text"
                value={input.zip_code}
                placeholder="Ingrese el código postal"
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>
            <span className='main_address'>
              <label>Direccion Principal: </label>
              <input
                className={errors.zip_code && "danger"}
                name="is_main"
                type="checkbox"
                onChange={(e) => handleMain(e)}
              />
            </span>

            <div className='form-buttons'>
              <button
                className="button"
                onClick={() => setShowModal(false)}
              >
                CANCELAR
              </button>
              <button
                className="button"
                type="submit"
                onClick={(e) => onSubmitHandler(e)}
              >
                AGREGAR
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default FormAddresses;

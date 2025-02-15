import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { validateAddress } from "../../../utils/validate-addresses";
import { GET_USERS } from "../../../utils/constants";
import "./FormEditAddresses.css";
import { toast } from 'react-toastify';

function FormEditAddresses({ editAddressModal, setEditAddressModal, addressId, data, setChange }) {
  const [ID, setID] = useState("");
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: data.name,
    direction: data.direction,
    address_details: data.address_details,
    city: data.city,
    state: data.state,
    country: data.country,
    postal_code: data.postal_code,
    is_main: data.is_main,
  });

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


  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      //Si hago click afuera del modal (en el wrapper), se cierra el modal gracias a useRef
      setEditAddressModal({});
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (ID !== '') {
      if (!Object.keys(errors).length) {
        try {
          const { data } = await axios.put(
            `${GET_USERS}/${ID}/addresses/${addressId}`, input
          );
          setChange()
          toast.success('Dirección editada correctamente', {
            position: toast.POSITION.TOP_CENTER
          })
        } catch (error) {
          toast.error('Ocurrió un error al editar la dirección', {
            position: toast.POSITION.TOP_CENTER
          })
        }
      } else {
        toast.error('Complete los datos para realizar la modificación', {
          position: toast.POSITION.TOP_CENTER
        })
      }
    }
    window.location.reload(true);

  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.name]: e.value,
    })
  };

  const handleMain = (e) => {
    setInput({
      ...input,
      is_main: e.target.checked,
    });
  };

  useEffect(() => {
    setErrors(validateAddress(input))
  }, [input]);

  return (
    <>
      {editAddressModal[addressId] && (
        <div className="wrapper" ref={modalRef} onClick={closeModal}>
          <div className="form-container">
            <div className="form-element">
              <h3 className='modal-title'>EDITAR DIRECCIÓN</h3>
              <label>*Referencia: </label>
              <input
                className={errors.name && "danger"}
                name="name"
                type="text"
                value={input.name}
                onChange={(e) => handleInputChange(e.target)}
              />
              {errors.name && <p className="danger">{errors.name}</p>}
            </div>
            <div>
              <label>*País: </label>
              <input
                className={errors.country && "danger"}
                name="country"
                type="text"
                value={input.country}
                onChange={(e) => handleInputChange(e.target)}
              />
              {errors.country && <p className="danger">{errors.country}</p>}
            </div>

            <div>
              <label>*Provincia: </label>
              <input
                className={errors.state && "danger"}
                name="state"
                type="text"
                value={input.state}
                onChange={(e) => handleInputChange(e.target)}
              />
              {errors.state && <p className="danger">{errors.state}</p>}
            </div>

            <div>
              <label>*Ciudad: </label>
              <input
                className={errors.city && "danger"}
                name="city"
                type="text"
                value={input.city}
                onChange={(e) => handleInputChange(e.target)}
              />
              {errors.city && <p className="danger">{errors.city}</p>}
            </div>
            <div>
              <label>*Dirección: </label>
              <input
                className={errors.direction && "danger"}
                name="direction"
                type="text"
                value={input.direction}
                onChange={(e) => handleInputChange(e.target)}
              />
              {errors.direction && (
                <p className="danger">{errors.direction}</p>
              )}
            </div>

            <div>
              <label>Detalles: </label>
              <input
                className={errors.address_details && "danger"}
                name="address_details"
                type="text"
                value={input.address_details}
                onChange={(e) => handleInputChange(e.target)}
              />
              {errors.address_details && (
                <p className="danger">{errors.address_details}</p>
              )}
            </div>

            <div>
              <label>*Codigo Postal: </label>
              <input
                className={errors.postal_code && "danger"}
                name="postal_code"
                type="text"
                value={input.postal_code}
                onChange={(e) => handleInputChange(e.target)}
              />
              {errors.postal_code && <p className="danger">{errors.postal_code}</p>}
            </div>
            <span className='main_address'>
              <label>Dirección Principal: </label>
              <input
                name="is_main"
                type="checkbox"
                checked={input.is_main}
                onChange={(e) => handleMain(e)}
              />
            </span>

            <div className='form-buttons'>
              <button
                className="button"
                onClick={() => setEditAddressModal({})}
              >
                CANCELAR
              </button>
              <button
                className="button"
                type="submit"
                onClick={(e) => onSubmitHandler(e)}
              >
                ACEPTAR
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default FormEditAddresses;

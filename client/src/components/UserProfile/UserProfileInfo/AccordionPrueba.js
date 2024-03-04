import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAddresses,
  editUserAddresses,
  getUserAddresses,
} from "../../../Redux/actions/user.actions";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";
import "./AccordionPrueba.css";
import { BsTrash } from "react-icons/bs";
import useReactRouter from "use-react-router";
import FormEditAddresses from "../Form/FormEditAddresses";
import { toast } from "react-toastify";

function AccordionPrueba({ change, setChange }) {
  const [editAddressModal, setEditAddressModal] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [userID, setUserID] = useState([]);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const userAddresses = useSelector((state) => state.userAddresses.data);

  useEffect(() => {
    if (window.localStorage.getItem("loggedPetSoftApp")) {
      const userData = JSON.parse(
        window.localStorage.getItem("loggedPetSoftApp")
      );
      if (userData.userFound.roles[0].name === "user") {
        setUserID(userData.userFound._id);
      }
    }
  }, []);

  useEffect(() => {
    if (userID !== '') {
      dispatch(getUserAddresses(userID));
    }
  }, [userID, change]);

  useEffect(() => {
    setAddresses(userAddresses);
  }, [userAddresses]);

  const deleteAddress = (addressId) => {
    dispatch(deleteUserAddresses({ userID, addressId }));
    toast.success('Dirección eliminada correctamente', {
      position: toast.POSITION.TOP_CENTER
    })
  };

  const editAddress = (id) => {
    setEditAddressModal({ [id]: true })
  }

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <div className="accordion-wrapper">
      <div className="accordion">
        {addresses && addresses.length && addresses.map((a, i) => (
          <div key={i} className={a.is_main ? "accordion-item isMain" : "accordion-item"}>
            <div className="accordion-title">
              <p>
                <b>Referencia:</b> {a.name}
              </p>
              <span onClick={() => toggle(i)}>
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
              {a && (
                <div>
                  <p className="p">País: {a.country}</p>
                  <p className="p">Provincia: {a.state}</p>
                  <p className="p">Ciudad: {a.c}</p>
                  <p className="p">Dirección: {a.direction}</p>
                  <p className="p">Detalles: {a.address_details}</p>
                  <p className="p">Codigo Postal: {a.postal_code}</p>
                </div>
              )}
              <div className="accordion-item-options">
                <i className="trash-icon" onClick={() => deleteAddress(a._id)}>
                  <BsTrash />
                </i>
                <i className="edit-icon" onClick={() => editAddress(a._id)}>
                  <HiOutlinePencilAlt />
                </i>
              </div>
              <FormEditAddresses setChange={() => setChange()} addressId={a._id} data={a} editAddressModal={editAddressModal} setEditAddressModal={setEditAddressModal} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccordionPrueba;

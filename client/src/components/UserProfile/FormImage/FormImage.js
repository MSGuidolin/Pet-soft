import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_USERS } from "../../../utils/constants";
import "./FormImage.css";

function Form({ showModal, setShowModal }) {
  const [userId, setUserId] = useState("");
  const modalRef = useRef();
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phone: false,
  });

  const [image, setImage] = useState();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    phone: null,
  });

  useEffect(() => {
    if (window.localStorage.getItem("loggedPetSoftApp")) {
      const userData = JSON.parse(
        window.localStorage.getItem("loggedPetSoftApp")
      );
      if (userData.userFound.roles[0].name === "user") {
        setUserId(userData.userFound._id);
      }
    }
  }, []);

  useEffect(async () => {
    if (userId !== "") {
      const res = await axios.get(`${GET_USERS}/${userId}`, input);
      console.log(res.data);
      setInput(
        {
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone
        }
      )
    }
  }, [userId]);

  const dispatch = useDispatch();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${GET_USERS}/${userId}`, input);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    try {
      const res = await axios.post("http://localhost:3002/file/upload", image);
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {showModal && (
        <div className="wrapper" ref={modalRef} onClick={closeModal}>
          <div className="form-container">
            <form action={''} method="POST" encType="multipart/form-data">
              <h3 className='modal-title'>EDITAR IMAGEN</h3>
              <div className="form-element-1">
                <input value={image} type="file" name="file" id="file"></input>
                <label for="file" className="file"></label>
              </div>
              <div className="center-modal-test">
                <button type="submit" className="button" onClick={handleUpload}>ACTUALIZAR</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Form;

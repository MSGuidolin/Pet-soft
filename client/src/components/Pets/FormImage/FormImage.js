import React, { useEffect, useRef, useState } from "react";
import "./FormImage.css";
import { toast } from 'react-toastify';

function Form({ showModal, setShowModal, change }) {
  const [userId, setUserId] = useState("");
  const modalRef = useRef();

  const [image, setImage] = useState();

  const [input, setInput] = useState({
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

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const handleReload = () => {
    toast.success(`Mascota creada exitosamente`, {
      position: toast.POSITION.TOP_CENTER
    })
  }

  return (
    <>
      {showModal && (
        <div className="wrapper" ref={modalRef} onClick={closeModal}>
          <div className="form-container">
            <form action={`http://localhost:3002/pets/${userId}`} method="POST" encType="multipart/form-data">
              <h3 className='modal-title'>AÑADIR NUEVA MASCOTA</h3>
              <div className="form-element-1">
                <label>Nombre</label>
                <input
                  className="input-form"
                  name="name"
                  type="string"
                  placeholder="Nombre de la Mascota"
                  onChange={(e) =>
                    setInput({ ...input, name: e.target.value })
                  }
                />
              </div>
              <div className="form-element-1">
                <label>Especie Animal</label>
                <input
                  className="input-form"
                  name="animal"
                  type="string"
                  placeholder="Especie"
                  onChange={(e) =>
                    setInput({ ...input, animal: e.target.value })
                  }
                />
              </div>
              <div className="form-element-1">
                <label>Raza</label>
                <input
                  className="input-form"
                  name="race"
                  type="string"
                  placeholder="raza de la Mascota"
                  onChange={(e) =>
                    setInput({ ...input, race: e.target.value })
                  }
                />
              </div>
              <div className="form-element-1">
                <label>Edad</label>
                <input
                  className="input-form"
                  name="age"
                  type="number"
                  placeholder="Edad de la Mascota"
                  onChange={(e) =>
                    setInput({ ...input, age: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="form-element-1">
                <label>Foto</label>
                <input value={image} type="file" name="file" id="file"></input>
                <label for="file" className="file"></label>
              </div>
              <div className="center-modal-test">
                <button type="submit" className="button">CREAR</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Form;

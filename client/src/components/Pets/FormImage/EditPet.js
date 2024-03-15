import React, { useCallback, useEffect, useRef, useState } from "react";
import "./FormImage.css";
import { toast } from 'react-toastify';
import axios from "axios";
import { HOST } from "../../../utils/constants";

function Form({ showModal, setShowModal, refreshPets, pet }) {
  const [userId, setUserId] = useState("");
  const modalRef = useRef();

  const [petCopy, setPetCopy] = useState(pet);

  useEffect(()=>{
    setPetCopy(pet);
  }, [pet])


  const submitForm = useCallback(async(e)=> {
    e.preventDefault();
    const {_id:id, ...data} = petCopy;
    const response = await axios.put(`${HOST}/pets/${id}`,data );

    if (response.status === 200) {
        refreshPets();
        toast.success(`Mascota editada exitosamente`, {
            position: toast.POSITION.TOP_CENTER
          });
        setShowModal(false);
    }
  })

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="wrapper" ref={modalRef} onClick={closeModal}>
          <div className="form-container">
            <form action={`http://localhost:3002/pets/${userId}`} method="PUT" encType="multipart/form-data" onSubmit={submitForm}>
              <h3 className='modal-title'>EDITAR MASCOTA</h3>

              <div className="form-element-1">
                <label>Nombre</label>
                <input
                  className="input-form"
                  name="name"
                  type="string"
                  placeholder="Nombre de la Mascota"
                  value={petCopy.name}
                  onChange={(e) =>
                    setPetCopy({ ...petCopy, name: e.target.value })
                  }
                />
              </div>

              <div className="form-element-1">
                <label>Especie</label>
                <br></br>
                <select className="selectanimal" name="animal" type="string" required defaultValue={petCopy.animal} onSelect={(e)=>{
                    setPetCopy({...petCopy, animal: e.value})
                }}>
                  <option value="Gato" >Gato</option>
                  <option value="Perro" >Perro</option>
                  <option value="Ave" >Ave</option>
                  <option value="Otro" >Otro</option>
                </select>
              </div>

              <div className="form-element-1">
                <label>Raza</label>
                <input
                  className="input-form"
                  name="race"
                  type="string"
                  placeholder="Raza de la Mascota"
                  value={petCopy.race}
                  onChange={(e) =>
                    setPetCopy({ ...petCopy, race: e.target.value })
                  }
                />
              </div>

              <div className="form-element-1">
                <label>Edad (en años)</label>
                <input
                  className="input-form"
                  name="age"
                  type="number"
                  placeholder="Edad de la Mascota"
                  value={petCopy.age}
                  onChange={(e) =>
                    setPetCopy({ ...petCopy, age: parseInt(e.target.value) })
                  }
                />
              </div>

              <div className="form-element-1">
                <label>Sexo</label>
                <br></br>
                <input type="radio" id="male" name="sex" value="Macho" checked={petCopy.sex === 'Macho'} onClick={()=>setPetCopy({...petCopy, sex:'Macho'})}/>
                <label for="male">Macho</label>
                <input type="radio" id="female" name="sex" value="Hembra" checked={petCopy.sex === 'Hembra'} onClick={()=>setPetCopy({...petCopy, sex:'Hembra'})}/>
                <label for="female">Hembra</label>
              </div>

              {/* <div className="form-element-1">
                <label>Foto</label>
                <input value={image} type="file" name="file" id="file" required></input>
                <label for="file" className="file"></label>
              </div> */}
              <div className="center-modal-test">
                <button type="submit" className="button">ACTUALIZAR</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Form;

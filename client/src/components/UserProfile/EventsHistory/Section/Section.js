import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReservations } from "../../../../Redux/actions/user.actions";
import Event from "./Events/Event";
import Error from '../../../../components/Error/Error';
import "./Section.css";

function Section() {
  const [ID, setID] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userReservations.data);
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
  }, [ID]);

  // const useStyles = makeStyles(() => ({

  //   Error: {

  //   }
  // }));

  let reservations = [];
  if (data && data.length) {
    reservations = data;
  } else {
    return (
      <div className='container-main'>
        <div className='container'>
          <br />
          <h1 className='title'>Historial de compras</h1>
          <br />

          <table className='table'>
            <thead>
              <tr>
                <th>Mascota</th>
                <th>Fecha</th>
                <th>Servicio</th>
                <th>Veterinaria</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tesla</td>
                <td>28/06/2023</td>
                <td>Peluqueria</td>
                <td>Bigotes</td>
              </tr>
              <tr>
                <td>Tesla</td>
                <td>08/02/2023</td>
                <td>Cirugia</td>
                <td>Patitas</td>
              </tr>
              <tr>
                <td>Tesla</td>
                <td>08/02/2021</td>
                <td>Cirugia</td>
                <td>Hocicos</td>
              </tr>
              <tr>
                <td>Tesla</td>
                <td>08/02/2021</td>
                <td>Cirugia</td>
                <td>Hocicos</td>
              </tr>
              <tr>
                <td>Tesla</td>
                <td>08/02/2021</td>
                <td>Cirugia</td>
                <td>Hocicos</td>
              </tr>
            </tbody>
          </table>
          {/* <Error
            message='No se han registrado compras aún'
          /> */}

        </div>
      </div>
    )
  }

  return (
    <div className="section-main">
      {reservations.map((r, i) => (
        <div>
          {r.isActive === false &&
            r.ratingAlert === false &&
            r.condition === "finalized" && <Event r={r} key={i} />}{" "}
        </div>
      ))}
    </div>
  );
}

export default Section;

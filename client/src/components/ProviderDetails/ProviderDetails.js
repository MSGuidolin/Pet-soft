import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProviderDetails } from "../../Redux/actions/actions";
import "./ProviderDetails.scss";
import { useParams } from "react-router-dom";
import def_est_img from "../../img/default_estilista.jpg";
import ProviderServices from "../ProviderServices/ProviderServices";

const ProviderDetails = () => {
  const dispatch = useDispatch();
  const providerDetails = useSelector((state) => state.providerDetails);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProviderDetails(id));
  }, [dispatch]);
  console.log("DETALLES: ", providerDetails);
  return (
    <div className="container-main">
      <div className="container">
        <h1 className="title">
          {providerDetails.data &&
            `Bienvenido al espacio de ${providerDetails.data.firstName}`}
        </h1>
        <div>
          {providerDetails.data?.image !== undefined ? (
            <img
              className="card-img"
              src={providerDetails.data?.image}
              alt="Provider picture"
            ></img>
          ) : (
            <img
              className="card-img"
              src={def_est_img}
              alt="Default Image"
            ></img>
          )}
          <div>
            <h2 className="details-h2">Mi bio</h2>
            <div className="container-about">
              {providerDetails.data?.bio ? (
                <p>{providerDetails.data.bio}</p>
              ) : (
                <p>
                  Hola! Mi nombre es{" "}
                  <b>
                    {`${providerDetails.data?.firstName} ${providerDetails.data?.lastName}`}
                    .
                  </b>
                </p>
              )}
            </div>
          </div>
          <div>
            <ProviderServices providerId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;

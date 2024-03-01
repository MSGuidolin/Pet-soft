import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProviderDetails } from "../../Redux/actions/actions";
import "./ProviderDetails.scss";
import { useParams } from "react-router-dom";
import veterinaria_default from "../../img/veterinaria-default.jpg";
import petshop_default from "../../img/petshop-default.jpeg";
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
            `${providerDetails.data.firstName} ${providerDetails.data.lastName}`}
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
              src={veterinaria_default}
              alt="Default Image"
            ></img>
          )}
          <div>
            <h2 className="details-h2">Mi información</h2>
            <div className="container-about">
              {providerDetails.data?.bio ? (
                <p>{providerDetails.data.bio}</p>
              ) : (
                <p>
                  ¡Hola! Somos{" "}
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

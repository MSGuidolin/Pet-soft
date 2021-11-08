import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProviderDetails,
  getProviderRating,
} from "../../../Redux/actions/actions";
import "./ProviderRating.scss";

const ProviderRating = () => {
  const dispatch = useDispatch();

  const providerDetails = useSelector((state) => state.providerDetails);
  const rating = useSelector((state) => state.providerRating.data);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProviderDetails(id));
    dispatch(getProviderRating(id));
  }, [dispatch]);

  return (
    <div className="container-main">
      <div className="container">
        <h1 className="title">{`Éstas son las reseñas de ${providerDetails.data?.firstName}`}</h1>
        <div className="container-about">
          {rating?.length
            ? rating.map((rating) => {
                return (
                  <div>
                    <h4>{`${rating.assessment}⭐`}</h4>
                    <p>{`${rating.comments}`}</p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default ProviderRating;

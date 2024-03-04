import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProvidersbyServiceName,
  sortByRating,
} from "../../../Redux/actions/actions";
import { useParams } from "react-router-dom";
import Provider from "./Provider/Provider.js";
import "./ProvidersByService.scss";
import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";

export function ProvidersByService() {
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.providersByService.data);
  const sortType = useSelector((state) => state.sortType);
  const sortRating = useSelector((state) => state.sortRating);

  // const ratingProvider = ratingPr(providers.rating, average);

  const { serviceName } = useParams();

  const masRating = () => {
    dispatch(sortByRating("highest"));
  };
  const menosRating = () => {
    dispatch(sortByRating("lowest"));
  };

  useEffect(() => {
    dispatch(getProvidersbyServiceName(serviceName));
    return () => {};
  }, []);

  // if (providers)
  
    return (
      <div className="container-main">
        <div className="container">
          <div className="providers-container">
            <div className="providers-filters">
              <div>
                <h1 className="title">Proveedores de {`${serviceName}`}</h1>
              </div>
            </div>
            {/* <div style={{ display: "flex", marginTop: "1rem" }}>
              <button
                className="card-button"
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => masRating()}
                // class="sort-desc"
              >
                <BsArrowUpShort /> Mayor Rating
              </button>
              <button
                className="card-button"
                onClick={() => menosRating()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "1rem",
                }}
                // class="sort-asc"
              >
                <BsArrowDownShort /> Menor Rating
              </button>
            </div> */}
            {sortType === "default" && (
              <div className="providers-list">
                {providers &&
                  providers.map((provider, index) => (
                    <Provider
                      key={index}
                      provider={provider}
                      service={serviceName}
                    />
                  ))}
              </div>
            )}
            {sortType === "highest" && (
              <div className="providers-list">
                {providers &&
                  sortRating.map((provider, index) => (
                    <Provider
                      key={index}
                      provider={provider}
                      service={serviceName}
                    />
                  ))}
              </div>
            )}
            {sortType === "lowest" && (
              <div className="providers-list">
                {providers &&
                  sortRating.map((provider, index) => (
                    <Provider
                      key={index}
                      provider={provider}
                      service={serviceName}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
    // else return (
    //   <div>
    //   <h3>
    //   Ningún proveedor ofrece este servicio.
    //   </h3>
    // </div>
    // );
}

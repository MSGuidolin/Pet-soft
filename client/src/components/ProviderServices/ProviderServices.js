import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProviderServices } from "../../Redux/actions/actions";
import RecipeReviewCard from "../HomeProviders/PendingServices/PendingServices";
import { Grid } from "@material-ui/core";
import "./ProviderServices.scss";

const ProviderServices = ({ providerId }) => {
  const dispatch = useDispatch();
  const servicesByProvider = useSelector((state) => state.servicesByProvider);

  useEffect(() => {
    dispatch(getProviderServices(providerId));
  }, [dispatch]);

  return (
    // <div>
    <Grid container justifyContent="center" direction="column">
      <Grid item container justifyContent="center">
        {/* <h2 className="details-h2">
          Éstos son algunos de los servicios que brindamos
        </h2> */}
      </Grid>
      <Grid item container justifyContent="space-evenly">
        {servicesByProvider ? (
          servicesByProvider.data?.map((serv) => {
            return <RecipeReviewCard data={serv} />;
          })
        ) : (
          <h3>Sin servicios por el momento.</h3>
        )}
      </Grid>
    </Grid>
    // </div>
  );
};

export default ProviderServices;

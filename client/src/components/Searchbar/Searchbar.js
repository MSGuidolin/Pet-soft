import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  getServices,
  handleKeyword,
  getAllProviders,
  handleSearchBar,
} from "../../Redux/actions/actions";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchBar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const renderSearchBar = useSelector((state) => state.renderSearchBar)
  const services = useSelector((state) => state.services.data);
  const allProviders = useSelector((state) => state.allProviders);


  //Estados, ciudades
 const city =  allProviders.data?.map((z) => z.addresses[0]).map(x => x ? x.city : "")
 const state =  allProviders.data?.map((z) => z.addresses[0]).map(x => x ? x.state : "")
 

 const cityArr = new Set(city);
 const stateArr = new Set(state);
 
 const cityNoRep = [...cityArr];
 const stateNoRep = [...stateArr];
 
 const places = [...cityNoRep, ...stateNoRep]

  ///Nombre y Apellido de Proveedores
  const nameProvider = allProviders?.data.map((x) => {
    return { name: x.firstName, lastname: x.lastName };
  });
  const nameAndLastName = nameProvider
    .map((x) => Object.values(x))
    .map((a) => a.join(" "));

  const searchProvider = nameAndLastName.concat(places);
/// Servicios 
  const nameServices = services?.map((x) => x.name);
console.log(nameServices)

   

  const [keyword, setKeyword] = useState("");
  const handleChange = (e, value) => {
    setKeyword(value);
    dispatch(handleKeyword(keyword));
    
  };

 

  const reset = () => {
    setKeyword("");
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(handleKeyword(keyword));
    reset()
   };

  useEffect(() => {
    /*  dispatch(getServices());
    dispatch(getAllProviders());  */
    
    /* dispatch(handleSearchBar()) */
  }, [/* dispatch */, keyword /* renderSearchBar */]);

  return (

    <form
      type="submit"
      action=""
      onSubmit={onFormSubmit}
      style={{
        display: "flex",
        marginTop: 18,
        justifyContent: "center",
        borderRadius: 50,
        justifyContent: "center",
        marginRight: "15rem",
      }}
    >
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon style={{ color: "rgb(121, 47, 111)" }} />
        </div>
        {props?.state == "Prestadores" ?
        <Autocomplete
        
          id="custom-input-demo"
          options={searchProvider}
          getOptionLabel={(option) => {
            console.log(option)
            return option ? option : " "}}
          onChange={(e, value) => handleChange(e, value)}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                style={{ width: "200%", marginRight: "1rem", height: "4rem" }}
                placeholder={ "Buscar prestador por nombre o por zona..."}
                type="text"
                {...params.inputProps}
              />
              
            </div>
          )}
          inputProps={{ "aria-label": "search" }}
        />
     
        :
        <Autocomplete
          id="custom-input-demo"
          options={nameServices}
          getOptionLabel={(option) => {
            return option ? option : " "}}
          onChange={(e, value) => handleChange(e, value)}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                style={{ width: "200%", marginRight: "1rem", height: "4rem" }}
                placeholder={ "Busca tus servicios preferidos..."}
                type="text"
                {...params.inputProps}
              />
              
            </div>
          )}
          inputProps={{ "aria-label": "search" }}
        />
      }
      </div>
    </form>
  );
};

export default SearchBar;

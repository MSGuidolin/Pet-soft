import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  sortDateNew,
  sortDateOld,
} from "../../../../Redux/actions/user.actions";
import Dropdown from "../Dropdown/Dropdown";
import items from "./Options";
import "./Submenu.css";

function Submenu() {
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    
    if (options.length && options[0].value === "new") {
     
      dispatch(sortDateNew());
    } else if (options.length && options[0].value === "old") {
      dispatch(sortDateOld());
    } 
  }, [options]);

  return (
    <div className="sub-menu">
      <Dropdown
        title="Fecha"
        items={items}
        setSelection={setOptions}
        selection={options}
      />
    </div>
  );
}

export default Submenu;

import React, { useEffect, useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import {} from "react-icons/im";
import "./Dropdown.css";

function Dropdown({
  title,
  items,
  multiselect,
  selection,
  setSelection,
  filter,
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  

  // recordemos que some, checkea que almenos haya 1 item en el arreglo

  const handleOnClick = (item) => {
    //  cuando se clickea el item
    if (!selection.some((current) => current.id === item.id)) {
      //  si el item que se clickeo no esta en selected.
      if (!multiselect) {
        //  y si no es multiselect
        setSelection([item]); //  en selected mete el item que se clickeo
      } else if (multiselect) {
        setSelection([...selection, item]); //  si es multiselect, a lo que ya tenia selected agregale el item que se clickeo.
      }
    } else {
      //  si el item que se clickeo esta en selected
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        //  a selection le voy a querer sacar el elemento que tiene adentro y conicide con el se clickeo
        (current) => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  };

  const isItemSelected = (item) => {
    if (selection.find((current) => current.id === item.id)) {
      return true;
    }
    return false;
  };

  return (
    <div className={`dropdown-wrapper ${filter ? `filter underline` : `sort`}`}>
      <div
        tabIndex={0}
        className="dropdown-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dropdown-header">
          <span className="dropdown-header-title">{title}</span>
          <div className="dropdown-header-icon">
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>
        </div>
      </div>
      {open && (
        <ul className="dropdown-list">
          {items.map((item) => (
            <li className="dropdown-list-item" key={item.id}>
              <button
                type="button"
                className="dropdown-list-button"
                onClick={() => handleOnClick(item)}
              >
                <span className="dropdown-item-icon">
                  {isItemSelected(item) ? (
                    <ImCheckboxChecked className="checked" />
                  ) : (
                    <ImCheckboxUnchecked className="unchecked" />
                  )}
                </span>
                <span className="dropdown-item-name">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
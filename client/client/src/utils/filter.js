import moment from "moment";

export const findService = (array, searchTerm) => {
  if (searchTerm === "") return array;
  return array.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const editAddress = (addresses, addressId, newAddress) => {
  let array = [...addresses];

  function prueba(a, i) {
    if (a._id === addressId) {
      array[i] = newAddress;
    }
  }
  array.map((a, i) => prueba(a, i));

  return array;
};

export const updateReservation = (array, id) => {
  let newArray = [...array];
  const index = newArray.findIndex((obj) => obj._id === id);
  newArray[index].isActive = false;

  console.log(
    "Esta es la funcion updateReservation",
    array,
    id,
    newArray[index]._id
  );

  return newArray;
};

export const sortByDate = (array) => {
  const newArray = [...array];
  console.log(
    "Antes",
    newArray.map((e) => e.date)
  );
  /* 2013-08-03T02:00:00Z */
  /*  31/07/2021
   */
  /*  "YYYYMMDD" */
  newArray.sort(
    (a, b) => new Date(isoConverted(b.date)) - new Date(isoConverted(a.date))
  );
  console.log(
    "Despues",
    newArray.map((e) => e.date)
  );
  return newArray;
};

export const isoConverted = (string) => {
  /* 2013-08-03T02:00:00Z */
  /*  31/07/2021
   */

  const newString = string.split("/").reverse().join("-");

  return newString;
};

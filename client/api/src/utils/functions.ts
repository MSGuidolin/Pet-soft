
export const isValidDate = (date: String, hour: Number) => {
    let actual = new Date();
    const actualDate = actual.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const compareDate = actualDate.split("/");

    const actualHours = actual.getHours();
    const dateSplit = date.split("/");

    if (dateSplit[2] > compareDate[2]) return true;
    if (dateSplit[2] === compareDate[2]) {
        if (dateSplit[1] > compareDate[1]) return true;
        if (dateSplit[1] === compareDate[1]) {
            if (dateSplit[0] > compareDate[0]) return true;
            if (dateSplit[0] === compareDate[0]) {
                if (hour > actualHours) return true;
                else return false;
            }
            else return false;
        }
        else return false;
    }
    else return false;
}
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { reservationStatus } from '../../../Redux/actions/actions';
import { HOST } from '../../../utils/constants';
import './Reservation.scss';
import axios from 'axios';
import { Button, Menu, MenuItem } from '@material-ui/core';
import Fade from "@material-ui/core/Fade";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import FormAddresses from '../../UserProfile/Form/FormAddresses';
import { toast } from 'react-toastify';
import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';
import FormImage from '../../Pets/FormImage/FormImage';

export default function Reservation({ handleActive, date, hour, provider, service, price, handleClickModal, providerID }) {
    const [addresses, setAddresses] = useState([]);
    const [pets, setPets] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [addModal2, setAddModal2] = useState(false);
    const [change, setChange] = useState(false);
    const [change2, setChange2] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [anchorEl3, setAnchorEl3] = React.useState(null);
    const [anchorEl4, setAnchorEl4] = React.useState(null);
    const [data, setData] = useState({
        user: '',
        providerID: providerID,
        provider: provider,
        date: date,
        hour: hour,
        service: service,
        price: price,
        address: '',
        pet: '',
        isActive: true
    });
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const open2 = Boolean(anchorEl2);
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const handleClick2 = (e) => {
        setAnchorEl2(e.currentTarget);
    };
    const open3 = Boolean(anchorEl3);
    const handleClose3 = () => {
        setAnchorEl3(null);
    };
    const handleClick3 = (e) => {
        setAnchorEl3(e.currentTarget);
    };
    const open4 = Boolean(anchorEl4);
    const handleClose4 = () => {
        setAnchorEl4(null);
    };
    const handleClick4 = (e) => {
        setAnchorEl4(e.currentTarget);
    };

    useEffect(() => {
        if (localStorage.getItem('loggedPetSoftApp')) {
            const storageData = JSON.parse(localStorage.getItem('loggedPetSoftApp'))
            if (storageData.userFound.roles[0]?.name === "user") {
                setData({
                    ...data,
                    user: storageData.userFound._id
                })
            }
        }
    }, [])

    useEffect(() => {
        if (data.user !== '') {
            axios.get(`${HOST}/users/${data.user}/addresses`)
                .then(allAddresses => {
                    const addressesData = allAddresses.data;
                    setAddresses(addressesData);
                })
                .catch(err => {
                    console.log(err)
                })
            axios.get(`${HOST}/pets/${data.user}`)
                .then(allPets => {
                    const petsData = allPets.data.items;
                    setPets(petsData);
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [data.user, change])

    useEffect(() => {
        if (addresses.length) {
            let check = true;
            addresses.forEach(ad => {
                if (ad.is_main === true) {
                    check = false;
                    setData({
                        ...data,
                        address: ad.street
                    })
                }
            })
            if (check) {
                setData({
                    ...data,
                    address: addresses[0].street
                })
            }
        };
    }, [addresses])

    useEffect(() => {
        if (pets.length) {
            setData({
                ...data,
                pet: pets[0].name
            });
        };
    }, [pets])

const handleChange = (e) => {
    setData({
        ...data,
        address: e.target.innerText
    })
    setAnchorEl(null);
}

const handleChange2 = (e) => {
    setData({
        ...data,
        pet: e.target.innerText
    })
    setAnchorEl3(null);
}

const handleAdd = (e) => {
    setAnchorEl2(false);
    setAddModal(true);
}

const handleAdd2 = (e) => {
    setAnchorEl4(false);
    setAddModal2(true);
}

const dispatch = useDispatch();

const handleAccept = async () => {
        if(data.pet !== '') {
            handleClickModal()
            dispatch(reservationStatus(data));
            handleActive()
        } else {
            toast.error('Error al agregar el turno, por favor ingrese una Mascota', {
                position: toast.POSITION.TOP_CENTER
            })
        }
}

return (
    <div className='modal'>
        <div className='modal-content'>
            <h2>Reservación</h2>
            <div className='modal-detail'>
                <h3>Detalle del turno</h3>

                <tbody>
                    <tr>
                        <td>Proveedor</td>
                        <td>{provider}</td>
                    </tr>
                    <tr>
                        <td>Fecha</td>
                        <td>{date}</td>
                    </tr>
                    <tr>
                        <td>Hora</td>
                        <td>{`${hour}:00hs`}</td>
                    </tr>
                    <tr>
                        <td>Servicio</td>
                        <td>{service}</td>
                    </tr>
                    <tr>
                        <td>Precio</td>
                        <td>{`$${price}`}</td>
                    </tr>
                    <tr>
                        <td>Mascota</td>
                        <td className='td-address'>
                            <span>
                                {pets && pets.length ? data.pet : 'Ninguna'}
                            </span>
                            <span>
                                <Button aria-controls="pet-menu" aria-haspopup="true" onClick={handleClick3}>
                                    <HomeWorkTwoToneIcon className='modal-icon' />
                                </Button>
                                <Menu
                                    id="pet-menu"
                                    anchorEl={anchorEl3}
                                    keepMounted
                                    open={open3}
                                    onClose={handleClose3}
                                    TransitionComponent={Fade}
                                >
                                    {
                                        pets && pets.length && pets.map((el, index) => (
                                            <MenuItem onClick={(e) => handleChange2(e)} key={index} value={el.name}>{el.name}</MenuItem>
                                        ))
                                    }
                                </Menu>
                                <Button aria-controls="pet-add-menu" aria-haspopup="true" onClick={handleClick4}>
                                    <AddIcon className='modal-icon' />
                                </Button>
                                <Menu
                                    id="pet-add-menu"
                                    anchorEl={anchorEl4}
                                    keepMounted
                                    open={open4}
                                    onClose={handleClose4}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={() => handleAdd2()}>Añadir Mascota</MenuItem>
                                </Menu>
                            </span>
                            <FormImage showModal={addModal2} setShowModal={setAddModal2} setChange={() => setChange2(!change)} />
                        </td>
                    </tr>
                </tbody>
                <p>IMPORTANTE*</p>
                <p>El turno se añadirá a la bolsa de pago, pero estará disponible para otros usuarios hasta que se complete el pago del mismo.*</p>
            </div>
            <button
                className='modal-button left'
                onClick={() => handleActive()}
            >CANCELAR</button>
            <button
                className='modal-button right'
                onClick={handleAccept}
            >ACEPTAR</button>
        </div>
    </div >
);
}

import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { HOST } from "../../utils/constants";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import './ProviderCalendar.scss';
import Reservation from './Reservation/Reservation.js';
import LoadingReservation from './LoadingReservation/LoadingReservation.js';
import { NavLink } from 'react-router-dom';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

export default function ProviderCalendar({ match }) {
    const [provider, setProvider] = useState({});
    const [service, setService] = useState(match.params.service);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [events, setEvents] = useState([]);
    const [active, setActive] = useState({});
    const [ReActive, setReActive] = useState({});
    const [ReStatus, setReStatus] = useState('Cargando...');
    const [providerID, setProviderID] = useState(match.params.provider);
    const [date, setDate] = useState('');
    const [PreviousInfo, setInfo] = useState(null);
    const [invalid, setInvalid] = useState(false);
    const [userID, setUserID] = useState('');

    useEffect(() => {
        axios.get(`${HOST}/providers/${providerID}`)
            .then(prov => {
                const ProviderData = prov.data;
                setProvider(ProviderData);
            })
            .then(() => {
                axios.get(`${HOST}/services/name/${match.params.service}`)
                    .then(serv => {
                        const serviceData = serv.data
                        setService(serviceData);
                    })
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
            })
    }, [])

    useEffect(() => {
        if (localStorage.getItem('loggedPetSoftApp')) {
            const storageData = JSON.parse(localStorage.getItem('loggedPetSoftApp'))
            if (storageData.userFound.roles[0].name === "user") {
                setUserID(storageData.userFound._id)
            }
        }
    }, [])

    useEffect(() => {
        const actual = new Date();
        const actualDate = actual.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        setDate(actualDate)
    }, [])

    useEffect(() => {
        if (!error) {
            setLoadingEvents(true);
            axios.post(`${HOST}/events/calendar`, {
                provider: providerID,
                date: date,
                user: userID
            })
                .then(eventsList => {
                    setEvents(eventsList.data)
                    setLoadingEvents(false);
                })
                .catch(err => {
                    setError(true);
                })
        }
    }, [provider, date, ReActive])

    const handleDateClick = (e) => {
        if (PreviousInfo) PreviousInfo.dayEl.style.backgroundColor = ''
        const actual = e.date;
        const actualDate = actual.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        setDate(actualDate)
        e.dayEl.style.backgroundColor = '#8999F1';
        setInfo(e);
    }

    const handleClick = (e) => {
        if (localStorage.getItem('loggedPetSoftApp')) {
            if (active[e]) {
                setActive({ [e]: false })
            } else {
                setActive({ [e]: true })
            }
        } else {
            setInvalid(true)
        }
    }

    const handleClickModal = (e) => {
        if (ReActive[e]) {
            setReActive({
                [e]: false
            })
        } else {
            setReActive({
                [e]: true
            })
        }
    }

    return (
        <div className='container-main'>
            {
                loading ? (<div>cargando...</div>) :
                    error ? (<div>error...</div>) :
                        (<div className='container'>
                            <br />
                            <h1 className='title'>{`Agenda de ${provider.lastName}`}</h1>
                            <div className=''>
                                <div className='calendar-container'>
                                    <div className='calendar-division'>
                                        <FullCalendar
                                            locale={'es'}
                                            buttonText={{
                                                today: 'Día actual'
                                            }}
                                            plugins={[dayGridPlugin, interactionPlugin]}
                                            initialView="dayGridMonth"
                                            dateClick={handleDateClick}
                                        />
                                    </div>
                                    {
                                        loadingEvents ? (<div className='calendar-events'>cargando...</div>) : (
                                            <div className='calendar-events'>
                                                <h2>Turnos Disponibles</h2>
                                                {
                                                    !events ? (<div>cargando...</div>) : (
                                                        events.map((e, index) => (
                                                            <div
                                                                key={index}
                                                                className={
                                                                    e.isActive ?
                                                                        e.isAvailable ? 'event available'
                                                                            : 'event not-available'
                                                                        : 'event not-active'
                                                                }>
                                                                {
                                                                    active[index]
                                                                        ? (
                                                                            <Reservation
                                                                                handleActive={() => handleClick(index)}
                                                                                provider={`${provider.firstName} ${provider.lastName}`}
                                                                                date={e.date}
                                                                                hour={e.hour}
                                                                                service={service.name}
                                                                                price={service.price}
                                                                                providerID={providerID}
                                                                                handleClickModal={() => handleClickModal(index)}
                                                                            />
                                                                        ) : null
                                                                }
                                                                <div>
                                                                    <h4>{`${e.date} - ${e.hour}:00hs`}</h4>
                                                                    {`Disponibilidad: ${e.isActive ?
                                                                        e.isAvailable ? 'Disponible'
                                                                            : 'Reservado'
                                                                        : 'No Disponible'
                                                                        }`}
                                                                </div>
                                                                {
                                                                    e.isActive ?
                                                                        e.isAvailable ?
                                                                            e.isCartItem ?
                                                                                (<a href="/cart" className='cartItem'>Guardado<LocalMallOutlinedIcon /></a>) : (
                                                                                    <button
                                                                                        className='card-button'
                                                                                        onClick={() => handleClick(index)}
                                                                                    >
                                                                                        Añadir al bolso
                                                                                    </button>
                                                                                )
                                                                            : null
                                                                        : null
                                                                }
                                                                {
                                                                    ReActive[index]
                                                                        ? (
                                                                            <LoadingReservation
                                                                                handleClickModal={() => handleClickModal(index)}
                                                                                status={ReStatus}
                                                                            />

                                                                        ) : null
                                                                }
                                                            </div>
                                                        ))
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    {
                                        invalid ? (
                                            <div className='modal'>
                                                <div className='modal-content'>
                                                    <h2>Usuario no registrado</h2>
                                                    <p>Debe estar registrado y logueado para poder añadir reservaciones a la bolsa de compras</p>
                                                    <button
                                                        className='modal-button left'
                                                        onClick={() => setInvalid(false)}
                                                    >CANCELAR</button>
                                                    <NavLink exact to="/login" className='navlink'>
                                                        <button
                                                            className='modal-button right'
                                                        >INGRESAR</button>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>)
            }
        </div>
    )
}

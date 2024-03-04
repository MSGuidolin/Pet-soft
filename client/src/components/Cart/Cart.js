import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CartItem from './CartItem/CartItem';
import CartOrder from './CartOrder/CartOrder';
import Image from '../../img/wall-cart.jpg';
import axios from 'axios';
import { HOST } from '../../utils/constants'
import { getAllPrice, setPaginationViews } from '../../utils/pagination';
import Error from '../Error/Error';
import loadingGiff from '../../giff/loading.gif';
import './Cart.scss';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    gridContainer: {
        marginTop: '90px'
    },
}));

function Cart(props) {
    const [views, setViews] = useState([]);
    const [error, setError] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingItems, setLoadingItems] = useState(false);
    const [responseLoading, setResponseLoading] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (localStorage.getItem('loggedPetSoftApp')) {
            const storageData = JSON.parse(localStorage.getItem('loggedPetSoftApp'))
            if (storageData.userFound.roles[0].name === "user") {
                axios.get(`${HOST}/reservations/${storageData.userFound._id}`)
                    .then(reservations => {
                        setViews(setPaginationViews(reservations.data, 5));
                        setTotalPrice(getAllPrice(reservations.data));
                        setLoading(false);
                    })
                    .catch(err => {
                        setError('Error al cargar los servicios');
                        setLoading(false);
                    })
            }
        } else {
            setError('Debe estar registrado para acceder a su bolsa de compras');
            setLoading(false);
        }
    }, [loadingItems])

    const changePage = (change) => {
        if (change === 'next' && page < views.length - 1) setPage(page + 1);
        if (change === 'previous' && page > 0) setPage(page - 1);
    }

    const classes = useStyles();
    return (
        <div className='container-main'>
            <div className='container'>
                <br />
                <h1 className='title'>Bolsa de compras</h1>
                {
                    loading ? (<div>Loading...</div>) :
                        error ? (<div>{error}</div>) :
                            !views.length ? (
                                <Error
                                    message='No dispone de ninguna reservación de servicio en este momento'
                                />) :
                                (
                                    <Grid container direction="row">
                                        {
                                            responseLoading ? (
                                                <div className='modal'>
                                                    <div className='modal-content loading'>
                                                        {
                                                            responseLoading ? (
                                                                <img className='giff' src={loadingGiff}></img>
                                                            ) : null
                                                        }
                                                    </div>
                                                </div>
                                            ) : null
                                        }
                                        <div className='cart-pagination'>
                                            <div className='cart-pagination-header'>
                                                <button className='left' onClick={() => changePage('previous')}><NavigateBeforeIcon /></button>
                                                <span>{`Página ${page + 1} de ${views.length}`}</span>
                                                <button className='right' onClick={() => changePage('next')}><NavigateNextIcon /></button>
                                            </div>
                                            {
                                                views[page].map((reservation, index) => (
                                                    <CartItem
                                                        key={index}
                                                        data={reservation}
                                                        itemLoading={() => setLoadingItems(!loadingItems)}
                                                    />
                                                ))
                                            }
                                        </div>
                                        <div className='cart-detail'>
                                            <CartOrder
                                                total={totalPrice}
                                                itemLoading={() => setLoadingItems(!loadingItems)}
                                                response={(b) => setResponseLoading(b)}
                                                props={props}
                                            />
                                        </div>
                                    </Grid>
                                )
                }
            </div>
        </div>
    )
}

export default Cart;

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './LoadingReservation.scss';
import loadingGiff from '../../../giff/loading.gif';
import { toast } from 'react-toastify';


function LoadingReservation({ status, handleClickModal, key }) {

    useEffect(() => {
        if (!status.loading) {
            status.message === 'Turno agregado con éxito'
                ?
                toast.success(status.message, {
                    position: toast.POSITION.TOP_CENTER
                })
                :
                toast.error(status.message, {
                    position: toast.POSITION.TOP_CENTER
                })
            handleClickModal(key)
        }
    }, [status])

    return (
        <div className='modal'>
            <div className='modal-content loading'>
                {
                    status.loading ? (
                        <img className='giff' src={loadingGiff}></img>
                    ) : null
                }
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        status: state.reservation_status
    }
}

export default connect(mapStateToProps)(LoadingReservation);
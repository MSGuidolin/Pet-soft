import axios from 'axios';
import { PET_URL } from '../utils/constants';

export const GET_ALL_PETS = 'GET_ALL_PETS';

export function getAllPets() {
    return async function (dispatch) {
        try {
            const res = await axios.get(PET_URL);
            dispatch({ type: GET_ALL_PETS, payload: res.data })
        } catch (error) {
            console.log(error)
        }
    }
}
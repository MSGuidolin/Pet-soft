import { GET_ALL_PETS } from '../actions';

const initialState = {
    petsLoaded: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PETS:
            return {
                petsLoaded: action.payload
            }
        default:
            return state
    }
}

export default reducer;
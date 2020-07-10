import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    UserInfo : null,
    Professors : []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case actionTypes.SET_USERINFO : {
            return {
                ...state,
                UserInfo : action.UserInfo
            };
        }
        case actionTypes.GET_ALL_PROFESSORS : {
            return {
                ...state,
                Professors : action.Professors
            };
        }
        case actionTypes.RESET_STATE : {
            return initialState;
        }
        default:
            return state;
    }
};

export default reducer;
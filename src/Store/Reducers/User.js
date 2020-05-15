import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    UserInfo : null
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case actionTypes.SET_USERINFO : {
            return {
                ...state,
                UserInfo : action.UserInfo
            };
        }
        default:
            return state;
    }
};

export default reducer;
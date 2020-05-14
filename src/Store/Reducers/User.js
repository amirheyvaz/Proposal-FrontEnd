import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    UserRole : null
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case actionTypes.SET_USERROLE:{
            return {
                ...state,
                UserRole : action.UserRole
            };
        }
        default:
            return state;
    }
};

export default reducer;
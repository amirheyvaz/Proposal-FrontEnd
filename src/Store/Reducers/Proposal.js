import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    Proposal : null
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case actionTypes.GET_PROPOSAL : {
            return {
                ...state,
                Proposal : action.Proposal
            };
        }
        default:
            return state;
    }
};

export default reducer;
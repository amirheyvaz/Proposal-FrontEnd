import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    Proposal : null,
    Proposals : []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case actionTypes.GET_PROPOSAL : {
            return {
                ...state,
                Proposal : action.Proposal
            };
        }
        case actionTypes.DELETE_PROPOSAL : {
            return {
                ...state,
                Proposal : null
            };
        }
        default:
            return state;
    }
};

export default reducer;
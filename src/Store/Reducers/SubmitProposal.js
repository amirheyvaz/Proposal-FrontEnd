import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    ResearchTypes : null,
    Proposal_GeneralInfo : null
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case actionTypes.GET_ALL_RESEARCHTYPES : {
            return {
                ...state,
                ResearchTypes : action.ResearchTypes
            };
        }
        case actionTypes.SET_PROPOSAL_GENERALINFO : {
            return{
                ...state,
                Proposal_GeneralInfo : action.Proposal_GeneralInfo
            };
        }
        default:
            return state;
    }
};

export default reducer;
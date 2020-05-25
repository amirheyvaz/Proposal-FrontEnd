import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    ResearchTypes : null,
    Proposal_GeneralInfo : null,
    ProposalFile : null,
    SendingError : '',
    SendingPending : true
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
        case actionTypes.SET_FILE : {
            return{
                ...state,
                ProposalFile : action.file
            };
        }
        case actionTypes.SEND_PROPOSAL : {
            return {
                ...state,
                SendingError : action.error,
                SendingPending : action.result
            };
        }
        default:
            return state;
    }
};

export default reducer;
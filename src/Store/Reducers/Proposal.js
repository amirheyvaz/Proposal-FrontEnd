import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
    Proposal : null,
    Proposals : [],
    ProfessorCartableErrorMassage : null
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
        case actionTypes.GET_WAITING_PROPOSAL : {
            return {
                ...state,
                Proposals : action.Proposals
            };
        }
        case actionTypes.SET_PROFESSOR_CARTABLE_ERROR_MASSAGE : {
            return {
                ...state,
                ProfessorCartableErrorMassage : action.Massage
            }
        }
        default:
            return state;
    }
};

export default reducer;
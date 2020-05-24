import axios from 'axios';

import * as actionTypes from './ActionTypes';

export const GetAllResearchTypes = () => {
    return dispatch => {
        let url = 'http://localhost:8002/api/Proposal/GetAllResearchTypes/';
        axios.get(url , {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            dispatch({type : actionTypes.GET_ALL_RESEARCHTYPES , ResearchTypes : response.data});
        })
        .catch(err => {
            console.log(err);
        });
    };
};
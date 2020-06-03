import axios from 'axios';

import * as actionTypes from './ActionTypes';


export const GetProposal = () => {
    return dispatch => {
        let url = 'http://localhost:7357/api/Proposal/GetProposal/' + localStorage.getItem("userId");
        
        axios.get(url , {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                dispatch({type : actionTypes.GET_PROPOSAL , Proposal : response.data});
            })
            .catch(err => {
                console.log(err);
            });
    };
};
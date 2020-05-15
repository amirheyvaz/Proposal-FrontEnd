import axios from 'axios';

import * as actionTypes from './ActionTypes';


export const GetUserInfo = (Username) => {
    return dispatch => {
        let url = 'http://localhost:8002/api/Proposal/GetUserInfo/' + Username;
        
        axios.get(url , {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                dispatch({type : actionTypes.SET_USERINFO , UserInfo : response.data});
            })
            .catch(err => {
                console.log(err);
            });
    };
};
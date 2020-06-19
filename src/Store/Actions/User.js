import axios from 'axios';

import * as actionTypes from './ActionTypes';


export const GetUserInfo = (Username) => {
    return dispatch => {
        let url = 'http://localhost:7357/api/Proposal/GetUserInfo/' + Username;
        
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

export const GetAllProfessors = () => {
    return dispatch => {
        let url = 'http://localhost:7357/api/Proposal/GetAllProfessors';
        
        axios.get(url , {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                dispatch({type : actionTypes.GET_ALL_PROFESSORS , Professors : response.data});
            })
            .catch(err => {
                console.log(err);
            });
    };
};
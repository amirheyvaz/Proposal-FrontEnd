import axios from 'axios';

import * as actionTypes from './ActionTypes';
import { GetUserInfo } from './User';


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

export const DeleteProposal = (ID , message) => {
    return dispatch => {
        let url = 'http://localhost:7357/api/Proposal/DeleteProposal/' + ID;
        
        axios.get(url , {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                if(response.data){
                    message.config({
                        top: 70,
                        duration: 3,
                        maxCount: 3,
                        rtl: true,
                    });
                    message.success( {
                        content: 'عملیات حذف موفق بود',
                        style: {
                          marginTop: '50px !important',
                        },
                    });
                    dispatch({type : actionTypes.DELETE_PROPOSAL});
                    dispatch(GetUserInfo(localStorage.getItem("userId")));

                }
            })
            .catch(err => {
                console.log(err);
                message.config({
                    top: 70,
                    duration: 3,
                    maxCount: 3,
                    rtl: true,
                });
                message.error(
                {
                    content: 'عملیات حذف با خطا رو به رو شد',
                    style: {
                      marginTop: '50px !important',
                    },
                }
                );

            });
    };
};
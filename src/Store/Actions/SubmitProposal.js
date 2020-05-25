import axios from 'axios';

import * as actionTypes from './ActionTypes';

export const GetAllResearchTypes = () => {
    return dispatch => {
        let url = 'http://localhost:7357/api/Proposal/GetAllResearchTypes/';
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

export const SendProposal = (generalInfo , file) => {
    return dispatch => {
        
        let url = 'http://localhost:7357/api/Proposal/UploadProposal/' + localStorage.getItem('userId');
        axios.post(url ,
            {
                Name : generalInfo.PersianName,
                LatinName : generalInfo.LatinName ,
                keywords : generalInfo.Keywords ,
                ReseachTypeID : generalInfo.ResearchType ,
                File : file
            }
            ,{
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            const d = response.data;
            dispatch({type : actionTypes.SEND_PROPOSAL , error : '' , result : !d});
        })
        .catch(err => {
            console.log(err);
            dispatch({type : actionTypes.SEND_PROPOSAL , error : err.Message , result : false });
        });
    };
};
import axios from 'axios';

import * as actionTypes from './ActionTypes';

import * as Actions from './index';

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

export const SendProposal = (generalInfo , file , message) => {
    return dispatch => {
        
        let url = 'http://localhost:7357/api/Proposal/UploadProposal/' + localStorage.getItem('userId');
        axios.post(url ,
            {
                Name : generalInfo.PersianName,
                LatinName : generalInfo.LatinName ,
                keywords : generalInfo.Keywords ,
                ReseachTypeID : generalInfo.ResearchType ,
                FileID : file
                //File : file
            }
            ,{
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            const d = response.data;
            dispatch({type : actionTypes.SEND_PROPOSAL , error : '' , result : !d});
            message.config({
                top: 70,
                duration: 3,
                maxCount: 3,
                rtl: true,
            });
            message.success({
                content : "ثبت پروپوزال موفق بود",
                style : {
                    marginTop : "50px !important"
                }
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({type : actionTypes.SEND_PROPOSAL , error : err.Message , result : false });
        });
    };
};

export const EditProposal = (FileID , ProposalID , message , ProposalComment) => {
    return dispatch => {
        let url = 'http://localhost:7357/api/Proposal/EditProposal/' + ProposalID + "/" + FileID;
        axios.post(url 
            ,
            {
                Content : ProposalComment
            }
            ,
            {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            const d = response.data;
            if(d != null && d === true){
                message.config({
                    top: 70,
                    duration: 3,
                    maxCount: 3,
                    rtl: true,
                });
                message.success({
                    content : "ویرایش پروپوزال موفق بود",
                    style : {
                        marginTop : "50px !important"
                    }
                });
                dispatch(Actions.GetProposal());
            }
            else{
                message.config({
                    top: 70,
                    duration: 3,
                    maxCount: 3,
                    rtl: true,
                });
                message.error({
                    content : "ویرایش پروپوزال ناموفق بود",
                    style : {
                        marginTop : "50px !important"
                    }
                });
            }
            
        })
        .catch(err => {
            console.log(err);
        });
    };
};
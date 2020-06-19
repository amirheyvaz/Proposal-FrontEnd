import axios from 'axios';

import * as actionTypes from './ActionTypes';
import { GetUserInfo } from './User';


export const GetProfessorWaitingForActionProposals = () => {
    return dispatch => {
        let url = 'http://localhost:7357/api/Proposal/GetWaitingForActionProposals/' + localStorage.getItem("userId");

        axios.get(url , {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            dispatch({type : actionTypes.GET_WAITING_PROPOSAL , Proposals : response.data});
        })
        .catch(err => {
            const error = 'خطا در برقراری ارتباط با سرور';
            dispatch({type : actionTypes.SET_PROFESSOR_CARTABLE_ERROR_MASSAGE , Massage : error });
            console.log(err);
        });  
    };
}

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


export const SendProposalForAction = (ID , message) => {
    return dispatch => {
        let url = 'http://localhost:7357/api/Proposal/SendProposal/' + ID;
        
        axios.get(url , {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                if(response.data != null){
                    if(response.data == ''){
                        message.config({
                            top: 70,
                            duration: 3,
                            maxCount: 3,
                            rtl: true,
                        });
                        message.success( {
                            content: 'پروپوزال با موفقیت ارسال شد',
                            style: {
                              marginTop: '50px !important',
                            },
                        });
                    }
                    else{
                        message.config({
                            top: 70,
                            duration: 3,
                            maxCount: 3,
                            rtl: true,
                        });
                        message.error( {
                            content: response.data,
                            style: {
                              marginTop: '50px !important',
                            },
                        });
                    }
                    dispatch(GetProposal());
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
                    content: 'عملیات ارسال با خطا رو به رو شد',
                    style: {
                      marginTop: '50px !important',
                    },
                }
                );

            });
    };
};

export const AssignJudges = (ProposalID, FirstProfesorID , SecondProfessorID , message) => {
    return dispatch => {
        let url = 'http://localhost:7357/api/Proposal/AsignJudges/' + ProposalID + "/" + FirstProfesorID + "/"
            + SecondProfessorID;
        
        axios.get(url , {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                if(response.data != null && response.data == ''){
                    message.config({
                        top: 70,
                        duration: 3,
                        maxCount: 3,
                        rtl: true,
                    });
                    message.success( {
                        content: 'عملیات تعیین داوران با موفقیت انجام شد',
                        style: {
                          marginTop: '50px !important',
                        },
                    });
                    dispatch(GetProfessorWaitingForActionProposals());
                }
                else
                {
                    message.config({
                        top: 70,
                        duration: 3,
                        maxCount: 3,
                        rtl: true,
                    });
                    message.error( {
                        content: 'عملیات تعیین داوران با خطا رو به رو شد',
                        style: {
                          marginTop: '50px !important',
                        },
                    });
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
                    content: 'عملیات تعیین داوران با خطا رو به رو شد',
                    style: {
                      marginTop: '50px !important',
                    },
                }
                );

            });
    };
};


export const ApproveProposal = (ProposalID, ProfesorID ,comment, message) => {
    return dispatch => {
        let url = 'http://localhost:7357/api/Proposal/ApproveProposal/' + ProposalID + "/" + ProfesorID;
        
        axios.post(url ,{
            Content : comment.Content,
            ImportanceLevel : comment.ImportanceLevel
        } , {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        } 
        )
            .then(response => {
                if(response.data != null && response.data == ''){
                    message.config({
                        top: 70,
                        duration: 3,
                        maxCount: 3,
                        rtl: true,
                    });
                    message.success( {
                        content: 'عملیات تایید با موفقیت انجام شد',
                        style: {
                          marginTop: '50px !important',
                        },
                    });
                    dispatch(GetProfessorWaitingForActionProposals());
                }
                else
                {
                    message.config({
                        top: 70,
                        duration: 3,
                        maxCount: 3,
                        rtl: true,
                    });
                    message.error( {
                        content: 'عملیات تایید با خطا رو به رو شد',
                        style: {
                          marginTop: '50px !important',
                        },
                    });
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
                    content: 'عملیات تایید با خطا رو به رو شد',
                    style: {
                      marginTop: '50px !important',
                    },
                }
                );

            });
    };
};

export const RejectProposal = (ProposalID, ProfesorID ,comment, BigChanges , message) => {
    return dispatch => {
        let url = 'http://localhost:7357/api/Proposal/RejectProposal/' + ProposalID + "/" + ProfesorID;
        
        if(BigChanges != null){
            url += "/" + BigChanges;
        }

        axios.post(url ,{
            Content : comment.Content,
            ImportanceLevel : comment.ImportanceLevel
        } , {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        } 
        )
            .then(response => {
                if(response.data != null && response.data == ''){
                    message.config({
                        top: 70,
                        duration: 3,
                        maxCount: 3,
                        rtl: true,
                    });
                    message.success( {
                        content: 'عملیات رد با موفقیت انجام شد',
                        style: {
                          marginTop: '50px !important',
                        },
                    });
                    dispatch(GetProfessorWaitingForActionProposals());
                }
                else
                {
                    message.config({
                        top: 70,
                        duration: 3,
                        maxCount: 3,
                        rtl: true,
                    });
                    message.error( {
                        content: 'عملیات رد با خطا رو به رو شد',
                        style: {
                          marginTop: '50px !important',
                        },
                    });
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
                    content: 'عملیات رد با خطا رو به رو شد',
                    style: {
                      marginTop: '50px !important',
                    },
                }
                );

            });
    };
};
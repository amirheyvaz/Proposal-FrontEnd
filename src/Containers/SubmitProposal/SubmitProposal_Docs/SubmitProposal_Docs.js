import React , {Component} from "react";
import classes from "./SubmitProposal_Docs.module.css";
import { withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import *  as Actions from "../../../Store/Actions";
import * as ActionTypes from "../../../Store/Actions/ActionTypes";
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {Container , Row , Col , Button as BootButton} from 'react-bootstrap';
import axios from 'axios';



class SubmitProposal_Docs extends Component{

    state = {
        Uploaded : false,
        File : "",
        FileID : null
    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    render () {

        const RedirectVar = !this.props.isAuthenticated ? (<Redirect to="/LogIn" />) : null;

        // const UploadPropos = {
        //     onChange(info) {
        //         if (info.file.status !== 'uploading') {
        //           console.log(info.file, info.fileList);
        //         }
        //         if (info.file.status === 'done') {
        //           message.success(`${info.file.name} فایل با موفقیت بارگذاری شد`);
        //         } else if (info.file.status === 'error') {
        //           message.error(`${info.file.name} بارگذاری فایل ناموفق بود`);
        //         }
        //     },
        //     customRequest (req) {
        //         // var reader = new FileReader();
        //         // var b64;
        //         // reader.onloadend = function () {
        //         //     // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
        //         //     b64 = reader.result.replace(/^data:.+;base64,/, '');
        //         //     req.onSuccess();
        //         // };
        //         // reader.readAsDataURL(req.file);
        //        var base64 = this.toBase64(req.file);
               
        //     }
        // };

        return (
            <div className={classes.SubmitProposal_Docs}>
                <Container>
                    <Row>
                        <h5 style={{textAlign : 'center' , width : '100%'}}>
                            فایل اصلی معرفی پروپوزال را بارگذاری کنید
                        </h5>
                    </Row>
                    <Row >
                        <Upload 
                        accept=".pdf"
                        customRequest={
                            async (req) => {
                                if(!req.file.name.toLowerCase().includes("pdf")){
                                    req.onError('Invalid File Type');  
                                    return;
                                }
                                this.setState({
                                    File : req.file
                                    // Uploaded : true
                                });
                                return new Promise(
                                    () => {
                                        const  url = `http://localhost:7357/api/Proposal/UploadProposalFile`;    
                                        const formData = new FormData(); 
                                        formData.append('body', req.file); 
                                        const config = {    
                                            headers: {    
                                                    'content-type': 'multipart/form-data',    
                                                    "Authorization" : "Bearer " + localStorage.getItem("token")
                                            }  
                                        };    
                                        axios.post(url, formData, config).then(
                                            Response => {
                                                if(Response.data != null && Response.data != ""){
                                                    this.setState({
                                                        Uploaded : true,
                                                        FileID : Response.data
                                                    });
                                                    this.props.SetFileID(Response.data);
                                                    req.onSuccess();
                                                }
                                            }
                                        ).catch(err => {
                                            console.log(err);
                                        });
                                    }
                                );
                                
                                // var base64 = await this.toBase64(req.file);
                                // this.props.SetFile(base64);
                                

                                // req.onSuccess();
                            }
                        } 
                        className={classes.DIVROW}>
                            <Button>
                                <UploadOutlined /> برای بارگذاری کلیک کنید
                            </Button>
                        </Upload>
                    </Row>
                    <Row  className={classes.ButtonROW}>
                        <Col>
                            <BootButton onClick={this.props.NextClick} variant="outline-success" disabled={!this.state.Uploaded} className={classes.Button}>
                                ثبت پروپوزال
                            </BootButton>
                        </Col>
                        <Col>
                            <BootButton onClick={this.props.BackClick} variant={"outline-danger"}>
                                مرحله قبل
                            </BootButton>
                        </Col>
                        
                    </Row>
                </Container>
                {RedirectVar}
            </div>
        );
    }
}


const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        SetFile : (base64) => dispatch({type : ActionTypes.SET_FILE , file : base64}),
        SetFileID : (ID) => dispatch({type : ActionTypes.SET_FILEID , ID : ID})
    };  
};



export default connect(mapStateToProps , mapDispatchToProps)(withRouter(SubmitProposal_Docs));
import React , {Component} from "react";
import classes from "./SubmitProposal_GeneralInfo.module.css";
import Spinner from "../../../Components/Spinner/Spinner";
import { withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import *  as Actions from "../../../Store/Actions";
import * as ActionTypes from "../../../Store/Actions/ActionTypes";
import { Container , Row , Col , InputGroup ,  FormControl , Button } from "react-bootstrap";


class SubmitProposal_GeneralInfo extends Component{

    state = {
        PersianName : {
            value : "",
            validation : {
                isRequired : true
            },
            isValid : true,
            UserTouched : false
        },
        LatinName: {
            value : "",
            validation : {
                isRequired : true
            },
            isValid : true,
            UserTouched : false
        },
        KeywordInput: {
            value : "",
            validation : {
                isRequired : true
            },
            isValid : true,
            UserTouched : false
        },
        SubmitIsEnabled : false,
        Keywords : []
    }

    InputChangeHandler = (event ,id) => {
        let enabled = true;
        const newState = {};


        for (let [key , value] of Object.entries(this.state)) {
            if(key == "SubmitIsEnabled" || key == "Keywords"){
                continue;
            }
            if(key !== id){
                enabled &= value.isValid && value.UserTouched;
                continue;
            }
            const newValue = event.target.value;
            let isValid = true;
            //required
            if(value.validation.isRequired && newValue.length === 0 && key != "KeywordInput"){
                isValid = false;
            }
            if(value.validation.contains && newValue.indexOf(value.validation.contains) === -1){
                isValid = false;
            }
            enabled &= isValid;
            newState[key] = {
                validation : value.validation,
                value : newValue,
                isValid : isValid,
                UserTouched : true
            };
        }
        newState["SubmitIsEnabled"] = enabled;
        this.setState(newState);            
    }

    render () {

        const RedirectVar = !this.props.isAuthenticated ? (<Redirect to="/LogIn" />) : null;

        return (
            <div className={classes.SubmitProposal_GeneralInfo}>
                <Container style={{direction : "rtl"}}>
                    <Row>
                        
                        <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="txtPersianName">
                                        نام پروپوزال
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl 
                                    placeholder="نام پروپوزال را وارد کنید"
                                    aria-label="نام پروپوزال"
                                    aria-describedby="txtPersianName"
                                    value = {this.state.PersianName.value}
                                    onChange={(event) => this.InputChangeHandler(event,"PersianName")}
                                    className={this.state.PersianName.isValid ? null : classes.inValidInput}
                                />
                        </InputGroup>
                        
                    </Row>
                    <Row>
                        
                        <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="txtLatinName">
                                        نام لاتین پروپوزال
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl 
                                    placeholder="نام لاتین پروپوزال را وارد کنید"
                                    aria-label="نام لاتین پروپوزال"
                                    aria-describedby="txtLatinName"
                                    value = {this.state.LatinName.value}
                                    onChange={(event) => this.InputChangeHandler(event,"LatinName")}
                                    className={this.state.LatinName.isValid ? null : classes.inValidInput}
                                />
                        </InputGroup>
                        
                    </Row>
                    <Row style={{direction : "ltr"}}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <Button variant="outline-primary">افزودن واژه کلیدی</Button>
                            </InputGroup.Prepend>
                            <FormControl aria-describedby="basic-addon1"
                                placeholder="واژه کلیدی را وارد کنید"
                                 style={{direction : "rtl"}}
                                 value = {this.state.KeywordInput.value}
                                 onChange={(event) => this.InputChangeHandler(event,"KeywordInput")}
                            />
                        </InputGroup>
                    </Row>
                </Container>
                {RedirectVar}
            </div>
        );
    }
}


const mapStateToProps = state =>{
    return {
        AuthLoading: state.auth.loading,
        AuthError : state.auth.error,
        isAuthenticated: state.auth.token !== null,
        UserInfo : state.user.UserInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        LogOutHandler : () => dispatch(Actions.logout()),
        GetUserInfo : (Username) => dispatch(Actions.GetUserInfo(Username))
        //AddIngredientHandler: dispatch(Actions.authStart) ,
        //RemoveIngredientHandler: (IngType) => dispatch({type: actions.REMOVE_INGREDIENT , IngredientType: IngType}) 
    };
};



export default connect(mapStateToProps , mapDispatchToProps)(withRouter(SubmitProposal_GeneralInfo));
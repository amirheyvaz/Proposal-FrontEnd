import React , {Component} from "react";
import classes from "./SubmitProposal.module.css";
import Spinner from "../../Components/Spinner/Spinner";
import { withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import *  as Actions from "../../Store/Actions";
import * as ActionTypes from "../../Store/Actions/ActionTypes";
import {Steps} from 'antd';

import SubmitProposal_GeneralInfo from "./SubmitProposal_GeneralInfo/SubmitProposal_GeneralInfo";
import SubmitProposal_Docs from "./SubmitProposal_Docs/SubmitProposal_Docs";
import SubmitProposal_Finish from './SubmitProposal_Finish/SubmitProposal_Finish';

const { Step } = Steps;

class SubmitProposal extends Component{

    state = {
        current: 0
    }

    SubmitProposal_GeneralInfoHandler = () => {
        const Cur = this.state.current;
        this.setState({
            current : Cur + 1 
        });
    }
    SubmitProposal_BackHandler = () => {
        const Cur = this.state.current;
        this.setState({
            current : Cur - 1 
        });
    }



    render () {

        const RedirectVar = !this.props.isAuthenticated ? (<Redirect to="/LogIn" />) : null;

        return (
            <div className={classes.SubmitProposal}>
                <Steps current={this.state.current}>
                        <Step title="اطلاعات کلی پروپوزال" description="ورود اطلااعت کلی" />
                        <Step title="اسناد پروپوزال" description="بارگذاری اسناد مربتط" />
                        <Step title="پایان" description="اتمام فرآیند ثبت" />
                </Steps>
                {RedirectVar}
                {this.state.current == 0 ? <SubmitProposal_GeneralInfo NextClick={this.SubmitProposal_GeneralInfoHandler} /> : (
                    this.state.current == 1 ? <SubmitProposal_Docs BackClick={this.SubmitProposal_BackHandler} NextClick={this.SubmitProposal_GeneralInfoHandler} /> : (
                        this.state.current == 2 ? <SubmitProposal_Finish  /> : null
                    )
                )}
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



export default connect(mapStateToProps , mapDispatchToProps)(withRouter(SubmitProposal));
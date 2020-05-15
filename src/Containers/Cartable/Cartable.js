import React , {Component} from "react";
import classes from "./Cartable.module.css";
import Spinner from "../../Components/Spinner/Spinner";
import { withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import *  as Actions from "../../Store/Actions";
import * as ActionTypes from "../../Store/Actions/ActionTypes";
import StudentCartable from './StudentCartable/StudentCartable';

class Cartable extends Component{

    state = {
        loading : true,
        Username : null
    };

    componentDidMount = () => {
        if(!this.props.isAuthenticated){
            this.props.history.push("/LogIn");
        }
        else{
            const userID = localStorage.getItem("userId");
            this.props.GetUserInfo(userID);
            this.setState({
                Username : userID ,
                loading : false
            });
        }
    }

    render (){
        
        const Cartable = this.props.UserInfo ? (
            this.props.UserInfo.Role == "Student" ? (
                <StudentCartable />
            ) : null
        ) : null;

        const RedirectVar = !this.props.isAuthenticated ? (<Redirect to="LogIn" />) : null;

        return (
            <div className={classes.CartableContainer}>
                <Spinner show={this.state.loading} />
                {Cartable}
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


export default connect(mapStateToProps , mapDispatchToProps)(withRouter(Cartable));
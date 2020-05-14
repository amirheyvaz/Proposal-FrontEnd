import React , {Component} from "react";
import classes from "./LogIn.module.css";
import Spinner from "../../Components/Spinner/Spinner";
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import *  as Actions from "../../Store/Actions";

class LogIn extends Component{

    state = {
        loading : true
    };

    componentDidMount = () => {
        
    }

    render (){
        return (
            <div className={classes.LogInContainer}>
                <Spinner show={this.state.loading} />

            </div>            
        );
    }
}

const mapStateToProps = state =>{
    return {
        AuthLoading: state.auth.loading,
        AuthError : state.auth.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //AddIngredientHandler: dispatch(Actions.authStart) ,
        //RemoveIngredientHandler: (IngType) => dispatch({type: actions.REMOVE_INGREDIENT , IngredientType: IngType}) 
    };
};


export default connect(mapStateToProps , mapDispatchToProps)(withRouter(LogIn));
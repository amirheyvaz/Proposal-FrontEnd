import React , {Component} from "react";
import classes from "./Cartable.module.css";
import Spinner from "../../Components/Spinner/Spinner";
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import *  as Actions from "../../Store/Actions";

class Cartable extends Component{

    state = {
        loading : true
    };

    componentDidMount = () => {
        if(!this.props.isAuthenticated){
            this.props.history.push("/LogIn");
        }
        else{
            this.props.LogOutHandler();
        }
    }

    render (){
        return (
            <div className={classes.CartableContainer}>
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
        LogOutHandler : () => dispatch(Actions.logout())
        //AddIngredientHandler: dispatch(Actions.authStart) ,
        //RemoveIngredientHandler: (IngType) => dispatch({type: actions.REMOVE_INGREDIENT , IngredientType: IngType}) 
    };
};


export default connect(mapStateToProps , mapDispatchToProps)(withRouter(Cartable));
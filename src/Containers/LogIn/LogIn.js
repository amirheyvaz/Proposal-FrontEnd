import React , {Component} from "react";
import classes from "./LogIn.module.css";
import Spinner from "../../Components/Spinner/Spinner";
import { withRouter , Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import *  as Actions from "../../Store/Actions";
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import Alert from "../../Components/Alert/Alert";

class LogIn extends Component{


    state = {
        Username : {
            value : "",
            validation : {
                isRequired : true
            },
            isValid : true,
            UserTouched : false
        },
        Password: {
            value : "",
            validation : {
                isRequired : true
            },
            isValid : true,
            UserTouched : false
        },
        loading : true,
        SubmitIsEnabled : false
    };

    InputChangeHandler = (event ,id) => {
        let enabled = true;
        const newState = {};


        for (let [key , value] of Object.entries(this.state)) {
            if(key == "SubmitIsEnabled"){
                continue;
            }
            if(key == "loading"){
                continue;
            }
            if(key !== id){
                enabled &= value.isValid && value.UserTouched;
                continue;
            }
            const newValue = event.target.value;
            let isValid = true;
            //required
            if(value.validation.isRequired && newValue.length === 0){
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

    componentDidMount = () => {
        if(this.props.isAuthenticated){
            this.props.LogOutHandler();
            this.props.history.push("/");
            return;
        }
        this.props.CheckAuthStatus();
        if(!this.props.isAuthenticated){
            this.setState({loading : false});
        }
        else{
            this.props.history.push("/");
        }
    }


    SubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading : true});
        //
        const UserInfo = {
            Username : this.state.Username.value,
            Password : this.state.Password.value
        };
        // //
        this.props.LogInHandler(UserInfo);
        this.setState({loading : false});
    }

    render (){
        const AlertMessage = this.props.AuthError ? (<Alert Message={this.props.AuthError} Variant="danger" />) : null;
        const RedirectVar = this.props.isAuthenticated ? (<Redirect to="/" />) : null;
        
        return (
            <div className={classes.LogInContainer}>
                <Spinner show={this.props.AuthLoading} />
                <div className={classes.Jumbotron}>
                    <Container>
                        <Row>
                            <div className={classes.LogInLabel}>
                                  ورود به حساب کاربری 
                            </div>
                        </Row>
                        <Row>
                            <Col>
                            <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="txtUsername">
                                            نام کاربری
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl 
                                        placeholder="نام کاربری را وارد کنید"
                                        aria-label="نام کاربری"
                                        aria-describedby="txtUsername"
                                        value = {this.state.Username.value}
                                        onChange={(event) => this.InputChangeHandler(event,"Username")}
                                        className={this.state.Username.isValid ? null : classes.inValidInput}
                                    />
                            </InputGroup>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup >
                                    <InputGroup.Prepend className="mb-3">
                                            <InputGroup.Text id="txtPassword">
                                                رمز عبور
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl 
                                            type="password"
                                            placeholder="رمز عبور را وارد کنید"
                                            aria-label="رمز عبور"
                                            aria-describedby="txtPassword"
                                            value = {this.state.Password.value}
                                            onChange={(event) => this.InputChangeHandler(event,"Password")}
                                            className={this.state.Password.isValid ? null : classes.inValidInput}
                                        />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className={classes.ButtonCol}>
                                <Button variant="success" disabled={!this.state.SubmitIsEnabled} className={classes.Button} onClick={this.SubmitHandler}>
                                    ورود
                                </Button>
                            </Col>  
                        </Row>
                    </Container>
                </div>
                {AlertMessage}
                {RedirectVar}
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
        LogInHandler: (UserInfo) => dispatch(Actions.auth(UserInfo)) ,
        CheckAuthStatus : () => dispatch(Actions.authCheckState()),
        LogOutHandler : () => dispatch(Actions.logout())
    };
};


export default connect(mapStateToProps , mapDispatchToProps)(withRouter(LogIn));
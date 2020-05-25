import React , {Component} from "react";
import classes from "./SubmitProposal_GeneralInfo.module.css";
import Spinner from "../../../Components/Spinner/Spinner";
import { withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import *  as Actions from "../../../Store/Actions";
import * as ActionTypes from "../../../Store/Actions/ActionTypes";
import { Container , Row , Col , InputGroup ,ListGroup,  FormControl , Button } from "react-bootstrap";
import {Select } from "antd";
import Alert from '../../../Components/Alert/Alert';

const { Option } = Select; 

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
                isRequired : false
            },
            isValid : true,
            UserTouched : true
        },
        SubmitIsEnabled : false,
        ResearchType : "",
        Alerts : [],
        Keywords : []
    }

    ResearchTypeChangeJandler = (value) => {
        this.setState({
            ResearchType : value
        });
    }

    KeywordsAddHandler = () => {
        if(this.state.KeywordInput.value == ''){
            return;
        }
        let KeywordsVar = [...this.state.Keywords];
        KeywordsVar.push(this.state.KeywordInput.value);
        this.setState({
            Keywords : KeywordsVar
        });
        this.state.KeywordInput.value = '';
    }
 
    InputChangeHandler = (event ,id) => {
        let enabled = true;
        const newState = {};
        

        for (let [key , value] of Object.entries(this.state)) {
            if(key == "SubmitIsEnabled"|| key == "Alerts" || key == "ResearchType" || key == "Keywords"){
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

    componentDidMount(){
        if(this.props.ResearchTypes == null){
            this.props.GetAllResearchTypes();
        }
    }

    KeywordItemClickHandler = (event ,index) => {
        let KeywordsVar = [...this.state.Keywords];
        KeywordsVar.splice(index);
        this.setState({
            Keywords : KeywordsVar
        });
        
    }

    NextLevelClickHandler = () => {
        if(this.state.ResearchType == ''){
            const BeforeAlerts = [...this.state.Alerts];
            BeforeAlerts.push({
                Message : 'نوع تحقیق را انتخاب کنید',
                Variant : "warning"
            });
            this.setState({
                Alerts : BeforeAlerts
            });
            return;
        }
        if(this.state.Keywords.length == 0){
            const BeforeAlerts = [...this.state.Alerts];
            BeforeAlerts.push({
                Message : 'واژگان کلیدی را وارد کنید',
                Variant : "warning"
            });
            this.setState({
                Alerts : BeforeAlerts
            });
            return;
        }
        const info = {
            Keywords: this.state.Keywords,
            ResearchType : this.state.ResearchType,
            PersianName : this.state.PersianName.value,
            LatinName : this.state.LatinName.value
        };
        this.props.Set_ProposalGeneralInfo(info);
        this.props.NextClick();   
    }

    render () {

        const RedirectVar = !this.props.isAuthenticated ? (<Redirect to="/LogIn" />) : null;
        let RTarray = [];
        if(this.props.ResearchTypes != null){
            RTarray = this.props.ResearchTypes; 
        }
        const SelectOptionsVar = RTarray.map( m => {
            return (<Option style={{textAlign : "right"}} value={m.ID} key={m.ID}>
                {m.Title}       
            </Option>);
        } );

        let KeywordsVar = null;
        if(this.state.Keywords.length > 0){
            KeywordsVar = this.state.Keywords.map( (m , index) => {
                return (<ListGroup.Item style={{textAlign : "right"}}  key={index} onClick={
                    (event) => this.KeywordItemClickHandler(event ,index)
                }>
                    {m}       
                </ListGroup.Item>);
            } );
        }

        let AlertVar = null;
        if(this.state.Alerts.length !== 0){
            AlertVar = this.state.Alerts.map( (m,index) => {
                return (<Alert MarginLeft="50%" key={index} Variant={m.Variant ? m.Variant : "warning"} Message={m.Message} />);
            });
        }

        

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
                            <Button variant="outline-primary" onClick={this.KeywordsAddHandler}>افزودن واژه کلیدی</Button>
                            </InputGroup.Prepend>
                            <FormControl aria-describedby="basic-addon1"
                                placeholder="واژه کلیدی و لاتین آن را وارد کنید"
                                 style={{direction : "rtl"}}
                                 value = {this.state.KeywordInput.value}
                                 onChange={(event) => this.InputChangeHandler(event,"KeywordInput")}
                            />
                        </InputGroup>
                    </Row>
                    <Row>
                        <ListGroup horizontal style={{flexWrap : 'wrap' , direction : 'ltr'}}>
                            {KeywordsVar}
                        </ListGroup>
                    </Row>
                    <Row style={{marginTop : "10px"}}>
                        <Col md={5}>
                            <h6 style={{textAlign : 'right'}}>
                                نوع تحقیق پروپوزال را انتخاب کنید
                            </h6>
                        </Col>
                        <Col md={5} style={{textAlign : 'left'}} >
                            <Select className="ant-select-rtl" placeholder="نوع تحقیق" style={{ width: 200 }} onChange={(value) => this.ResearchTypeChangeJandler(value)}>
                                {SelectOptionsVar}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{textAlign : "center",width : "20%" , margin : "auto" , marginTop : '30px'}}>
                        <Button onClick={this.NextLevelClickHandler} variant="outline-success" disabled={!this.state.SubmitIsEnabled} className={classes.Button}>
                            مرحله بعد
                        </Button>
                    </Row>
                </Container>
                {RedirectVar}
                <div style={{marginRight : '10px'}}>
                    {AlertVar}
                </div>
            </div>
        );
    }
}


const mapStateToProps = state =>{
    return {
        AuthLoading: state.auth.loading,
        AuthError : state.auth.error,
        isAuthenticated: state.auth.token !== null,
        UserInfo : state.user.UserInfo,
        ResearchTypes : state.SubmitProposal.ResearchTypes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        LogOutHandler : () => dispatch(Actions.logout()),
        GetUserInfo : (Username) => dispatch(Actions.GetUserInfo(Username)),
        GetAllResearchTypes : () => dispatch(Actions.GetAllResearchTypes()),
        Set_ProposalGeneralInfo : (info) => dispatch({type : ActionTypes.SET_PROPOSAL_GENERALINFO , Proposal_GeneralInfo : info})
        //AddIngredientHandler: dispatch(Actions.authStart) ,
        //RemoveIngredientHandler: (IngType) => dispatch({type: actions.REMOVE_INGREDIENT , IngredientType: IngType}) 
    };
};



export default connect(mapStateToProps , mapDispatchToProps)(withRouter(SubmitProposal_GeneralInfo));
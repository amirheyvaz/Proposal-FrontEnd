import React , {Component} from "react";
import classes from "./SubmitProposal_Finish.module.css";
import { withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import *  as Actions from "../../../Store/Actions";
import * as ActionTypes from "../../../Store/Actions/ActionTypes";
import Spinner from '../../../Components/Spinner/Spinner';
import Alert from '../../../Components/Alert/Alert';
import { Descriptions, Badge , message} from 'antd';

class SubmitProposal_Finish extends Component{


    componentDidMount () {
        this.props.StartSendingInfo(this.props.Proposal_GeneralInfo , this.props.ProposalFileID);
    }

    render () {

        const RedirectVar = !this.props.isAuthenticated ? (<Redirect to="/LogIn" />) : null;
        const RedirectVar2 = !this.props.SendingPending ? (<Redirect to="/" />) : null;
        let AlertVar = null;
        if(this.props.SendingError != ''){
            AlertVar = (
                <Alert Variant="danger" Message="ثبت پروپوزال ناموفق بود" />
            );
        }
        else if(!this.props.SendingPending){
            AlertVar = (
                <Alert MarginLeft="50%" Variant="success" Message="ثبت پروپوزال با موفقیت به پایان رسید" />
            );
        }

        return (
            <div className={classes.SubmitProposal_Finish}>
               <Spinner show={this.props.SendingPending} />
               {AlertVar}
               {RedirectVar2}
               {RedirectVar}
            </div>
        );
    }
}


const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null,
        SendingError : state.SubmitProposal.SendingError,
        SendingPending : state.SubmitProposal.SendingPending,
        Proposal_GeneralInfo : state.SubmitProposal.Proposal_GeneralInfo,
        ProposalFileID : state.SubmitProposal.ProposalFileID,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        StartSendingInfo : (generalInfo , file) => dispatch(Actions.SendProposal(generalInfo , file , message))
    };
};



export default connect(mapStateToProps , mapDispatchToProps)(withRouter(SubmitProposal_Finish));
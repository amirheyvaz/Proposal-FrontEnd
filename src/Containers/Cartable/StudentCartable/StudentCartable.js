import React , {Component} from 'react';
import classes from './StudentCartable.module.css';
import PropTypes from 'prop-types';
import Spinner from "../../../Components/Spinner/Spinner";
import { withRouter , Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import *  as Actions from "../../../Store/Actions";
import { Col, Row , Container , Card , ListGroup, Button , Modal} from 'react-bootstrap';
import { Descriptions, Badge , message} from 'antd';

class StudentCartable extends Component {
    
    state = {
        HistoryModalShow : false,
        KeywordsModalShow : false,
        CommentModalShow : false,
        ConfirmModalShow : false,
        ConfirmModalOperation : ""
    };

    componentDidMount () {
        this.props.GetProposal();
    }

    addProposalClickHandler = () => {
        this.props.history.push("/SubmitProposal");
    }

    render () {
        const RedirectVar = !this.props.isAuthenticated ? (<Redirect to="LogIn" />) : null;

        const Deletable = this.props.Proposal ? this.props.Proposal.Deletable : false;
        const Sendable = this.props.Proposal ? this.props.Proposal.Sendable : false;

        const RootCartable = (
            <React.Fragment>
                <Descriptions className="ant-descriptions-rtl" style={{textAlign : "right"}} title="اطلاعات پروپوزال دانشجو" bordered>
                    <Descriptions.Item  label="نام">
                        {this.props.Proposal ? this.props.Proposal.Name : ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="نام لاتین">
                        {this.props.Proposal ? this.props.Proposal.LatinName : ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="تاریخ ایجاد">
                        {this.props.Proposal ? this.props.Proposal.CreateDate : ""}   
                    </Descriptions.Item>
                    <Descriptions.Item label="دانشجو ایجاد کننده">
                        {this.props.Proposal ? this.props.Proposal.StudentFullName : ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="نوع تحقیق">
                        {this.props.Proposal ? this.props.Proposal.ReseachTypeTitle : ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="وضعیت پروپوزال">
                        {this.props.Proposal ? this.props.Proposal.ProposalStatusTitle : ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="داور نخست">
                        {this.props.Proposal ? (this.props.Proposal.FirstJudgeFullName != ""  ? this.props.Proposal.FirstJudgeFullName : "هنوز داوری انتخاب نشده است") : ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="داور دوم">
                        {this.props.Proposal ? (this.props.Proposal.SecondJudgeFullName != ""  ? this.props.Proposal.SecondJudgeFullName : "هنوز داوری انتخاب نشده است") : ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="وضعیت کنونی">
                        {this.props.Proposal ? "در انتظار " + this.props.Proposal.ProposalStageTitle : ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="آخرین اقدام">
                        {this.props.Proposal ? this.props.Proposal.LatestOperation : ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="زمان جلسه دفاع">
                        {this.props.Proposal ? (this.props.Proposal.DefenceMeetingTime != "" ? this.props.Proposal.DefenceMeetingTime: "هنوز تاریخی انتخاب نشده است") : ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="کلمات کلیدی">
                        <Button variant="outline-secondary" onClick={() => {this.setState({KeywordsModalShow : true});}}>
                            نمایش
                        </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="نظرات">
                        <Button variant="outline-secondary" onClick={() => {this.setState({CommentModalShow : true});}}>
                            نمایش
                        </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="تاریخچه">
                        <Button variant="outline-secondary" onClick={() => {this.setState({HistoryModalShow : true});}}>
                            نمایش
                        </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="حذف پروپوزال">
                        <Button variant="danger" disabled={!Deletable} onClick={() => {
                             this.setState({ConfirmModalShow : true ,      
                                ConfirmModalOperation : 'حذف'
                            });
                        }}>
                            حذف
                        </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="ارسال پروپوزال" style={{textAlign : 'center'}}>
                        <Button variant="success" disabled={!Sendable} onClick={() => {
                             this.setState({ConfirmModalShow : true ,
                                ConfirmModalOperation : 'ارسال'
                            });
                        }}>
                            ارسال
                        </Button>
                    </Descriptions.Item>
                </Descriptions>
                <Modal  show={this.state.HistoryModalShow} onHide={() => {this.setState({HistoryModalShow : false});}}>
                    <Modal.Header closeButton>
                        <Modal.Title>تاریخچه جریان کاری پروپوزال</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            {this.props.Proposal ? this.props.Proposal.WorkflowHistories.map((p , index) => {
                                return (
                                    <ListGroup.Item key={index} style={{textAlign : "right"}}>
                                        <Descriptions  column={2} className="ant-descriptions-rtl" style={{textAlign : "right"}}  bordered>
                                            <Descriptions.Item label="اقدام کننده">
                                                {p.OccuredByPersonName}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="اقدام">
                                                {p.OperationTitle}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="تاریخ اقدام">
                                                {p.OccuranceDate}
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </ListGroup.Item>
                                );
                            }) : null}
                        </ListGroup>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.KeywordsModalShow} onHide={() => {this.setState({KeywordsModalShow : false});}}>
                    <Modal.Header closeButton>
                        <Modal.Title>کلمات کلیدی پروپوزال</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup  horizontal style={{flexWrap : 'wrap' , direction : 'ltr'}}>
                            {this.props.Proposal ? this.props.Proposal.Keywords.map((p , index) => {
                                return (
                                    <ListGroup.Item key={index} style={{textAlign : "right"}}>
                                        {p}
                                    </ListGroup.Item>
                                );
                            }) : null}
                        </ListGroup>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.CommentModalShow} onHide={() => {this.setState({CommentModalShow : false});}}>
                    <Modal.Header closeButton>
                        <Modal.Title>نظرات بر روی پروپوزال</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            {this.props.Proposal ? this.props.Proposal.Comments.map((p , index) => {
                                return (
                                    <ListGroup.Item key={index} style={{textAlign : "right"}}>
                                        <Descriptions  column={2} className="ant-descriptions-rtl" style={{textAlign : "right"}}  bordered>
                                            <Descriptions.Item label="ثبت کننده">
                                                {p.OccuredByPersonTitle}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="ثبت در مرحله">
                                                {p.StageTitle}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="تاریخ ثبت">
                                                {p.OccuranceDate}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="درجه اهمیت">
                                                {p.ImportanceLevel}
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </ListGroup.Item>
                                );
                            }) : null}
                        </ListGroup>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.ConfirmModalShow} onHide={() => {this.setState({ConfirmModalShow : false});}}>
                    <Modal.Header closeButton>
                    <Modal.Title>تایید عملیات</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{direction : 'rtl', textAlign : 'right'}}>
                        {"آیا از انجام عملیات " + this.state.ConfirmModalOperation + "  پروپوزال اطمینان دارید؟"}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {this.setState({ConfirmModalShow : false});}}>
                            انصراف
                        </Button>
                        <Button variant="success" onClick={() => {
                            this.setState({ConfirmModalShow : false});
                            if(this.state.ConfirmModalOperation === 'حذف'){
                                this.props.DeleteProposal(this.props.Proposal.ID);
                            }
                            else{
                                this.props.SendProposal(this.props.Proposal.ID);
                            }
                            }}>
                            تایید
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );

        const MainCartable = this.props.UserInfo.HasProposal ? RootCartable : (
            <div style={{
                textAlign : "center",
                padding : "5px"
            }}>
                <h3 style={{
                    marginBottom : "5%",
                    padding : "5px"
                }}>
                    شما تا کنون پروپوزالی ثبت نکرده اید
                </h3>
                <div>
                    <Button variant="primary" onClick={this.addProposalClickHandler}>
                        ثبت پروپوزال کارشناسی ارشد
                    </Button>
                </div>
            </div>
        );

        return (
            <Container className={classes.StudentCartable}>
                <Row>
                    <Col md={8}>
                        <div className={classes.Main}>
                            {MainCartable}
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className={classes.UserInfo}>
                            <Card>
                                <Card.Header as="h5" className={classes.UserInfoCardHeader}>اطلاعات دانشجو</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className={classes.UserInfoListGroupItem}>
                                        نام دانشجو&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp; {this.props.UserInfo.FirstName + ' ' + this.props.UserInfo.LastName}
                                    </ListGroup.Item>
                                    <ListGroup.Item  className={classes.UserInfoListGroupItem}>
                                        شماره دانشجویی&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;{this.props.UserInfo.StudentNumber}
                                    </ListGroup.Item>
                                    <ListGroup.Item className={classes.UserInfoListGroupItem}>
                                        کد ملی &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp; {this.props.UserInfo.SocialSecurityNumber}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </div>
                    </Col>
                    
                </Row>
                {RedirectVar}
            </Container>
        );
    }

}

StudentCartable.propTypes = {

};


const mapStateToProps = state =>{
    return {
        UserInfo : state.user.UserInfo,
        isAuthenticated: state.auth.token !== null,
        Proposal : state.Proposal.Proposal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        LogOutHandler : () => dispatch(Actions.logout()),
        GetUserInfo : (Username) => dispatch(Actions.GetUserInfo(Username)),
        GetProposal : () => dispatch(Actions.GetProposal()),
        DeleteProposal : (ID) => dispatch(Actions.DeleteProposal(ID , message)),
        SendProposal : (ID) => dispatch(Actions.SendProposalForAction(ID , message))
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(withRouter(StudentCartable));
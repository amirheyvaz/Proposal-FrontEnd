import React , {Component} from "react";
import classes from "./ProfessorCartable.module.css";
import Spinner from "../../../Components/Spinner/Spinner";
import { withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import *  as Actions from "../../../Store/Actions";
import * as ActionTypes from "../../../Store/Actions/ActionTypes";
import { Col, Row , Container , Card , ListGroup, Button , Modal, NavItem} from 'react-bootstrap';
import { Descriptions, Badge , message , Select , Input , Radio , Checkbox , TimePicker   } from 'antd';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import Alert from '../../../Components/Alert/Alert';
import { Calendar, DatePicker } from 'react-persian-datepicker';

const { Option } = Select; 
const {TextArea } = Input;

class ProfessorCartable extends Component{


    state = {
        HistoryModalShow : false,
        KeywordsModalShow : false,
        CommentModalShow : false,
        ConfirmModalShow : false,
        ConfirmModalOperation : "",
        ProposalKeywords : [],
        ProposalWorkflowHistories : [],
        ProposalComments : [],
        JudgeAssignmentModalShow : false,
        ProposalID : null,
        FirstJudgeID : null,
        SecondJudgeID : null,
        AlertMessage : '',
        ProposalStageOrder : null,
        ProposalComment : '',
        ProposalBigChanges : false,
        ProposalCommentImportanceLevel : 0,
        DefenceModalShow : false,
        DefenceMeetingTime : "",
        DefenceMeetingHour : "",
        DefenceAlert : ''
    };


    componentDidMount () {
        this.props.GetWaitingProposals();
        this.props.GetAllProfessors();
    }

    JudgeAssignmentComboChangeJandler = (value , which) => {
        switch (which) {
            case 1 : {
                this.setState({
                    FirstJudgeID : value
                });
                break;
            }
            case 2 : {
                this.setState({
                    SecondJudgeID : value
                });
                break;
            }
        }
       
    }

    render (){

        const RedirectVar = !this.props.isAuthenticated ? (<Redirect to="LogIn" />) : null;
        
        let ProfessorDegreeVar = "";
        let ColumnsVar = null;
        switch(this.props.UserInfo.ProfessorDegree){
            case 0 :
            {
                ProfessorDegreeVar = "استادیار";
                break;
            }
            case 1 :
            {
                ProfessorDegreeVar = "داور";
                
                break;
            }
            case 2 :
            {
                ProfessorDegreeVar = "استاد راهنما";
               
                break;
            }
            case 3 :
            {
                ProfessorDegreeVar = "مدیر گروه";
                
                break;
            }
            case 4 :
            {
                ProfessorDegreeVar = "عضو شورا دانشکده";
                break;
            }
            case 5 :
            {
                ProfessorDegreeVar = "رئیس دانشکده";
                
                break;
            } 
            case 6 :
            {
                ProfessorDegreeVar = "رئیس دانشگاه";
                break;
            }
        }

        let  SpinnerVar = null;
        if(this.props.Proposals == null){
            SpinnerVar = (<Spinner show={true} />);
        }

        if(this.props.ErrorMassage){
            message.config({
                top: 70,
                duration: 3,
                maxCount: 3,
                rtl: true,
            });
            message.success( {
                content: this.props.ErrorMassage,
                style: {
                  marginTop: '50px !important',
                },
            });
        }

        const AlertVar = this.state.AlertMessage == '' ? null : 
            (
                <div style={{
                    width : '100%',
                    textAlign : 'right',
                    color : 'red',
                    marginBottom : "10px"
                }}>
                    {this.state.AlertMessage}
                </div>
            );


        return (
            <Container className={classes.StudentCartable}>
                <Row>
                    <Col md={8}>
                        <div className={classes.Main + " " + "k-rtl"} dir="rtl">
                            <Grid
                                style={{ 
                                    minHeight : "417px"
                                 }}
                                dir="rtl"
                                data={[ ...this.props.Proposals ]}
                                sortable={true}
                                pageable={true}
                                pageSize={10}
                            >
                                <GridColumn field="RowNumber" width="80px" title="ردیف"  />
                                <GridColumn field="Name" width="200px" title="نام"  />
                                <GridColumn field="CreateDate" width="200px" title="تاریخ ایجاد" />
                                <GridColumn field="StudentFullName" width="200px" title="نام دانشجو" />
                                <GridColumn field="ProposalStageTitle" width="200px" title="وضعیت فعلی" />
                                <GridColumn field="ReseachTypeTitle" width="200px" title="نوع تحقیق" />
                                <GridColumn field="FirstJudgeFullName"  width="200px" title="داور اول" />
                                <GridColumn field="SecondJudgeFullName" width="200px" title="داور دوم" />
                                <GridColumn field="LatestOperation" width="200px" title="آخرین اقدام" />
                                <GridColumn field="ProposalStatusTitle" width="200px" title="وضعیت آموزشی" />
                                <GridColumn field="DefenceMeetingTime" width="200px" title="زمان جلسه دفاع" />
                                <GridColumn
                                    field="Keywords"
                                    width="100px"
                                    title="کلمات کلیدی"
                                    cell={props => (
                                        <td>
                                            <Button variant="outline-secondary" onClick={() => {this.setState({KeywordsModalShow : true , ProposalKeywords : props.dataItem[props.field]});}}>
                                                نمایش
                                            </Button>
                                        </td>
                                    )}
                                />
                                <GridColumn
                                    field="WorkflowHistories"
                                    title="تاریخچه"
                                    width="100px"
                                    cell={props => (
                                        <td>
                                            <Button variant="outline-secondary" onClick={() => {this.setState({HistoryModalShow : true , ProposalWorkflowHistories : props.dataItem[props.field]});}}>
                                                نمایش
                                            </Button>
                                        </td>
                                    )}
                                />
                                <GridColumn
                                    field="Comments"
                                    title="نظرات"
                                    width="100px"
                                    cell={props => (
                                        <td>
                                            <Button variant="outline-secondary" onClick={() => {this.setState({CommentModalShow : true , ProposalComments : props.dataItem[props.field]});}}>
                                                نمایش
                                            </Button>
                                        </td>
                                    )}
                                />
                                 <GridColumn
                                    field="WaitingForJudgeAssignment"
                                    width="150px"
                                    title="عملیات تعیین داوران"
                                    
                                    cell={props => {
                                        if(props.dataItem[props.field]){
                                            return (
                                                <td style={{textAlign : 'center'}}>
                                                    <Button variant="outline-primary" onClick={() => {this.setState({JudgeAssignmentModalShow : true  , ProposalID : props.dataItem.ID});}}>
                                                        تعیین
                                                    </Button>
                                                    
                                                </td>
                                            );
                                        }
                                        else{
                                            return (<td></td>);
                                        }
                                    } }
                                />
                                <GridColumn
                                    field="WaitingForJudgeApprovement"
                                    width="250px"
                                    title="اقدام داوری"
                                    cell={props => {
                                        if(props.dataItem[props.field]){
                                            return (
                                                <td>
                                                    <Button style={{marginLeft : '10px'}} variant="outline-success" onClick={() => {this.setState({ConfirmModalShow : true , ConfirmModalOperation : "تایید" , ProposalID : props.dataItem.ID , ProposalStageOrder : props.dataItem.ProposalStageOrder});}}>
                                                        تایید
                                                    </Button>
                                                    <Button variant="outline-danger" onClick={() => {this.setState({ConfirmModalShow : true , ConfirmModalOperation : "رد" , ProposalID : props.dataItem.ID , ProposalStageOrder : props.dataItem.ProposalStageOrder});}}>
                                                        رد
                                                    </Button>
                                                </td>
                                            );
                                        }
                                        else{
                                            return (<td></td>);
                                        }
                                    } }
                                />
                                <GridColumn
                                    field="WaitingForDefenceMeetingTiming"
                                    width="250px"
                                    title="اقدام تعیین جلسه دفاع"
                                    cell={props => {
                                        if(props.dataItem[props.field]){
                                            return (
                                                <td style={{width : '100%' , textAlign:'center'}}>
                                                    <Button  variant="outline-primary" onClick={() => {this.setState({DefenceModalShow : true , ProposalID : props.dataItem.ID});}}>
                                                        تعیین
                                                    </Button>
                                                    
                                                </td>
                                            );
                                        }
                                        else{
                                            return (<td></td>);
                                        }
                                    } }
                                />
                                <GridColumn
                                    field="WaitingForGuidingProfessorApprovement"
                                    width="250px"
                                    title="اقدام استاد راهنما"
                                    cell={props => {
                                        if(props.dataItem[props.field]){
                                            return (
                                                <td>
                                                    <Button style={{marginLeft : '10px'}} variant="outline-success" onClick={() => {this.setState({ConfirmModalShow : true , ConfirmModalOperation : "تایید" , ProposalID : props.dataItem.ID, ProposalStageOrder : props.dataItem.ProposalStageOrder});}}>
                                                        تایید
                                                    </Button>
                                                    <Button variant="outline-danger" onClick={() => {this.setState({ConfirmModalShow : true , ConfirmModalOperation : "رد" , ProposalID : props.dataItem.ID, ProposalStageOrder : props.dataItem.ProposalStageOrder});}}>
                                                        رد
                                                    </Button>
                                                </td>
                                            );
                                        }
                                        else{
                                            return (<td></td>);
                                        }
                                    } }
                                />
                                <GridColumn
                                    field="WaitingForCouncilApprovement"
                                    width="250px"
                                    title="اقدام اعضا شورا"
                                    cell={props => {
                                        if(props.dataItem[props.field]){
                                            return (
                                                <td>
                                                    <Button style={{marginLeft : '10px'}} variant="outline-success" onClick={() => {this.setState({ConfirmModalShow : true , ConfirmModalOperation : "تایید" , ProposalID : props.dataItem.ID, ProposalStageOrder : props.dataItem.ProposalStageOrder});}}>
                                                        تایید
                                                    </Button>
                                                    <Button variant="outline-danger" onClick={() => {this.setState({ConfirmModalShow : true , ConfirmModalOperation : "رد" , ProposalID : props.dataItem.ID, ProposalStageOrder : props.dataItem.ProposalStageOrder});}}>
                                                        رد
                                                    </Button>
                                                </td>
                                            );
                                        }
                                        else{
                                            return (<td></td>);
                                        }
                                    } }
                                />
                                {ColumnsVar}
                            </Grid>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className={classes.UserInfo}>
                            <Card>
                                <Card.Header as="h5" className={classes.UserInfoCardHeader}>اطلاعات استاد</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className={classes.UserInfoListGroupItem}>
                                        نام استاد&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp; {this.props.UserInfo.FirstName + ' ' + this.props.UserInfo.LastName}
                                    </ListGroup.Item>
                                    <ListGroup.Item  className={classes.UserInfoListGroupItem}>
                                        رتبه دانشگاهی&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;{this.props.UserInfo.UniversityRankTitle}
                                    </ListGroup.Item>
                                    <ListGroup.Item className={classes.UserInfoListGroupItem}>
                                        کد ملی &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp; {this.props.UserInfo.SocialSecurityNumber}
                                    </ListGroup.Item>
                                    <ListGroup.Item className={classes.UserInfoListGroupItem} style={{direction : "rtl"}}>
                                        آخرین مدرک تحصیلی &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp; {this.props.UserInfo.LatestDegree}
                                    </ListGroup.Item>
                                    <ListGroup.Item className={classes.UserInfoListGroupItem}>
                                        تخصص اصلی &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp; {this.props.UserInfo.MainSpecialty}
                                    </ListGroup.Item>
                                    <ListGroup.Item className={classes.UserInfoListGroupItem}>
                                        {"عضو گروه آموزشی " + this.props.UserInfo.EducationalGroupTitle +  " در دانشکده " + this.props.UserInfo.FacultyName}
                                    </ListGroup.Item>
                                    <ListGroup.Item className={classes.UserInfoListGroupItem}>
                                        رتبه سیستمی &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;  {ProfessorDegreeVar}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </div>
                    </Col>
                    
                </Row>
                {RedirectVar}
                {SpinnerVar}
                <Modal  show={this.state.HistoryModalShow} onHide={() => {this.setState({HistoryModalShow : false});}}>
                    <Modal.Header closeButton>
                        <Modal.Title>تاریخچه جریان کاری پروپوزال</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            {this.state.ProposalWorkflowHistories.length > 0 ? this.state.ProposalWorkflowHistories.map((p , index) => {
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
                            {this.state.ProposalKeywords.length > 0 ? this.state.ProposalKeywords.map((p , index) => {
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
                            {this.state.ProposalComments.length > 0 ? this.state.ProposalComments.map((p , index) => {
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
                                                {p.ImportanceLevel ? "بالا" : "پایین"}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="شرح نظر">
                                                {p.Content}
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
                        <Row>
                            <div style={{
                                textAlign : 'right',
                                marginBottom : '10px',
                                width : '80%',
                                marginLeft : 'auto' , 
                                marginRight : 'auto'
                            }}>
                                {"لطفا نظرات خود را در رابطه با این عملیات اعلام بفرمایید"}
                            </div>
                        </Row>
                        <Row style={{marginBottom : '10px' , width :"80%" , marginLeft : 'auto' , marginRight : 'auto'}}>
                            <TextArea rows={5} onChange={(event) => {
                                this.setState({ProposalComment : event.target.value});
                            }} />
                        </Row>
                        <Row>
                            <Col md={4}>
                                سطح اهمیت
                            </Col>
                            <Col md={6}>
                                    <Radio.Group onChange={(event) => {
                                        const value = event.target.value;
                                        this.setState({ProposalCommentImportanceLevel : value});
                                    }} value={this.state.ProposalCommentImportanceLevel}>
                                        <Radio value={1}>کم</Radio>
                                        <Radio value={2}>متوسط</Radio>
                                        <Radio value={3}>زیاد</Radio>
                                    </Radio.Group>
                            </Col>
                        </Row>
                        {(this.state.ProposalStageOrder == 6 && this.state.ConfirmModalOperation === 'رد') ? (
                            <Row>
                                <Col md={4}>
                                <div style={{
                                    textAlign : 'right',
                                    marginBottom : '10px',
                                    width : '100%'
                                }}>
                                    {"نوع تغییرات مد نظر را وارد کنید"}                
                                </div>
                                </Col>
                                <Col md={4}>
                                    <Radio.Group onChange={(event) => {
                                        const value = event.target.value;
                                        const BC = value == "1" ? true : false;
                                        this.setState({ProposalBigChanges : BC});
                                    }} value={this.state.BigChanges ? "1" : "2"}>
                                        <Radio value={1}>کلی</Radio>
                                        <Radio value={2}>جزئی</Radio>
                                    </Radio.Group>
                                </Col>
                            </Row>
                        ) : ""}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {this.setState({ConfirmModalShow : false});}}>
                            انصراف
                        </Button>
                        <Button variant="success" onClick={() => {
                            this.setState({ConfirmModalShow : false});
                            if(this.state.ConfirmModalOperation === 'تایید'){
                                this.props.ApproveProposal(this.state.ProposalID , this.props.UserInfo.ID , {
                                    Content : this.state.ProposalComment,
                                    ImportanceLevel :  this.state.ProposalCommentImportanceLevel
                                });
                            }
                            else{
                                let BG = null;
                                if(this.state.ProposalStageOrder == 6){
                                    BG = this.state.ProposalBigChanges;
                                }
                                this.props.RejectProposal(this.state.ProposalID , this.props.UserInfo.ID , {
                                    Content : this.state.ProposalComment,
                                    ImportanceLevel :  this.state.ProposalCommentImportanceLevel
                                } , BG );
                            }
                            }}>
                            تایید
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.JudgeAssignmentModalShow} onHide={() => {this.setState({JudgeAssignmentModalShow : false});}}>
                    <Modal.Header closeButton>
                    <Modal.Title>تعیین داوران</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{direction : 'rtl', textAlign : 'right'}}>
                        {AlertVar}
                        <Row>
                            <Col md={3}>
                                داور اول
                            </Col>
                            <Col md={6}>
                                <Select showSearch className="ant-select-rtl" placeholder="استاد را انتخاب کنید" style={{ width: 300 }} onChange={(value) => this.JudgeAssignmentComboChangeJandler(value , 1)}>
                                    {this.props.AllProfessors.map((p , index) => {
                                        return (
                                            <Option value={p.ID} key={index} style={{textAlign : "right"}}>
                                                {p.Title}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{marginTop : "10px"}}>
                            <Col md={3}>
                                داور دوم
                            </Col>
                            <Col md={6}>
                                <Select showSearch  className="ant-select-rtl" placeholder="استاد را انتخاب کنید" style={{ width: 300 }} onChange={(value) => this.JudgeAssignmentComboChangeJandler(value , 2)}>
                                    {this.props.AllProfessors.map((p , index) => {
                                        return (
                                            <Option value={p.ID} key={index} style={{textAlign : "right"}}>
                                                {p.Title}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {this.setState({JudgeAssignmentModalShow : false});}}>
                            انصراف
                        </Button>
                        <Button variant="success" onClick={() => {
                            if(this.state.FirstJudgeID != null && this.state.SecondJudgeID != null){
                                
                                this.props.AssignJudges(this.state.ProposalID , this.state.FirstJudgeID , this.state.SecondJudgeID);
                                
                                this.setState({JudgeAssignmentModalShow : false,
                                    FirstJudgeID : null,
                                    SecondJudgeID : null
                                });
                            }
                            else{
                                // message.config({
                                //     top: 70,
                                //     duration: 3,
                                //     maxCount: 3,
                                //     rtl: true
                                    
                                // });
                                // message.warning(
                                // {
                                //     content: 'هر دو استاد داور را انتخاب کنید',
                                //     style: {
                                //       marginTop: '50px !important',
                                //     },
                                // }
                                // );

                                this.setState({AlertMessage : 'هر دو استاد داور را انتخاب کنید'});
                                setTimeout(() => {
                                    this.setState({AlertMessage : ''});
                                } , 5500);
                            }

                            
                            }}>
                            تایید
                        </Button>
                        
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.DefenceModalShow} onHide={() => {this.setState({DefenceModalShow : false});}}>
                    <Modal.Header closeButton>
                        <Modal.Title>تعیین زمان جلسه دفاع</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.DefenceAlert != '' ? (
                            <Row style={{marginBottom : '10px' , textAlign : 'center' , color : 'red'}}>
                                {this.state.DefenceAlert}
                            </Row>
                        ) : ""}
                        <Row style={{marginBottom : '10px'}}>
                            <Col md={3}>
                                انتخاب تاریخ
                            </Col>
                            <Col md={6}>
                                <DatePicker  value={this.state.DefenceMeetingTime}
                                    onChange={value => this.setState({ DefenceMeetingTime : value })}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                انتخاب ساعت
                            </Col>
                            <Col md={6}>
                                <TimePicker
                                    onChange={(time , timeString) => {
                                        this.setState({
                                            DefenceMeetingHour : timeString
                                        });
                                    }}
                                    format='HH:mm'
                                />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {this.setState({DefenceModalShow : false});}}>
                            انصراف
                        </Button>
                        <Button variant="success" onClick={() => {
                            if(this.state.FirstJudgeID != null && this.state.SecondJudgeID != null){
                                
                                
                                
                                this.setState({DefenceModalShow : false,
                                    DefenceMeetingTime : null,
                                    DefenceMeetingHour : null
                                });
                            }
                            else{
                                // message.config({
                                //     top: 70,
                                //     duration: 3,
                                //     maxCount: 3,
                                //     rtl: true
                                    
                                // });
                                // message.warning(
                                // {
                                //     content: 'هر دو استاد داور را انتخاب کنید',
                                //     style: {
                                //       marginTop: '50px !important',
                                //     },
                                // }
                                // );

                                this.setState({DefenceAlert : 'لطفا تمامی مقادیر را پر کنید'});
                                setTimeout(() => {
                                    this.setState({DefenceAlert : ''});
                                } , 5500);
                            }

                            
                            }}>
                            تایید
                        </Button>
                        
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null,
        UserInfo : state.user.UserInfo,
        Proposals : state.Proposal.Proposals,
        ErrorMassage : state.Proposal.ProfessorCartableErrorMassage,
        AllProfessors : state.user.Professors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        LogOutHandler : () => dispatch(Actions.logout()),
        GetUserInfo : (Username) => dispatch(Actions.GetUserInfo(Username)),
        GetWaitingProposals : () => dispatch(Actions.GetProfessorWaitingForActionProposals()),
        GetAllProfessors : () => dispatch(Actions.GetAllProfessors()),
        AssignJudges : (ProposalID , FirstPID , SecondPID) => dispatch(Actions.AssignJudges(ProposalID , FirstPID , SecondPID , message)),
        ApproveProposal : (ProposalID, ProfesorID ,comment) => dispatch(Actions.ApproveProposal(ProposalID, ProfesorID ,comment, message)),
        RejectProposal : (ProposalID, ProfesorID ,comment, BigChanges) => dispatch(Actions.RejectProposal(ProposalID, ProfesorID ,comment, BigChanges , message))
        //AddIngredientHandler: dispatch(Actions.authStart) ,
        //RemoveIngredientHandler: (IngType) => dispatch({type: actions.REMOVE_INGREDIENT , IngredientType: IngType}) 
    };
};


export default connect(mapStateToProps , mapDispatchToProps)(withRouter(ProfessorCartable));
import React , {Component} from "react";
import classes from "./ProfessorCartable.module.css";
import Spinner from "../../../Components/Spinner/Spinner";
import { withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import *  as Actions from "../../../Store/Actions";
import * as ActionTypes from "../../../Store/Actions/ActionTypes";
import { Col, Row , Container , Card , ListGroup, Button , Modal} from 'react-bootstrap';
import { Descriptions, Badge , message} from 'antd';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';


class ProfessorCartable extends Component{

    state = {
        loading : true
    };


    render (){

        const RedirectVar = !this.props.isAuthenticated ? (<Redirect to="LogIn" />) : null;
        
        let ProfessorDegreeVar = "";
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
                                 <GridColumn field="Name" title="نام"  />
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
            </Container>
        );
    }
}

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null,
        UserInfo : state.user.UserInfo,
        Proposals : state.Proposal.Proposals
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


export default connect(mapStateToProps , mapDispatchToProps)(withRouter(ProfessorCartable));
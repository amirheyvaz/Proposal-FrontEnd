import React , {Component} from 'react';
import classes from './StudentCartable.module.css';
import PropTypes from 'prop-types';
import Spinner from "../../../Components/Spinner/Spinner";
import { withRouter , Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import *  as Actions from "../../../Store/Actions";
import { Col, Row , Container , Card , ListGroup, Button} from 'react-bootstrap';

class StudentCartable extends Component {
    
    addProposalClickHandler = () => {
        this.props.history.push("/SubmitProposal");
    }

    render () {
        const RedirectVar = !this.props.isAuthenticated ? (<Redirect to="LogIn" />) : null;
        const MainCartable = this.props.UserInfo.HasProposal ? null : (
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
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        LogOutHandler : () => dispatch(Actions.logout()),
        GetUserInfo : (Username) => dispatch(Actions.GetUserInfo(Username))
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(withRouter(StudentCartable));
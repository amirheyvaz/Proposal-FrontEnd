import React from 'react';
import classes from './App.module.css';
import {Switch , NavLink, Route } from 'react-router-dom';
import {  Navbar , Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProposalLogo from './Assets/Images/SBULogo.png';
import Cartable from "./Containers/Cartable/Cartable";
import LogIn from "./Containers/LogIn/LogIn";
import SubmitProposal from "./Containers/SubmitProposal/SubmitProposal";
import '@progress/kendo-theme-default/dist/all.css';

function App() {
  return (
    <div>
        <Navbar bg='light' expand='lg' fixed='top' className={classes.App}>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={ProposalLogo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        سامانه پروپوزال
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        
                        <NavLink  to="/" exact activeClassName="nav-link active" className="nav-link">
                          خانه
                        </NavLink>

                        <NavLink  to="/LogOut" exact activeClassName="nav-link active" className="nav-link">
                          خروج
                        </NavLink>
                        
                        
                        </Nav>
                    </Navbar.Collapse>
        </Navbar>
       
      <Switch>
        <Route path="/LogIn" exact component={LogIn} />
        <Route path="/LogOut" exact component={LogIn} />
        <Route path="/SubmitProposal" exact component={SubmitProposal} />
        <Route path="/" exact component={Cartable} />
      </Switch>  
    </div>
  );
}

export default App;

import classes from "./Alert.module.css";
import {  Alert as BootAlert } from 'react-bootstrap';
import PropTypes from "prop-types";
import React , {useState} from "react";

const Alert = (props) => {
    let [show, setShow] = useState(true);
    setTimeout(() => {
        setShow(false);
    }, props.CloseTimeout ? props.CloseTimeout : 5000);
    return(
        <BootAlert className={classes.Alert} variant={props.Variant} show={show} onClose={() => setShow(false)} dismissible >
                    {props.Message}
        </BootAlert>
    );
};

Alert.propTypes = {
    Message : PropTypes.string,
    Variant : PropTypes.string,
    CloseTimeout : PropTypes.number
};

export default Alert;
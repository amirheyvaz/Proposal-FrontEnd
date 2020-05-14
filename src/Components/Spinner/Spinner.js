import classes from "./Spinner.module.css";
import React from 'react';
import {Spinner as BootSpinner} from 'react-bootstrap';

const Spinner = (props) => {
    const value = props.show ? 
        (<div className={classes.Spinner}>
            <BootSpinner animation="grow" variant="dark">
            </BootSpinner>
        </div>)  : null;

    return value;
};


export default Spinner;
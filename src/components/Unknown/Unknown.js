import React from 'react';
import { connect } from "react-redux";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { reSetActiveStep } from "../../store/actions/signup";

import './Unknown.css';

const Unknown = (props) => {
    const { onReSetActiveStep } = props;

    const handleReset = () => {
        onReSetActiveStep();
    };

    return (
        <div className="UnknownContainer">
            <div className="UnknownContent">
                <Typography className="UnknownTitle">{'NOT FOUND PAGE'}</Typography>
            </div>
            <div className="UnknownFooter">
                <div className="UnknownAction">
                    <Button
                        className="UnknownResetButton"
                        onClick={handleReset}
                    >
                        {'Reset'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ActiveStep: state.signup.activeStep
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReSetActiveStep: () => dispatch(reSetActiveStep())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Unknown);
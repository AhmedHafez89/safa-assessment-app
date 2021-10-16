import React from 'react';
import { connect } from "react-redux";

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import MailBox from "../../assets/mailbox.svg";

import { reSetActiveStep } from "../../store/actions/signup";

import './Successfully.css';

const Successfully = (props) => {
    const { onReSetActiveStep } = props;

    const handleReset = () => {
         onReSetActiveStep();
    };

    return (
        <div className="SuccessfullyContainer">
            <div className="SuccessfullyContent">
                <div className="SuccessfullyMailBox">
                    <img className="SuccessfullyMailBoxImg" src={MailBox} alt="MailBox" />
                </div>
                <div className="SuccessfullyMessage">
                    <Typography className="SuccessfullyMessageTitle">{`Congratz, you successfully created your account.`}</Typography>
                    <Typography className="SuccessfullyMessageSubTitle">{'We just sent you a confirmation email'}</Typography>
                    <Typography className="SuccessfullyMessageSubTitle">{'Please check your E-mail'}</Typography>
                </div>
                <div className="SuccessfullySendEmail">
                    <Typography className="SuccessfullySendEmailTitle">{`Didn't receive it?`}</Typography>
                    <Typography className="SuccessfullySendEmailSubTitle">
                        {'Check your Span folder or'}
                        <Link className="SuccessfullySendEmailLink" href="#" onClick={handleReset}>
                            Resend Email
                        </Link>
                    </Typography>
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

export default connect(mapStateToProps, mapDispatchToProps)(Successfully);
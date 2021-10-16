import React from 'react';
import { connect } from "react-redux";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import MailBox from "../../assets/mailbox.svg";

import { setActiveStep, signupAction } from "../../store/actions/signup";

import './Confirm.css';

const Confirm = (props) => {
    const { ActiveStep, FullName, BusinessEmail, Country, PhoneNumber, Password, CompanyName, Address, CompanyBusinessEmail, CompanyCountry, City, CompanyPhoneNumber, AnotherPhoneNumber, onSetActiveStep, onSignupAction } = props;

    const handleNext = () => {
        let nextStep = ActiveStep + 1;
        onSetActiveStep(nextStep);

        let payload = {
            user_full_name: FullName,
            user_email: BusinessEmail,
            country: Country,
            user_phone: PhoneNumber,
            user_password: Password,
            user_password_confirmation: Password,
            lang: 'ar',
            company_name: CompanyName,
            company_address: Address,
            company_business_email: CompanyBusinessEmail,
            company_avatar: '',
            company_country_id: CompanyCountry,
            company_city_id: City,
            company_phone: CompanyPhoneNumber,
            'company_extra_data[phone]': AnotherPhoneNumber,
        };

        onSignupAction(payload);
    };

    const handleBack = () => {
        let prevStep = ActiveStep - 1;
        onSetActiveStep(prevStep);
    };

    return (
        <div className="ConfirmContainer">
            <Typography className="ConfirmTitle">{`You're all set. Ready?`}</Typography>
            <div className="ConfirmContent">
                <div className="ConfirmMailBox">
                    <img className="ConfirmMailBoxImg" src={MailBox} alt="MailBox" />
                </div>
                <div className="ConfirmMessage">
                    <Typography className="ConfirmMessageTitle">{`We will send a message for this e-mail`}</Typography>
                    <Typography className="ConfirmMessageSubTitle">{BusinessEmail}</Typography>
                </div>
            </div>
            <div className="ConfirmFooter">
                <div className="ConfirmAction">
                    {ActiveStep !== 0
                        ? <Button
                            className="ConfirmBackButton"
                            onClick={handleBack}>
                            Back
                        </Button>
                        : null}
                    <Button
                        className="ConfirmNextButton"
                        onClick={handleNext}
                    >
                        {'Confirm'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ActiveStep: state.signup.activeStep,
        FullName: state.signup.fullName,
        BusinessEmail: state.signup.businessEmail,
        Country: state.signup.country,
        PhoneNumber: state.signup.phoneNumber,
        Password: state.signup.password,
        CompanyName: state.signup.companyName,
        Address: state.signup.address,
        CompanyBusinessEmail: state.signup.companyBusinessEmail,
        CompanyCountry: state.signup.companyCountry,
        City: state.signup.companyCity,
        CompanyPhoneNumber: state.signup.companyPhoneNumber,
        AnotherPhoneNumber: state.signup.anotherCompanyPhoneNumber
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetActiveStep: (activeStep) => dispatch(setActiveStep(activeStep)),
        onSignupAction: (payload) => dispatch(signupAction(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
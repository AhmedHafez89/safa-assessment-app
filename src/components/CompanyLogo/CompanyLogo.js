import React from 'react';
import { connect } from "react-redux";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PhotoSizeSelectActualOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActualOutlined';

import { setActiveStep } from "../../store/actions/signup";

import './CompanyLogo.css';

const CompanyLogo = (props) => {
    const { ActiveStep, onSetActiveStep } = props;

    const handleNext = () => {
        let nextStep = ActiveStep + 1;
        onSetActiveStep(nextStep);
    };

    const handleBack = () => {
        let prevStep = ActiveStep - 1;
        onSetActiveStep(prevStep);
    };

    return (
        <div className="CompanyLogoContainer">
            <Typography className="CompanyLogoTitle">{'Upload Company Logo.'}</Typography>
            <div className="CompanyLogoContent">
                <div className="CompanyLogoUpload">
                    <AddCircleIcon className="CompanyLogoPlus" />
                    <div className="CompanyLogoImage">
                        <PhotoSizeSelectActualOutlinedIcon className="CompanyLogoImageIcon" />
                    </div>
                </div>
                <Typography className="CompanyLogoSubTitle">{'Only images with a size lower than 500 KB are allowed.'}</Typography>
            </div>
            <div className="CompanyLogoFooter">
                <div className="CompanyLogoAction">
                    {ActiveStep !== 0
                        ? <Button
                            className="CompanyLogoBackButton"
                            onClick={handleBack}>
                            Back
                        </Button>
                        : null}
                    <Button
                        className="CompanyLogoNextButton"
                        onClick={handleNext}
                    >
                        {'Submit'}
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
        onSetActiveStep: (activeStep) => dispatch(setActiveStep(activeStep)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyLogo);
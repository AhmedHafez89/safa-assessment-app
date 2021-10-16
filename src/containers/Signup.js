import React from 'react';
import { connect } from "react-redux";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';

import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import BusinessIcon from '@material-ui/icons/Business';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';

import UserInfo from '../components/UserInfo/UserInfo';
import CompanyInfo from '../components/CompanyInfo/CompanyInfo';
import CompanyLogo from '../components/CompanyLogo/CompanyLogo';
import Confirm from '../components/Confirm/Confirm';
import Successfully from '../components/Successfully/Successfully';
import Unknown from '../components/Unknown/Unknown';

import { setActiveStep, reSetActiveStep } from "../store/actions/signup";

import './Signup.css';

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 14,
        backgroundColor: '#f4f4f4',
        height: 6,
        borderTop: 6,
        borderTopStyle: 'solid',
        borderBottom: 6,
        borderBottomStyle: 'solid',
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
    },
    active: {
        backgroundColor: '#1777fb',
        '& $line': {
            borderTop: 'none'
        },
    },
    completed: {
        backgroundColor: '#1777fb',
        '& $line': {
            borderTop: 'none'
        },
    },
    line: {
        borderTop: 'none'
    },
})(StepConnector);

function ColorlibStepIcon(props) {
    const { active, completed } = props;

    const icons = {
        1: <PermIdentityOutlinedIcon />,
        2: <BusinessIcon />,
        3: <PhotoLibraryOutlinedIcon />,
        4: <VerifiedUserOutlinedIcon />,
    };

    return (
        <div className={`StepIconContainer ${active ? 'StepIconActive' : ''} ${completed ? 'StepIconCompleted' : ''}`}>
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};


function getSteps() {
    return ['UserInfo', 'CompanyInfo', 'CompanyLogo', 'Confirm'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <UserInfo />;
        case 1:
            return <CompanyInfo />;
        case 2:
            return <CompanyLogo />;
        case 3:
            return <Confirm />;
        default:
            return <Unknown />;
    }
}

const Signup = (props) => {
    const { ActiveStep } = props;

    const steps = getSteps();

    return (
        <div className="AppContainer">
            <div className={'StepperContainer'} >
                {ActiveStep !== steps.length
                    ? <Stepper alternativeLabel activeStep={ActiveStep} connector={<ColorlibConnector />}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    : null}
            </div>

            <div className="SignupContainer">
                {ActiveStep === steps.length
                    ? <Successfully />
                    : getStepContent(ActiveStep)
                }
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
        onReSetActiveStep: () => dispatch(reSetActiveStep())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
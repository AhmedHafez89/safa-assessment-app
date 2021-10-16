import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const setActiveStepSuccess = (activeStep) => {
    return {
        type: actionTypes.SET_ACTIVE_STEP_SUCCESS,
        activeStep: activeStep
    };
};

export const setActiveStepFail = (error) => {
    return {
        type: actionTypes.SET_ACTIVE_STEP_FAIL
    };
};

export const setActiveStepStart = () => {
    return {
        type: actionTypes.SET_ACTIVE_STEP_START
    };
};

export const setActiveStep = (activeStep) => {
    return dispatch => {
        dispatch(setActiveStepStart());
        dispatch(setActiveStepSuccess(activeStep));
    }
};

export const reSetActiveStepSuccess = () => {
    return {
        type: actionTypes.RE_SET_ACTIVE_STEP_SUCCESS,
    };
};

export const reSetActiveStep = () => {
    return dispatch => {
        dispatch(reSetActiveStepSuccess());
    }
};

export const setUserInfoSuccess = (payload) => {
    return {
        type: actionTypes.SET_USER_INFO_SUCCESS,
        fullName: payload.fullName,
        businessEmail: payload.businessEmail,
        country: payload.country,
        phoneNumber: payload.phoneNumber,
        password: payload.password
    };
};

export const setUserInfoFail = (error) => {
    return {
        type: actionTypes.SET_USER_INFO_FAIL
    };
};

export const setUserInfoStart = () => {
    return {
        type: actionTypes.SET_USER_INFO_START
    };
};

export const setUserInfo = (payload) => {
    return dispatch => {
        dispatch(setUserInfoStart());
        dispatch(setUserInfoSuccess(payload));
    }
};

export const setCompanyInfoSuccess = (payload) => {
    return {
        type: actionTypes.SET_COMPANY_INFO_SUCCESS,
        companyName: payload.companyName,
        address: payload.address,
        companyBusinessEmail: payload.companyBusinessEmail,
        companyCountry: payload.companyCountry,
        companyCity: payload.companyCity,
        companyPhoneNumber: payload.companyPhoneNumber,
        anotherCompanyPhoneNumber: payload.anotherCompanyPhoneNumber
    };
};

export const setCompanyInfoFail = (error) => {
    return {
        type: actionTypes.SET_COMPANY_INFO_FAIL
    };
};

export const setCompanyInfoStart = () => {
    return {
        type: actionTypes.SET_COMPANY_INFO_START
    };
};

export const setCompanyInfo = (payload) => {
    return dispatch => {
        dispatch(setCompanyInfoStart());
        dispatch(setCompanyInfoSuccess(payload));
    }
};

export const signupSuccess = (payload) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
    };
};

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL
    };
};

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupAction = (payload) => {
    return dispatch => {
        dispatch(signupStart());
        const url = "/register";
        let redirect= 'redirect';
        axios.post(url, payload, redirect)
            .then((response) => {
                console.log(response);
                dispatch(signupSuccess());
            })
            .catch((error) => {
                console.log(error);
                let err = JSON.stringify(error);
                err = JSON.parse(err);
                console.log(err);
                dispatch(signupFail());
            });
    }
};
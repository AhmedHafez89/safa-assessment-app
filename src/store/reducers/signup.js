import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    activeStep: 0,
    fullName: '',
    businessEmail: '',
    country: '',
    phoneNumber: '',
    password: '',
    companyName: '',
    address: '',
    companyBusinessEmail: '',
    companyCountry: '',
    companyCity: '',
    companyPhoneNumber: '',
    anotherCompanyPhoneNumber: '',
    error: null,
    loading: false
};

const setActiveStepStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const setActiveStepSuccess = (state, action) => {
    return updateObject(state, {
        activeStep: action.activeStep,
        loading: false
    });
};

const setActiveStepFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const reSetActiveStepSuccess = (state, action) => {
    return updateObject(state, initialState);
};

const setUserInfoStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const setUserInfoSuccess = (state, action) => {
    return updateObject(state, {
        fullName: action.fullName,
        businessEmail: action.businessEmail,
        country: action.country,
        phoneNumber: action.phoneNumber,
        password: action.password,
        loading: false
    });
};

const setUserInfoFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const setCompanyInfoStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const setCompanyInfoSuccess = (state, action) => {
    return updateObject(state, {
        companyName: action.companyName,
        address: action.address,
        companyBusinessEmail: action.companyBusinessEmail,
        companyCountry: action.companyCountry,
        companyCity: action.companyCity,
        companyPhoneNumber: action.companyPhoneNumber,
        anotherCompanyPhoneNumber: action.anotherCompanyPhoneNumber,
        loading: false
    });
};

const setCompanyInfoFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const signupStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const signupSuccess = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};

const signupFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ACTIVE_STEP_START: return setActiveStepStart(state, action);
        case actionTypes.SET_ACTIVE_STEP_SUCCESS: return setActiveStepSuccess(state, action);
        case actionTypes.SET_ACTIVE_STEP_FAIL: return setActiveStepFail(state, action);
        case actionTypes.RE_SET_ACTIVE_STEP_SUCCESS: return reSetActiveStepSuccess(state, action);
        case actionTypes.SET_USER_INFO_START: return setUserInfoStart(state, action);
        case actionTypes.SET_USER_INFO_SUCCESS: return setUserInfoSuccess(state, action);
        case actionTypes.SET_USER_INFO_FAIL: return setUserInfoFail(state, action);
        case actionTypes.SET_COMPANY_INFO_START: return setCompanyInfoStart(state, action);
        case actionTypes.SET_COMPANY_INFO_SUCCESS: return setCompanyInfoSuccess(state, action);
        case actionTypes.SET_COMPANY_INFO_FAIL: return setCompanyInfoFail(state, action);
        case actionTypes.SIGNUP_START: return signupStart(state, action);
        case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
        default: return state;
    }
};

export default reducer;
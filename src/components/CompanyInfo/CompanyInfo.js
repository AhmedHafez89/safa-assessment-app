import React, { useState } from 'react';
import { connect } from "react-redux";

import { useFormik } from 'formik';
import * as yup from 'yup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { setActiveStep, setCompanyInfo } from "../../store/actions/signup";

import './CompanyInfo.css';

const CompanyInfo = (props) => {
    const { ActiveStep, CompanyName, Address, BusinessEmail, Country, City, PhoneNumber, AnotherPhoneNumber, onSetActiveStep, onSetCompanyInfo } = props;

    const [country, setCountry] = useState(Country);
    const [city, setCity] = useState(City);

    const handleChangeCountry = (event) => {
        setCountry(event.target.value.target.value);
    };

    const handleChangeCity = (event) => {
        setCity(event.target.value.target.value);
    };

    const handleNext = () => {
        let nextStep = ActiveStep + 1;
        onSetActiveStep(nextStep);
    };

    const handleBack = () => {
        let prevStep = ActiveStep - 1;
        onSetActiveStep(prevStep);
    };

    const validationSchema = yup.object({
        companyName: yup
            .string('Please Enter your company name')
            .required('Please Enter your company name'),
        address: yup
            .string('Please Enter your address')
            .required('Please Enter your address'),
        businessEmail: yup
            .string('Please Enter your business email')
            .email('Please enter a valid email')
            .max(50, 'Please enter a valid email')
            .required('Please Enter your business email'),
        country: yup.string().required("Please Enter your country").nullable(),
        city: yup.string().required("Please Enter your city").nullable(),
        phoneNumber: yup
            .number()
            .typeError('Please enter a valid phone number')
            .test("phoneNumber-check", null, (mobile) => {
                if (mobile) {
                    let mobilevalue = '+20' + mobile;

                    try {
                        const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();
                        const number = phoneUtil.parse(mobilevalue.toString(), 'EG');

                        if (phoneUtil.isValidNumber(number, 'EG')) {
                            return;
                        } else {
                            return new yup.ValidationError(
                                'Please enter a valid mobile number',
                                null,
                                "phoneNumber"
                            );
                        }
                    } catch (e) {
                        console.log('Valid Number was thrown: ', e.toString());
                    }
                }
            })
            .required('Please Enter your phone number'),
        anotherPhoneNumber: yup
            .number()
            .typeError('Please enter a valid phone number')
            .test("phoneNumber-check", null, (mobile) => {
                if (mobile) {
                    let mobilevalue = '+20' + mobile;

                    try {
                        const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();
                        const number = phoneUtil.parse(mobilevalue.toString(), 'EG');

                        if (phoneUtil.isValidNumber(number, 'EG')) {
                            return;
                        } else {
                            return new yup.ValidationError(
                                'Please enter a valid mobile number',
                                null,
                                "anotherPhoneNumber"
                            );
                        }
                    } catch (e) {
                        console.log('Valid Number was thrown: ', e.toString());
                    }
                }
            })
            .required('Please Enter your phone number'),
    });

    const formik = useFormik({
        initialValues: {
            companyName: CompanyName,
            address: Address,
            businessEmail: BusinessEmail,
            country: Country,
            city: City,
            phoneNumber: PhoneNumber,
            anotherPhoneNumber: AnotherPhoneNumber
        },

        validationSchema: validationSchema,
        onSubmit: (values) => {
            let payload = {
                companyName: values.companyName,
                address: values.address,
                companyBusinessEmail: values.businessEmail,
                companyCountry: values.country,
                companyCity: values.city,
                companyPhoneNumber: values.phoneNumber,
                anotherCompanyPhoneNumber: values.anotherPhoneNumber,
            };
            handleNext();
            onSetCompanyInfo(payload);
        },
    });

    return (
        <div className="CompanyInfoContainer">
            <Typography className="CompanyInfoTitle">{'Verify your company.'}</Typography>
            <form onSubmit={formik.handleSubmit}>
                <div className="CompanyInfoContent">
                    <Typography className="CompanyInfoSubTitle">{'Entering this information correctly will facilitate the company verifiction process'}</Typography>
                    <TextField
                        className={`CompanyInfoInput CompanyNameInput ${formik.touched.companyName && formik.errors.companyName ? 'CompanyInfoInputError' : ''}`}
                        id="companyName"
                        name="companyName"
                        label="Company Name"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                        helperText={formik.touched.companyName && formik.errors.companyName}
                        placeholder="Enter your company Name" />

                    <TextField
                        className={`CompanyInfoInput AddressInput ${formik.touched.address && formik.errors.address ? 'CompanyInfoInputError' : ''}`}
                        id="address"
                        name="address"
                        label="Address"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        placeholder="Enter your address" />

                    <TextField
                        className={`CompanyInfoInput BusinessEmailInput ${formik.touched.businessEmail && formik.errors.businessEmail ? 'CompanyInfoInputError' : ''}`}
                        id="businessEmail"
                        name="businessEmail"
                        label="Business Email"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.businessEmail}
                        onChange={formik.handleChange}
                        error={formik.touched.businessEmail && Boolean(formik.errors.businessEmail)}
                        helperText={formik.touched.businessEmail && formik.errors.businessEmail}
                        placeholder="Enter your business email" />

                    <FormControl
                        className={`CompanyInfoInput CountryInput ${formik.touched.country && formik.errors.country ? 'CompanyInfoInputError' : ''}`}
                        variant="filled" >
                        <InputLabel
                            id="demo-simple-select-filled-label"
                            shrink={true}
                        >
                            Country
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={country}
                            name="country"
                            onChange={selectedOption => {
                                let event = { target: { name: 'country', value: selectedOption } }
                                handleChangeCountry(event);
                                formik.handleChange(selectedOption);
                            }}
                        >
                            <MenuItem value="unset" selected disabled hidden>
                                Choose your country
                            </MenuItem>
                            <MenuItem value={'Egypt'}>Egypt</MenuItem>
                            <MenuItem value={'Saudi'}>Saudi</MenuItem>
                            <MenuItem value={'Angola'}>Angola</MenuItem>
                        </Select>
                        {formik.touched.country && Boolean(formik.errors.country)
                            ? <FormHelperText className={'CountryInputError'} id="component-error-text">{formik.errors.country}</FormHelperText>
                            : null}
                    </FormControl>

                    <FormControl
                        className={`CompanyInfoInput CityInput ${formik.touched.city && formik.errors.city ? 'CompanyInfoInputError' : ''}`}
                        variant="filled" >
                        <InputLabel
                            id="demo-simple-select-filled-label"
                            shrink={true}
                        >
                            City
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={city}
                            name="city"
                            onChange={selectedOption => {
                                let event = { target: { name: 'city', value: selectedOption } }
                                handleChangeCity(event);
                                formik.handleChange(selectedOption);
                            }}
                        >
                            <MenuItem value="unset" selected disabled hidden>
                                Choose your city
                            </MenuItem>
                            <MenuItem value={'Cairo'}>Cairo</MenuItem>
                            <MenuItem value={'Giza'}>Giza</MenuItem>
                            <MenuItem value={'Alexandria'}>Alexandria</MenuItem>
                        </Select>
                        {formik.touched.city && Boolean(formik.errors.city)
                            ? <FormHelperText className={'CityInputError'} id="component-error-text">{formik.errors.city}</FormHelperText>
                            : null}
                    </FormControl>

                    <div className="CompanyInfoPhoneNumberContainer">
                        <div className={`CompanyInfoPhoneNumberCode ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'CompanyInfoPhoneNumberCodeError' : ''}`}>
                            +20
                        </div>
                        <TextField
                            className={`CompanyInfoInput PhoneNumberInput ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'CompanyInfoInputError' : ''}`}
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                            placeholder="Enter your company phone number" />
                    </div>
                    <div className="CompanyInfoPhoneNumberContainer">
                        <div className={`CompanyInfoPhoneNumberCode ${formik.touched.anotherPhoneNumber && formik.errors.anotherPhoneNumber ? 'CompanyInfoPhoneNumberCodeError' : ''}`}>
                            +20
                        </div>
                        <TextField
                            className={`CompanyInfoInput AnotherPhoneNumberInput ${formik.touched.anotherPhoneNumber && formik.errors.anotherPhoneNumber ? 'CompanyInfoInputError' : ''}`}
                            id="anotherPhoneNumber"
                            name="anotherPhoneNumber"
                            label="Company Phone Number"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formik.values.anotherPhoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.anotherPhoneNumber && Boolean(formik.errors.anotherPhoneNumber)}
                            helperText={formik.touched.anotherPhoneNumber && formik.errors.anotherPhoneNumber}
                            placeholder="Enter your company phone number" />
                    </div>

                </div>
                <div className="CompanyInfoFooter">
                    <div className="BackToLogin">
                        {ActiveStep === 0
                            ? <Button className="BackToLoginButton">
                                <ArrowLeftIcon />
                                Back to login
                            </Button>
                            : null}
                    </div>
                    <div className="CompanyInfoAction">
                        <Button
                            className="CompanyInfoBackButton"
                            onClick={handleBack}>
                            Back
                        </Button>
                        <Button className="CompanyInfoNextButton" type="submit">
                            {'Next'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        ActiveStep: state.signup.activeStep,
        CompanyName: state.signup.companyName,
        Address: state.signup.address,
        BusinessEmail: state.signup.companyBusinessEmail,
        Country: state.signup.companyCountry,
        City: state.signup.companyCity,
        PhoneNumber: state.signup.companyPhoneNumber,
        AnotherPhoneNumber: state.signup.anotherCompanyPhoneNumber
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetActiveStep: (activeStep) => dispatch(setActiveStep(activeStep)),
        onSetCompanyInfo: (payload) => dispatch(setCompanyInfo(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfo);
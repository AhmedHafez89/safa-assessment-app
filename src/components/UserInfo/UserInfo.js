import React, { useState } from 'react';
import { connect } from "react-redux";

import { useFormik } from 'formik';
import * as yup from 'yup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


import { setActiveStep, setUserInfo } from "../../store/actions/signup";

import './UserInfo.css';

const UserInfo = (props) => {
    const { ActiveStep, FullName, BusinessEmail, Country, PhoneNumber, Password, onSetActiveStep, onSetUserInfo } = props;

    const [country, setCountry] = React.useState(Country);

    const handleChangeCountry = (event) => {
        setCountry(event.target.value.target.value);
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleNext = () => {
        let nextStep = ActiveStep + 1;
        onSetActiveStep(nextStep);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validationSchema = yup.object({
        fullName: yup
            .string('Please Enter your full name')
            .required('Please Enter your full name'),
        businessEmail: yup
            .string('Please Enter your business email')
            .email('Please enter a valid email')
            .max(50, 'Please enter a valid email')
            .required('Please Enter your business email'),
        country: yup.string().required("Please Enter your country").nullable(),
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
        password: yup
            .string(`Choose a password`)
            .min(8, `Password shouldn't be less than 8 characters`)
            .max(20, 'Password must be between 8 and 20 characters')
            .required('Password cannot be empty'),
        confirmPassword: yup
            .string('Please Repeat your password')
            .min(8, `Password shouldn't be less than 8 characters`)
            .max(20, 'Password must be between 8 and 20 characters')
            .test({
                name: 'passwords-match',
                exclusive: false,
                params: {},
                message: 'Repeat password must match the password',
                test: function (value) {
                    return value === this.parent.password
                },
            })
            .required('Please Repeat your password'),
    });

    const formik = useFormik({
        initialValues: {
            fullName: FullName,
            businessEmail: BusinessEmail,
            country: Country,
            phoneNumber: PhoneNumber,
            password: Password,
            confirmPassword: Password
        },

        validationSchema: validationSchema,
        onSubmit: (values) => {
            let payload = {
                fullName: values.fullName,
                businessEmail: values.businessEmail,
                country: values.country,
                phoneNumber: values.phoneNumber,
                password: values.password,
            };
            handleNext();
            onSetUserInfo(payload);
        },
    });

    return (
        <div className="UserInfoContainer">
            <Typography className="UserInfoTitle">{'Tell us more about you.'}</Typography>
            <form onSubmit={formik.handleSubmit}>
                <div className="UserInfoContent">
                    <TextField
                        className={`UserInfoInput FullNameInput ${formik.touched.fullName && formik.errors.fullName ? 'UserInfoInputError' : ''}`}
                        id="fullName"
                        name="fullName"
                        label="Full Name"
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                        placeholder="Enter your full name" />

                    <TextField
                        className={`UserInfoInput BusinessEmailInput ${formik.touched.businessEmail && formik.errors.businessEmail ? 'UserInfoInputError' : ''}`}
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
                        className={`UserInfoInput CountryInput ${formik.touched.country && formik.errors.country ? 'UserInfoInputError' : ''}`}
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

                    <div className="UserInfoPhoneNumberContainer">
                        <div className={`UserInfoPhoneNumberCode ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'UserInfoPhoneNumberCodeError' : ''}`}>
                        +20
                        </div>
                        <TextField
                            className={`UserInfoInput UserInfoPhoneNumberInput ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'UserInfoInputError' : ''}`}
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
                            placeholder="Enter your phone number" />
                    </div>

                    <FormControl
                        className={`UserInfoInput PasswordInput ${formik.touched.password && formik.errors.password ? 'UserInfoInputError' : ''}`}
                        variant="filled">
                        <InputLabel
                            shrink={true}
                            htmlFor="filled-adornment-password">Password</InputLabel>
                        <FilledInput
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            placeholder="Choose a password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {formik.touched.password && Boolean(formik.errors.password)
                            ? <FormHelperText className={'PasswordInputError'} id="component-error-text">{formik.errors.password}</FormHelperText>
                            : null}
                    </FormControl>

                    <FormControl
                        className={`UserInfoInput ConfirmPasswordInput ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'UserInfoInputError' : ''}`}
                        variant="filled">
                        <InputLabel
                            shrink={true}
                            htmlFor="filled-adornment-password">Repeat Password</InputLabel>
                        <FilledInput
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            placeholder="Repeat your password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                            ? <FormHelperText className={'PasswordInputError'} id="component-error-text">{formik.errors.confirmPassword}</FormHelperText>
                            : null}
                    </FormControl>
                </div>
                <div className="UserInfoFooter">
                    <div className="BackToLogin">
                        {ActiveStep === 0
                            ? <Button className="BackToLoginButton">
                                <ArrowLeftIcon />
                                Back to login
                            </Button>
                            : null}
                    </div>
                    <div className="UserInfoAction">
                        <Button className="UserInfoNextButton" type="submit">
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
        FullName: state.signup.fullName,
        BusinessEmail: state.signup.businessEmail,
        Country: state.signup.country,
        PhoneNumber: state.signup.phoneNumber,
        Password: state.signup.password,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetActiveStep: (activeStep) => dispatch(setActiveStep(activeStep)),
        onSetUserInfo: (payload) => dispatch(setUserInfo(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
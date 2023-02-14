import React, { useState, createRef, useEffect } from 'react';
import { ButtonBase } from '@mui/material';
import { GlobalHistory } from '../../../Helpers';
import { Inputs } from '../../../Components/Inputs/Inputs.Component';
import { numbersExpression } from '../../../utils/Expressions';
import './ForgotPassword.Style.scss';

const ForgotPasswordView = () => {
  const [state, setState] = useState({
    email: '',
  });
  const [otpCode, setOtpCode] = useState({
    first: '',
    second: '',
    third: '',
    forth: '',
  });
  const [inputRefsArray] = useState(() => Array.from({ length: 4 }, () => createRef()));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleForgotPassword = () => {
    setIsEmailSent(true);
  };

  useEffect(() => {
    if (inputRefsArray && inputRefsArray[currentIndex] && inputRefsArray[currentIndex].current)
      inputRefsArray[currentIndex].current.focus();
  }, [currentIndex, inputRefsArray]);

  return (
    <div className='forgot-password-wrapper login-wrapper'>
      <div className='login-wrapper-card'>
        <div className='card-close-button'>
          <ButtonBase
            className='btns-icon'
            id='forgotPasswordCloseBtnId'
            onClick={() => GlobalHistory.push('/accounts/login')}
          >
            <span className='mdi mdi-close' />
          </ButtonBase>
        </div>
        <div className='card-title'>Car</div>
        <div className='card-subtitle'>{`${
          isEmailSent
            ? 'Please enter the OTP code sent to your email to continue'
            : 'Please enter email or user id to reset your password'
        }`}</div>
        <div className='login-card-body'>
          {isEmailSent ? (
            <div className='otp-code-input-wrapper'>
              {otpCode &&
                Object.entries(otpCode).map((item, index) => (
                  <Inputs
                    inputRef={inputRefsArray[index]}
                    key={`${index + 1}-otp-input`}
                    idRef='otpcode1InputId'
                    maxLength={1}
                    onClick={() => setCurrentIndex(index)}
                    pattern={numbersExpression}
                    value={otpCode[item[0]]}
                    wrapperClasses='mb-4 otp-input-item'
                    onInputChanged={(event) => {
                      const { value } = event.target;
                      setOtpCode((items) => ({ ...items, [item[0]]: value }));

                      if (value.length === 1) setCurrentIndex(index + 1);
                    }}
                  />
                ))}
            </div>
          ) : (
            <Inputs
              idRef='forgotPasswordEmailInputId'
              value={state.email}
              wrapperClasses='mb-3'
              inputPlaceholder='Email or User ID'
              onInputChanged={(event) => {
                const { value } = event.target;
                setState((items) => ({ ...items, email: value }));
              }}
            />
          )}

          <div className='login-button-wrapper'>
            <ButtonBase
              id='forgotPasswordNextBtnId'
              disabled={
                !isEmailSent
                  ? !state.email
                  : otpCode && Object.entries(otpCode).findIndex((item) => !otpCode[item[0]]) !== -1
              }
              onClick={() => {
                if (!isEmailSent) handleForgotPassword();
                else {
                  setState({ email: '' });
                  setIsEmailSent(false);
                  setOtpCode({
                    first: '',
                    second: '',
                    third: '',
                    forth: '',
                  });
                }
              }}
            >
              Next
            </ButtonBase>
          </div>
        </div>
      </div>
      <div className='login-company-info-wrapper'>
        <ButtonBase
          onClick={() => {}}
          id='forgotPasswordTermsBtnId'
          className='btns btn-primary c-gray'
        >
          Terms and Conditions
        </ButtonBase>
        <div className='h-divider' />
        <ButtonBase
          onClick={() => {}}
          id='forgotPasswordHelpBtnId'
          className='btns btn-primary c-gray'
        >
          Help
        </ButtonBase>
        <div className='h-divider' />
        <ButtonBase
          onClick={() => {}}
          id='forgotPasswordRightsBtnId'
          className='btns btn-primary c-gray'
        >
          © 2022 Beyond Limits Inc. All rights reserved
        </ButtonBase>
      </div>
    </div>
  );
};

export default ForgotPasswordView;

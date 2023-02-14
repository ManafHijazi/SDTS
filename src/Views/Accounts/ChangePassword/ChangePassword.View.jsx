import React, { useState } from 'react';
import { ButtonBase } from '@mui/material';
import { GlobalHistory, showSuccess } from '../../../Helpers';
import { Inputs } from '../../../Components/Inputs/Inputs.Component';
import { ChangePasswordService } from '../../../Services/Auth.Services';
import './ChangePassword.Style.scss';

const ChangePasswordView = () => {
  const userData = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isShowPassword, setIsShowPassword] = useState({
    old_password: false,
    new_password: false,
    password_confirm: false,
  });
  const [state, setState] = useState({
    old_password: '',
    new_password: '',
    password_confirm: '',
  });

  const handleChangePassword = async () => {
    setIsLoading(true);
    setErrors([]);

    const bodyFormData = new FormData();

    Object.entries(state)
      .filter((item) => item[1])
      .map((item) => bodyFormData.append(item[0], item[1]));

    const response = await ChangePasswordService(bodyFormData);
    if (response && response.data && response.status === 200) {
      showSuccess('Password Changed Successfully!');
      setErrors([]);

      const localUserData = { ...userData, first_login: false };

      localStorage.setItem('user', JSON.stringify(localUserData));

      if (userData && userData.super_user) GlobalHistory.push('/home/companies-page');
      else GlobalHistory.push('/home/products');
    } else setErrors(response && response.data);

    setIsLoading(false);
  };

  return (
    <div className='change-password-wrapper login-wrapper'>
      <div className='login-wrapper-card is-change-password'>
        <div className='card-close-button'>
          <ButtonBase
            id='changePasswordCloseBtnId'
            onClick={() => {
              if (userData && userData.super_user) GlobalHistory.push('/home/companies-page');
              else GlobalHistory.push('/home/products');
            }}
            className='btns-icon'>
            <span className='mdi mdi-close' />
          </ButtonBase>
        </div>
        <div className='card-title'>Car</div>
        <div className='card-subtitle'>
          {userData && userData.first_login
            ? 'This is your first login, it is recommended to change your password'
            : 'To change your password, please enter your current password and the new password'}
        </div>
        <div className='login-card-body'>
          <Inputs
            idRef='changePasswordOldPasswordInputId'
            wrapperClasses='mb-2'
            value={state.old_password}
            inputPlaceholder='Current password'
            type={isShowPassword.old_password ? 'text' : 'password'}
            onInputChanged={(event) => {
              const { value } = event.target;
              setState((items) => ({ ...items, old_password: value }));
            }}
            endAdornment={
              <ButtonBase
                id='changePasswordShowOldPasswordBtnId'
                className='btns-icon mx-2 theme-transparent'
                onClick={() =>
                  setIsShowPassword((items) => ({ ...items, old_password: !items.old_password }))
                }>
                <span
                  className={`c-gray-primary  mdi mdi-${
                    (isShowPassword.old_password && 'eye-off') || 'eye'
                  } px-2`}
                />
              </ButtonBase>
            }
          />
          <Inputs
            idRef='changePasswordNewPasswordInputId'
            wrapperClasses='mb-2'
            value={state.new_password}
            inputPlaceholder='New password'
            type={isShowPassword.new_password ? 'text' : 'password'}
            onInputChanged={(event) => {
              const { value } = event.target;
              setState((items) => ({ ...items, new_password: value }));
            }}
            endAdornment={
              <ButtonBase
                id='changePasswordShowNewPasswordBtnId'
                className='btns-icon mx-2 theme-transparent'
                onClick={() =>
                  setIsShowPassword((items) => ({ ...items, new_password: !items.new_password }))
                }>
                <span
                  className={`c-gray-primary mdi mdi-${
                    (isShowPassword.new_password && 'eye-off') || 'eye'
                  } px-2`}
                />
              </ButtonBase>
            }
          />
          <Inputs
            idRef='changePasswordConfirmPasswordInputId'
            wrapperClasses='mb-3'
            value={state.password_confirm}
            inputPlaceholder='Confirm new password'
            type={isShowPassword.password_confirm ? 'text' : 'password'}
            onInputChanged={(event) => {
              const { value } = event.target;
              setState((items) => ({ ...items, password_confirm: value }));
            }}
            endAdornment={
              <ButtonBase
                id='changePasswordShowConfirmPasswordBtnId'
                className='btns-icon mx-2 theme-transparent'
                onClick={() =>
                  setIsShowPassword((items) => ({
                    ...items,
                    password_confirm: !items.password_confirm,
                  }))
                }>
                <span
                  className={`c-gray-primary  mdi mdi-${
                    (isShowPassword.password_confirm && 'eye-off') || 'eye'
                  } px-2`}
                />
              </ButtonBase>
            }
          />
          {errors && (
            <div className='errors-wrapper'>
              {errors.map((item, index) => (
                <div key={`${index + 1}-error-item`} className='error-item'>
                  {item}
                </div>
              ))}
            </div>
          )}
          <div className='login-button-wrapper'>
            <ButtonBase
              id='changePasswordBtnId'
              className='btns change-password-wrapper'
              disabled={
                isLoading || !state.old_password || !state.new_password || !state.password_confirm
              }
              onClick={handleChangePassword}>
              Change password
            </ButtonBase>
          </div>
        </div>
      </div>
      <div className='login-company-info-wrapper'>
        <ButtonBase
          onClick={() => {}}
          id='changePasswordTermsBtnId'
          className='btns btn-primary c-gray'>
          Terms and Conditions
        </ButtonBase>
        <div className='h-divider' />
        <ButtonBase
          onClick={() => {}}
          id='changePasswordHelpBtnId'
          className='btns btn-primary c-gray'>
          Help
        </ButtonBase>
        <div className='h-divider' />
        <ButtonBase
          onClick={() => {}}
          id='changePasswordRightsBtnId'
          className='btns btn-primary c-gray'>
          © 2022 Beyond Limits Inc. All rights reserved
        </ButtonBase>
      </div>
    </div>
  );
};

export default ChangePasswordView;

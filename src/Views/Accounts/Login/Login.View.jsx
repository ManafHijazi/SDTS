import React, { useCallback, useState } from 'react';
import { ButtonBase } from '@mui/material';
import { Inputs, CheckboxesComponent } from '../../../Components';
import { GlobalHistory } from '../../../Helpers';

const LoginView = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [state, setState] = useState({
    user_id: '',
    password: '',
  });

  const handleLogin = useCallback(async () => {
    GlobalHistory.push('/home');
    // setIsLoginLoading(true);
    // const response = await LoginService(state);

    // if (response && response.data && response.status === 200) {
    //   const { data } = response;

    //   localStorage.setItem('access_token', data.access_token);

    //   let localEndPoint = endPoint;

    //   if (endPoint.includes('https')) localEndPoint = endPoint.replace('https', 'wss');
    //   else localEndPoint = endPoint.replace('http', 'wss');

    //   SetGlobalSocketReducer(
    //     new WebSocket(`${localEndPoint}api/v1/products/ws?access_token=${data.access_token}`),
    //   );

    //   let userObject = { ...data, access_token: '' };

    //   if (userObject && userObject.super_user) {
    //     userObject = { ...data, roles: [{ role_name: 'SUPER_USER' }] };
    //   }

    //   localStorage.setItem('user', JSON.stringify(userObject));
    //   LoginActions.login(userObject);
    //   localStorage.setItem('isLoggedIn', JSON.stringify(true));
    //   setIsLoginLoading(false);

    //   if (userObject && userObject.first_login) {
    //     GlobalHistory.push('/accounts/change-password');
    //   } else {
    //     if (userObject && userObject.super_user) GlobalHistory.push('/home/companies-page');
    //     else GlobalHistory.push('/home/products');
    //   }
    // } else {
    //   if (response && response.data) {
    //     showError(
    //       (response &&
    //         response.data &&
    //         Array.isArray(response.data) &&
    //         response.data.map((item, index) => (
    //           <div key={`${index + 1}-error`}>{`- ${item}`}</div>
    //         ))) ||
    //         'Login Failed',
    //     );
    //     setIsLoginLoading(false);
    //   }
    // }
  }, [state]);

  return (
    <div className='login-wrapper'>
      <div className='login-wrapper-card'>
        <div className='card-title'>Car</div>
        <div className='card-subtitle'>Please login to start using the system</div>
        <div className='login-card-body'>
          <Inputs
            idRef='loginEmailInputId'
            value={state.user_id}
            wrapperClasses='mb-3'
            inputPlaceholder='Email'
            onInputChanged={(event) => {
              const { value } = event.target;
              setState((items) => ({ ...items, user_id: value }));
            }}
            onKeyUp={(event) => {
              if (event.key === 'Enter' && state.password && state.user_id) handleLogin();
            }}
          />
          <Inputs
            idRef='loginPasswordInputId'
            wrapperClasses='mb-2'
            value={state.password}
            inputPlaceholder='Password'
            type={isShowPassword ? 'text' : 'password'}
            onInputChanged={(event) => {
              const { value } = event.target;
              setState((items) => ({ ...items, password: value }));
            }}
            onKeyUp={(event) => {
              if (event.key === 'Enter' && state.password && state.email) handleLogin();
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !isLoginLoading && state.user_id && state.password) {
                handleLogin();
              }
            }}
            endAdornment={
              <ButtonBase
                id='loginShowPasswordBtnId'
                className='btns-icon mx-2 theme-transparent'
                onClick={() => setIsShowPassword((items) => !items)}
              >
                <span
                  className={`c-gray-primary  mdi mdi-${
                    (isShowPassword && 'eye-off') || 'eye'
                  } px-2`}
                />
              </ButtonBase>
            }
          />
          <div className='login-actions-wrapper'>
            <CheckboxesComponent
              idRef='rememberMeLoginRefId'
              singleChecked={isRememberMe}
              label='Remember Me'
              onSelectedCheckboxChanged={() => {
                setIsRememberMe((item) => !item);
              }}
            />
            <ButtonBase
              id='loginForgotPasswordBtnId'
              onClick={() => GlobalHistory.push('/accounts/forgot-password')}
              className='btns btn-primary'
            >
              Forgot your password?
            </ButtonBase>
          </div>
          <div className='login-button-wrapper'>
            <ButtonBase
              id='loginSigninBtnId'
              disabled={isLoginLoading || !state.user_id || !state.password}
              onClick={handleLogin}
            >
              {isLoginLoading ? 'Signing in ...' : 'Sign in'}
            </ButtonBase>
          </div>
        </div>
      </div>
      <div className='login-company-info-wrapper'>
        <ButtonBase
          onClick={() => {}}
          id='loginConditionsBtnId'
          className='btns btn-primary c-gray'
        >
          Terms and Conditions
        </ButtonBase>
        <div className='h-divider' />
        <ButtonBase id='loginHelpBtnId' onClick={() => {}} className='btns btn-primary c-gray'>
          Help
        </ButtonBase>
        <div className='h-divider' />
        <ButtonBase id='loginRightsBtnId' onClick={() => {}} className='btns btn-primary c-gray'>
          © 2022 Beyond Limits Inc. All rights reserved
        </ButtonBase>
      </div>
    </div>
  );
};

export default LoginView;

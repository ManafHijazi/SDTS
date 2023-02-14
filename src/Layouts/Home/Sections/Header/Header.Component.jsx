import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ButtonBase, Badge, Avatar } from '@mui/material';
import {
  GlobalHistory,
  removeAllPendingRequestsRecordHttp,
  SetGlobalRerender,
  setLogoutAction,
  showError,
  showSuccess,
} from '../../../../Helpers';
import { UserMenuComponent } from './Sections';
import { CollapseComponent } from '../../../../Components';
import { useOnClickOutside } from '../../../../Hooks';
import { LoginActions } from '../../../../Store/Actions';
import { storageService } from '../../../../utils';
import { LogoutService } from '../../../../Services';
import { useLocation } from 'react-router-dom';
import './Header.Style.scss';

const FirstLettersExp = /\b(\w)/gm;

export const HeaderComponent = ({ handleSideMenuOpenClose }) => {
  const location = useLocation();
  const userProfileRef = useRef(null);
  const statesRef = useRef(null);
  const userState = JSON.parse(localStorage.getItem('user'));
  const [isOpenMenu, setIsOpenMenu] = useState({
    userProfile: false,
    status: false,
    events: false,
  });
  const [isOpenCollapse, setIsOpenCollapse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [render, setRender] = useState(false);

  SetGlobalRerender(setRender, render);

  const getUserProfilePicture = useCallback(async () => {
    setIsLoading(true);

    const response = {};

    if (response) {
      const { data } = response;
      const localData = (data && typeof data === 'string' && data.replace('/', '')) || '';

      const localUserObject = {
        ...userState,
        profile_picture: `${localStorage.getItem('endPoint')}${localData}`,
      };

      localStorage.setItem('user', JSON.stringify(localUserObject));
    }

    setIsLoading(false);
  }, []);

  const userProfileClicked = () => {
    setIsOpenMenu((item) => ({ ...item, userProfile: !item.userProfile, status: false }));
    setIsOpenCollapse(!isOpenCollapse);
  };

  const logoutClicked = async () => {
    removeAllPendingRequestsRecordHttp();

    const response = await LogoutService();

    if (response && response.data && response.status === 200) {
      const { data } = response;

      showSuccess(data?.msg || 'Logged out Successfully');

      LoginActions.logout();
      storageService.clearLocalStorage();

      setTimeout(() => {
        GlobalHistory.push('/accounts/login');
      }, 100);
    } else {
      const errorMsg = 'You must be logged in to complete this request!';

      if (response)
        if (typeof response === 'string' || response instanceof String)
          showError(response || errorMsg);

      if (response && response.data)
        if (typeof response.data === 'string' || response.data instanceof String)
          showError(response.data || errorMsg);

      if (response && response.data && response.data.error)
        if (typeof response.data.error === 'string' || response.data.error instanceof String)
          showError(response.data.error || errorMsg);
    }
  };

  useOnClickOutside(userProfileRef, () => {
    if (isOpenMenu.userProfile)
      setIsOpenMenu((item) => ({
        ...item,
        userProfile: false,
      }));
    setIsOpenCollapse(false);
  });

  useOnClickOutside(statesRef, () => {
    if (isOpenMenu.status)
      setIsOpenMenu((item) => ({
        ...item,
        status: false,
      }));
    setIsOpenCollapse(false);
  });

  setLogoutAction(logoutClicked);

  useEffect(() => {
    if (location && !location.pathname.includes('products/')) getUserProfilePicture();
  }, [getUserProfilePicture, render]);

  return (
    <div className='header-wrapper'>
      <div className='header-side-menu-action'>
        <ButtonBase onClick={handleSideMenuOpenClose}>
          <span className='mdi mdi-menu' />
        </ButtonBase>
        <div className='section header-logo-wrapper'>
          SDTS
          {userState && userState.company_name && (
            <>
              <div className='vertical-line'>|</div>
              <div className='company-name-wrapper'>{`${userState.company_name}`}</div>
            </>
          )}
        </div>
      </div>
      <div className='section last-section-wrapper'>
        <div className='notification-btn btns'>
          <Badge>
            <ButtonBase>
              <span className='mdi mdi-bell-outline' />
            </ButtonBase>
          </Badge>
        </div>
        <div className='p-relative' ref={userProfileRef}>
          <div className='btns theme-transparent user-button-wrapper'>
            <div className='user-name-wrapper'>
              <ButtonBase id='headerUserMenuBtn' onClick={userProfileClicked}>
                <span
                  className={
                    isOpenMenu.userProfile === true
                      ? 'mdi mdi-chevron-up mx-2'
                      : 'mdi mdi-chevron-down mx-2'
                  }
                />
                {!isLoading ? (
                  <Avatar
                    className='avatars-wrapper theme-small'
                    src={userState && userState.profile_picture}>
                    <span className='pt-1'>
                      {userState &&
                        `${userState.first_name} ${userState.last_name}`.match(FirstLettersExp)}
                    </span>
                  </Avatar>
                ) : (
                  <Avatar
                    className='avatars-wrapper theme-small'
                    src={userState && userState.profile_picture}>
                    <span className='pt-1'>
                      {userState &&
                        `${userState.first_name} ${userState.last_name}`.match(FirstLettersExp)}
                    </span>
                  </Avatar>
                )}
                <div className='user-info-text'>
                  <div className='user-name-text'>
                    {userState && `${userState.first_name} ${userState.last_name}`}
                  </div>
                  <div className='user-role-text'>
                    {userState &&
                      userState.roles &&
                      userState.roles.findIndex((item) => item.role_name === 'USER') === -1 &&
                      `${userState.roles.map(
                        (item) =>
                          `${
                            (item.role_name === 'COMPANY_ADMIN' && 'Company Admin') ||
                            (item.role_name === 'USER' && 'User') ||
                            (item.role_name === 'SUPER_USER' && 'Super User')
                          } `
                      )}`}
                  </div>
                </div>
              </ButtonBase>
            </div>

            <CollapseComponent
              isOpen={isOpenMenu.userProfile}
              top={50}
              isAbsolute
              classes='user-menu-collapse-wrapper'
              component={
                <UserMenuComponent
                  isLoading={isLoading}
                  logout={logoutClicked}
                  getUserProfilePicture={getUserProfilePicture}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

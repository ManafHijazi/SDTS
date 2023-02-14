import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Avatar } from '@mui/material';
import { GlobalHistory } from 'Helpers';
import { UploaderComponent } from 'Components';
import './UserMenu.Style.scss';

export const UserMenuComponent = memo(({ logout, isLoading, getUserProfilePicture }) => {
  const userState = JSON.parse(localStorage.getItem('user'));
  const [profilePicture, setProfilePicture] = useState(null);
  const [isAlternativeOpen, setIsAlternativeOpen] = useState(false);

  const updateUserProfilePictureHandler = async () => {
    const bodyFormData = new FormData();

    Object.entries({ profile_picture: profilePicture[0].file })
      .filter((item) => item[1])
      .map((item) => bodyFormData.append(item[0], item[1]));

    const response = {};

    if (response) {
      setProfilePicture(null);
      getUserProfilePicture();
    }
  };

  useEffect(() => {
    if (profilePicture && profilePicture[0] && profilePicture[0].file)
      updateUserProfilePictureHandler();
  }, [profilePicture]);

  return (
    <div className='user-menu-wrapper'>
      <div className='user-info-wrapper'>
        <div className='user-image-wrapper'>
          {isLoading ? (
            <Avatar className='avatars-wrapper theme-menu' />
          ) : (
            <ButtonBase
              className='c-primary'
              id='userMenuChangePictureBtn'
              onClick={() => setIsAlternativeOpen(true)}>
              <Avatar
                className='avatars-wrapper theme-menu'
                src={userState && userState.profile_picture}
              />
            </ButtonBase>
          )}
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
        {/* <div className='user-manage-wrapper'>
          <ButtonBase className='btns theme-solid theme-short' onClick={() => {}}>
            <span className='mdi mdi-badge-account-horizontal-outline mr-1' />
            Manage account
          </ButtonBase>
        </div> */}
        <div className='user-reset-password-wrapper'>
          <UploaderComponent
            accept='image/*'
            uploaderTheme='menu_upload'
            isAlternativeOpen={isAlternativeOpen}
            uploadedFiles={profilePicture || null}
            setIsAlternativeOpen={setIsAlternativeOpen}
            localProfilePicture={userState && userState.profile_picture}
            uploadedFileChanged={(newFiles) => {
              setProfilePicture(newFiles);
              setIsAlternativeOpen(false);
            }}
          />
          <ButtonBase
            className='btns'
            id='userMenuResetPasswordBtn'
            onClick={() => GlobalHistory.push('/accounts/chnage-password?change_password=true')}>
            <span className='mdi mdi-lock-reset mr-3' />
            Reset Password
          </ButtonBase>
        </div>
      </div>
      <div className='menu-action'>
        <ButtonBase
          id='userMenuLogoutBtn'
          className='btns theme-outline theme-short'
          onClick={logout}>
          <div className='c-primary'>Sign out</div>
        </ButtonBase>
      </div>
    </div>
  );
});

UserMenuComponent.propTypes = {
  logout: PropTypes.func.isRequired,
};

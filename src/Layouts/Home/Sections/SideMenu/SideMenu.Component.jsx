import React from 'react';
import {storageService} from 'utils';
import {LoginActions} from 'Store/Actions';
import {useLocation} from 'react-router-dom';
import {ButtonBase, Tooltip} from '@mui/material';
import {GlobalHistory} from '../../../../Helpers/Middleware.Helper';
import {removeAllPendingRequestsRecordHttp, showError, showSuccess} from 'Helpers';
import './SideMenu.Style.scss';

export const SideMenuComponent = ({isSideMenuOpen, HomeRoutes, handleSideMenuOpenClose}) => {
  const location = useLocation();
  const isRouteActive = (path) => location.pathname.includes(path);

  const logoutHandler = async () => {
    removeAllPendingRequestsRecordHttp();
    LoginActions.logout();
    storageService.clearLocalStorage();

    setTimeout(() => {
      GlobalHistory.push('/accounts/login');
    }, 100);

    const response = {};

    if (response && response.data && response.status === 200) {
      const {data} = response;

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

  return (
    <div className={`side-menu-wrapper ${isSideMenuOpen ? 'is-open' : ''}`}>
      <div className='side-menu-content'>
        <div className='side-menu-title-info-wrapper'>
          <div id='nav-icon' className={`${isSideMenuOpen ? 'open' : ''}`} onClick={handleSideMenuOpenClose}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className='side-menu-title'>SDTS</div>
        </div>

        <div className='side-menu-title-wrapper'>
        </div>

        <div className={`side-menu-items ${!isSideMenuOpen ? 'is-closed' : ''}`}>
          <div className='side-menu-items-wrapper'>
            {HomeRoutes.filter((item) => !item.isHidden).map((item, index) => (
              <div
                key={`side-menu-item-${item.id}-${index + 1}`}
                className={`side-menu-item ${isRouteActive(item.path) ? 'is-active' : ''}`}>
                <Tooltip title={`${isSideMenuOpen ? '' : item.name}`} placement='right'>
                  <ButtonBase
                    id={`side-menu-item-${item.id}-${index + 1}`}
                    onClick={() => GlobalHistory.push(`${item.layout}${item.path}`)}>
                    <span className={`mdi mdi-${item.icon}`} />
                    <div className='item-name'>{item.name}</div>
                  </ButtonBase>
                </Tooltip>
              </div>
            ))}

            <div className='side-menu-signout-btn side-menu-item'>
              <Tooltip title={`${isSideMenuOpen ? '' : 'Logout'}`} placement='right'>
                <ButtonBase onClick={logoutHandler}>
                  <span className='mdi mdi-logout' />
                  <div className='item-name'>Logout</div>
                </ButtonBase>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

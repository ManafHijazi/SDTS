import React, { useState } from 'react';
import { ButtonBase } from '@mui/material';
import { GlobalHistory } from '../../../../Helpers/Middleware.Helper';
import { useLocation } from 'react-router-dom';
import { DialogComponent } from 'Components';
import './SideMenu.Style.scss';

export const SideMenuComponent = ({ isSideMenuOpen, HomeRoutes }) => {
  const location = useLocation();
  const [isLeaveOpened, setIsLeaveOpened] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const isRouteActive = (path) => location.pathname.includes(path);

  return (
    <div className={`side-menu-wrapper ${isSideMenuOpen ? 'is-open' : ''}`}>
      <div className='side-menu-content'>
        <div className='side-menu-items'>
          {HomeRoutes.filter((item) => !item.isHidden).map((item, index) => (
            <div
              key={`side-menu-item-${item.id}-${index + 1}`}
              className={`side-menu-item ${isRouteActive(item.path) ? 'is-active' : ''}`}>
              <ButtonBase
                id={`side-menu-item-${item.id}-${index + 1}`}
                onClick={() => {
                  setActiveItem(item);
                  if (
                    location &&
                    location.pathname &&
                    location.pathname.includes('users-management')
                  )
                    setIsLeaveOpened(true);
                  else GlobalHistory.push(`${item.layout}${item.path}`);
                }}>
                <span className={`mdi mdi-${item.icon}`} />
                {item.name}
              </ButtonBase>
            </div>
          ))}
        </div>
      </div>

      <DialogComponent
        maxWidth='xs'
        wrapperClasses='user-leave-dilaog-wrapper'
        dialogContent={<div className='delete-dialog-content'>Leave without saving ?</div>}
        saveClasses='btns theme-outline bg-white c-primary'
        cancelClasses='btns theme-solid bg-primary c-white theme-short'
        saveText='Discard changes'
        cancelText='Cancel'
        isOpen={isLeaveOpened}
        onSaveClicked={(event) => {
          event.preventDefault();
          if (activeItem) GlobalHistory.push(`${activeItem.layout}${activeItem.path}`);
          setIsLeaveOpened(false);
        }}
        onCancelClicked={() => setIsLeaveOpened(false)}
      />
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { SwitchRouteComponent } from '../../Components';
import HomeRoutes from '../../Routes/Children/Home/Home.Routes';
import { GlobalHistory } from '../../Helpers';
import { HeaderComponent, SideMenuComponent } from './Sections';
import './Home.Style.scss';

const HomeLayout = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
  const isLoggedIn =
    localStorage.getItem('isLoggedIn') && JSON.parse(localStorage.getItem('isLoggedIn'));
  const userData = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

  const handleSideMenuOpenClose = () => {
    setIsSideMenuOpen((prevState) => !prevState);
  };

  let localHomeRoutes = HomeRoutes.filter(
    (item) =>
      userData && userData.roles && userData.roles.some((el) => item.roles.includes(el.role_name))
  );

  useEffect(() => {
    const defaultRouteIndex = HomeRoutes.findIndex((item) => item.default);

    if (defaultRouteIndex === -1)
      HomeRoutes = HomeRoutes.map((item, index) =>
        index === 0 ? { ...item, default: true } : item
      );
  }, [HomeRoutes]);

  useEffect(() => {
    if (isLoggedIn) GlobalHistory.push('/accounts/login');
  }, [isLoggedIn]);

  return (
    !isLoggedIn && (
      <>
        <HeaderComponent handleSideMenuOpenClose={handleSideMenuOpenClose} />
        <div className='main-layout-wrapper'>
          <SideMenuComponent isSideMenuOpen={isSideMenuOpen} HomeRoutes={HomeRoutes} />
          <div className={`container-wrapper ${isSideMenuOpen ? 'is-open' : ''}`}>
            <SwitchRouteComponent routes={HomeRoutes} />
          </div>
        </div>
      </>
    )
  );
};

export default HomeLayout;

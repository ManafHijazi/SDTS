import React, { Suspense, useEffect, useState } from 'react';
import { AppRoutes } from './Routes';
import { SwitchRouteComponent } from './Components';
import { BrowserRouter as Router } from 'react-router-dom';
import { SetGlobalSocketReducer } from './Helpers/Middleware.Helper';
import { GlobalToasterGenerator, MiddlewareHelper, SetGlobalRerender } from './Helpers';

const App = () => {
  const [render, setRender] = useState(false);

  SetGlobalRerender(setRender, render);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      const wsLink = `${localEndPoint}api/v1/products/ws?access_token=${access_token}`;

      SetGlobalSocketReducer(new WebSocket(wsLink));
    }
  }, []);

  return (
    <Router>
      <Suspense fallback='...'>
        <GlobalToasterGenerator />
        <MiddlewareHelper />
      </Suspense>
      <SwitchRouteComponent routes={AppRoutes} />
    </Router>
  );
};

export default App;

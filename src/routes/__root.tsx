import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { useMatches } from '@tanstack/react-router';
import { Header } from '../components/Header';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const matches = useMatches();

  const routesToHideRoot = ['/'];

  const currentRoute = matches[matches.length - 1]?.pathname;

  const shouldHideRoot = routesToHideRoot.includes(currentRoute);

  return (
    <React.Fragment>
      {!shouldHideRoot && <Header />}
      <Outlet />
    </React.Fragment>
  );
}

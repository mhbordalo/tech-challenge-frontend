import * as React from 'react'
import { Outlet, createRootRoute, Navigate } from '@tanstack/react-router'
import { useMatches } from '@tanstack/react-router'
import { Header } from '../components/Header'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const matches = useMatches()
  const routesToHideRoot = ['/Login/']
  const currentRoute = matches[matches.length - 1]?.pathname
  const shouldHideRoot = routesToHideRoot.includes(currentRoute)

  return (
    <React.Fragment>
      {!shouldHideRoot && <Header />}
      {currentRoute === '/' ? <Navigate to="/Home" /> : <Outlet />}
    </React.Fragment>
  )
}

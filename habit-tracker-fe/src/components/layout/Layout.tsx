import { Outlet } from 'react-router-dom'
import Header from './Header'
import { HabitsProvider } from '../../features/habits/context/HabitsProvider'

import '../../App.css'

function Layout() {
  return (
    <>
      <Header />
      <HabitsProvider>
        <Outlet />
      </HabitsProvider>
    </>
  )
}

export default Layout

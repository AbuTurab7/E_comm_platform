import { Outlet } from 'react-router'
import Navbar from '../../shared/ui/components/Navbar'

function MainLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default MainLayout
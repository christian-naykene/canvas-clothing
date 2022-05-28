import { Categories } from '../../categories/categories.component'
import { Outlet } from 'react-router-dom'

export const Home = () => {
  return (
    <>
      <Outlet /> {/* Allows us to leverage nesting to change the content of the pages */}
      <Categories />
    </>
  )
}

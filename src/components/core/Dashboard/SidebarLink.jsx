import React from "react"
import { useDispatch } from "react-redux"
import { NavLink, useLocation, matchPath } from "react-router-dom"
import * as Icons from "react-icons/vsc"
import { resetCourseState } from "../../../slices/courseSlice"

const SidebarLink = ({ link, showText }) => {
  const Icon = Icons[link.icon]
  const location = useLocation()
  const dispatch = useDispatch()

  const handleClick = () => {
    if (link.path === "/dashboard/my-courses") {
      dispatch(resetCourseState())
    }
  }

  const matchRoute = matchPath({ path: link.path, end: false }, location.pathname)

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`flex items-center gap-x-2 px-3 py-2 transition-all duration-200 rounded-md 
        ${
          matchRoute
            ? "bg-yellow-800 text-yellow-50"
            : "bg-opacity-0 text-white hover:bg-opacity-50 hover:text-white"
        }`}
    >
      {Icon && <Icon className="text-lg" />}
      {showText && <span className="text-sm font-medium">{link.name}</span>}
    </NavLink>
  )
}

export default SidebarLink

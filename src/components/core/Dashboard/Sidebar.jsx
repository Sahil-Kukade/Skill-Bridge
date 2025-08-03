import { useEffect, useState } from "react"
import {
  VscSignOut,
  VscThreeBars,
  VscSettingsGear,
} from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirmationModal, setConfirmationModal] = useState(null)
  const [showText, setShowText] = useState(window.innerWidth >= 768)

  // Auto adjust showText based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768
      setShowText(isDesktop)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-screen w-[60px] items-center bg-richblack-800 border-r border-richblack-700">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-richblack-700 bg-richblack-800">
        <button
          onClick={() => setShowText((prev) => !prev)}
          className="text-richblack-100 text-2xl"
        >
          <VscThreeBars />
        </button>
        {/* No "Dashboard" label on mobile */}
      </div>

      {/* Sidebar */}
      <div
        className={`h-[calc(100vh-3.5rem)] bg-richblack-800 border-r border-richblack-700 
          flex flex-col ${showText ? "min-w-[220px]" : "min-w-[60px]"} 
          transition-all duration-300`}
      >
        {/* Logo at top */}
        <div className="flex justify-center py-4">
          <span className="text-xl text-richblack-100 font-bold">🌀</span>
        </div>

        {/* Sidebar links */}
        <div className="flex flex-col h-full justify-between py-4">
          <div className="flex flex-col px-2">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null
              return (
                <SidebarLink
                  key={link.id}
                  link={link}
                  showText={showText}
                />
              )
            })}
            <div className="my-6 h-[1px] w-full bg-richblack-700" />
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings", icon: "VscSettingsGear" }}
              showText={showText}
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-richblack-300"
            >
              <VscSignOut className="text-lg" />
              {showText && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-10 text-2xl sm:text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      {/* Profile Top Card */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 sm:px-12">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-[78px] h-[78px] rounded-full object-cover"
          />
          <div className="text-center sm:text-left space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      {/* About Section */}
      <div className="my-8 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 sm:px-12">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      {/* Personal Details */}
      <div className="my-8 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 sm:px-12">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 max-w-full">
          {/* Column 1 */}
          <div className="flex flex-col gap-y-5 w-full md:w-1/2">
            <div>
              <p className="mb-1 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-y-5 w-full md:w-1/2">
            <div>
              <p className="mb-1 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

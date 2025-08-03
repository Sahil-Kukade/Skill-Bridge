import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";
// Icons
import { FaStar } from "react-icons/fa";
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper";

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      if (data?.success) {
        setReviews(data?.data);
      }
    })();
  }, []);

  return (
    <div className="text-white my-16">
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
    What Our Students Say
  </h2>

  <div className="max-w-[90%] lg:max-w-[1200px] mx-auto">
    <Swiper
  slidesPerView={1}
  spaceBetween={30}
  loop={true}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  breakpoints={{
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 3 },
  }}
  modules={[FreeMode, Pagination, Autoplay]}
  className="w-full"
>
  {reviews.map((review, i) => (
    <SwiperSlide key={i}>
      <div className="flex flex-col justify-between gap-4 bg-richblack-800 p-6 rounded-xl shadow-lg min-h-[320px] h-full max-w-[90%] mx-auto">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <img
            src={
              review?.user?.image
                ? review?.user?.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
            }
            alt="User Avatar"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h1 className="font-semibold text-richblack-5 text-base">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
            <span className="text-xs text-richblack-400">
              {review?.course?.courseName || "General Feedback"}
            </span>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-sm text-richblack-200 mt-2 flex-grow line-clamp-3">
          {review?.review?.split(" ").length > truncateWords
            ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
            : review?.review}
        </p>

        {/* Star Rating */}
        <div className="flex items-center gap-2 mt-4">
          <h3 className="font-semibold text-yellow-400 text-sm">
            {review.rating.toFixed(1)}
          </h3>
          <ReactStars
            count={5}
            value={review.rating}
            size={20}
            edit={false}
            activeColor="#ffd700"
            emptyIcon={<FaStar />}
            fullIcon={<FaStar />}
          />
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

  </div>
</div>

  );
}

export default ReviewSlider;

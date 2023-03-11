import React from "react";
import Rating from '@mui/material/Rating';

function UsersReviews(props) {

  return (
    <div className="flex-col w-full h-full items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Reviews
        </h5>

        {props.reviews?.map((review)=>(


        <div className="flex gap-10 px-5 pt-0">
          <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
            <div>
              <img
                src={review?.userphoto?(review?.userphoto):("https://i.ibb.co/QcqyrVG/Mask-Group.png")}
                className="h-12 w-12 rounded-full"
                alt="girl-avatar"
              />
            </div>
            <div className="flex flex-col justify-start items-start space-y-2">
              <p className="text-lg font-bold leading-none text-gray-800">
                {review?.username}
              </p>
              <Rating name="half-rating-read" defaultValue={review?.stars} precision={0.5} readOnly />
              <div className="text-sm leading-none text-gray-600" dangerouslySetInnerHTML={{ __html: review?.feedback }}></div>
            </div>
          </div>
        </div>

))}
        




      </div>
    </div>
  );
}

export default UsersReviews;

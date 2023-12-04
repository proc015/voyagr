// import { Activity } from '../../types/Activity';
// import { ChangeEvent, FormEvent, useState, useRef } from 'react';
// import { useAppDispatch } from '../../app/hooks';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../app/store';
// import { root } from 'postcss';

// const ActivitySmallDetails = () => {
//   const dispatch = useAppDispatch();
//   const userId = useSelector((state: RootState) => state.user.currentUser);
//   const lastTrip = useSelector((state: RootState) => state.lastTrip);
// console.log(lastTrip)

//   type Props = {
//     name: string;
//     startLocation: number[];
//     destination: number[];
//     startDate: string;
//     endDate: string;
//     activities: Activity[];
//   };

//   const IMG_BASE_URL = 'https://res.cloudinary.com/dwskyhib9/image/upload/';
// //   const pictures = activities.map((activity) => activity.picture_src);

//   return (
//     <>
//       <div className='m-2 mb-3 w-[95%] h-[60px] rounded-[15px] border text-base border-voyagrBorders mx-auto'>
//         Here the component should access state.lastTrip and all activity Names and activity.picture_src should render here in seperate divs. 
//       </div>
//       <div className='m-2 mb-3 w-[95%] rounded-[15px] border text-base border-voyagrBorders mx-auto'>
//         {
//           lastTrip && lastTrip.activities && lastTrip.activities.length > 0
//           ? lastTrip.activities.map((activity, index) => (
//               <div key={index} className='activity-details'>
//                 <p>{activity.name}</p>
//                 <img 
//                   src={`${IMG_BASE_URL}${activity.picture_src}`} 
//                   alt={activity.name} 
//                   className='activity-image'
//                 />
//               </div>
//             ))
//           : <p>No activities found</p>
//         }
//       </div>
//     </>
//   );
// };

// export default ActivitySmallDetails;

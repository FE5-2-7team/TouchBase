// import { useEffect, useState, useTransition } from "react";
// import ProfileHeader from "./ProfileHeader";
// import { axiosInstance } from "../api/axiosInstance";
// import FollowBox from "./FollowBox";
// import ThreadsList from "../pages/ThreadsList";

// const USERID = "6811c3eeba84b946ffd47e45";

// export default function Profile() {
//   const [user, setUser] = useState();
//   const [isPending, startTransition] = useTransition();

//   const getHandler = async () => {
//     try {
//       const { data } = await axiosInstance.get(`/users/${USERID}`);
//       console.log(data);
//       setUser(data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     startTransition(async () => {
//       await getHandler();
//     });
//   }, []);

//   if (isPending) <h1>Loading...</h1>;

// return (
//   <div className="flex flex-col gap-[34px] items-center pt-[200px]">
//     <ProfileHeader />
//     {/* <ThreadsList /> */}
//     {/* <FollowBox title={"팔로워"} /> */}
//     {/* <FollowBox title={"팔로잉"} /> */}
//   </div>
// );
// }

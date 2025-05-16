import { Routes, Route } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/HomePage";
import FanPage from "./pages/FanPage";
import ProfileLayout from "./layout/ProfileLayout";
import FollowBox from "./components/Profile/FollowBox";
import LogIn from "./pages/LogInPage";
import SignUp from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditProfile from "./components/Auth/EditProfile";
import MyThreadsList from "./components/Profile/MyThreadsList";
import { useDarkMode } from "./hooks/useDarkMode";
import AuthLayout from "./layout/RejectIfAuth";
import RequireAuth from "./layout/RequireAuth";
import NewMessage from "./components/MessageComponent/NewMessage";
import MessagePage from "./pages/MessagePage";
import MessageContainer from "./components/MessageComponent/MessageContainer";
import EmptyMessage from "./components/MessageComponent/EmptyMessage";
import DetailFanPage from "./pages/DetailFanPage";
export default function App() {
  useDarkMode();

  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/profile/:id" element={<ProfileLayout />}>
            <Route index path="posts" element={<MyThreadsList />} />
            <Route path="follower" element={<FollowBox isFollower={true} />} />
            <Route
              path="following"
              element={<FollowBox isFollower={false} />}
            />
          </Route>
          <Route path="/fanpage/:teamName/:channelId/*" element={<FanPage />} />
          <Route
            path="/fanpage/:teamName/:channelId/:postId"
            element={<DetailFanPage />}
          />
          <Route element={<RequireAuth />}>
            <Route path="/message" element={<MessagePage />}>
              <Route index element={<EmptyMessage />} />
              <Route path="new" element={<NewMessage />} />
              <Route path="/message/:id" element={<MessageContainer />} />
            </Route>
            <Route path="profile/edit" element={<EditProfile />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

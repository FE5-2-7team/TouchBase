import { Routes, Route } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/HomePage";
import FanPage from "./pages/FanPage";
import MessageContainer from "./components/message/MessageContainer";
import ProfileLayout from "./layout/ProfileLayout";
import FollowBox from "./components/Profile/FollowBox";
import MessagePage from "./pages/MessagePage";
import LogIn from "./pages/LogInPage";
import SignUp from "./pages/SignUpPage";
import InboxMessage from "./components/message/InboxMessage";
import SentList from "./components/message/SentList";
import NotFoundPage from "./pages/NotFoundPage";
import EditProfile from "./components/Auth/EditProfile";
import MyThreadsList from "./components/Profile/MyThreadsList";
import { useDarkMode } from "./hooks/useDarkMode";
import AuthLayout from "./layout/AuthLayout";

export default function App() {
  useDarkMode();

  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/profile/:id" element={<ProfileLayout />}>
            <Route index path="posts" element={<MyThreadsList />} />
            <Route path="follower" element={<FollowBox title={"팔로워"} />} />
            <Route path="following" element={<FollowBox title={"팔로잉"} />} />
            <Route path="modify" element={<EditProfile />}></Route>
          </Route>
          <Route path="/fanpage/:teamName/:channelId" element={<FanPage />} />
          <Route path="/message" element={<MessagePage />}>
            <Route index element={<InboxMessage />} />
            <Route path="inbox" element={<InboxMessage />} />
            <Route path="sent" element={<SentList />} />
            <Route
              path="sent/:id"
              element={<MessageContainer mode={"sent"} />}
            />
            <Route
              path="write/:id?"
              element={<MessageContainer mode={"write"} />}
            />
            <Route
              path="view/:id"
              element={<MessageContainer mode={"received"} />}
            />
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

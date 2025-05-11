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
import AuthLayout from "./layout/AuthLayout";
import NewMessage from "./components/Message/NewMessage";
import MessagePage from "./pages/MessagePage";
import MessageContainer from "./components/Message/MessageContainer";
import EmptyMessage from "./components/Message/EmptyMessage";
import MessageChatView from "./components/Message/MessageChatView";

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
            <Route index element={<EmptyMessage />} />
            <Route path="new" element={<NewMessage />} />
            <Route path="/message/:id" element={<MessageContainer />} />
            {/* <Route path="messgae/:id" element={<MessageContainer />} /> */}
            {/* <Route path="inbox" element={<InboxMessage mode={"received"} />} />
            <Route path="sent" element={<InboxMessage mode={"sent"} />} />
            <Route path="write/" element={<MessageEditor mode={"write"} />} />
            <Route path="reply/:id?" element={<MessageEditor mode={"reply"} />} />
            <Route path="view/:id" element={<MessageEditor mode={"received"} />} /> */}
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

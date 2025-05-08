import { Routes, Route } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import ThreadsList from "./components/FanPage/ThreadsList";
import FanPage from "./pages/FanPage";
import MessageContainer from "./components/message/MessageContainer";
import ProfileLayout from "./layout/ProfileLayout";
import FollowBox from "./components/Profile/FollowBox";
import MessagePage from "./pages/MessagePage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import InboxMessage from "./components/message/InboxMessage";
import SentList from "./components/message/SentList";
import EditProfile from "./components/EditProfile";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/profile:id" element={<ProfileLayout />}>
            <Route index path="posts" element={<ThreadsList />} />
            <Route path="follower" element={<FollowBox title={"팔로워"} />} />
            <Route
              path="following"
              element={<FollowBox title={"팔로잉"} />}
            ></Route>
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
          <Route path="/message" element={<InboxMessage />} />
        </Route>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

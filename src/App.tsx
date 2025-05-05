import { Routes, Route } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import ThreadsList from "./components/ThreadsList";
import FanPage from "./pages/FanPage";
import MessageContainer from "./components/MessageContainer";
import SentList from "./components/SentList";
import InboxMessage from "./components/InboxMessage";
import ProfileHeader from "./components/ProfileHeader";
import FollowBox from "./components/FollowBox";
import MessagePage from "./pages/MessagePage";
import Login from "./pages/LogInPage";
import Signup from "./pages/SignUpPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/fanpage/:teamName" element={<FanPage />} />

          <Route path="/profile" element={<ProfileHeader />}>
            <Route index path="posts" element={<ThreadsList />} />
            <Route path="follower" element={<FollowBox title={"팔로워"} />} />
            <Route
              path="following"
              element={<FollowBox title={"팔로잉"} />}
            ></Route>
          </Route>
          <Route path="/fanpage/:teamName" element={<FanPage />} />
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

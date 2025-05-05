import { Routes, Route } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import ThreadsList from "./pages/ThreadsList";
import FanPage from "./pages/FanPage";
import InboxMessage from "./components/InboxMessage";
import ProfileHeader from "./components/ProfileHeader";
import FollowBox from "./components/FollowBox";
import MessagePage from "./pages/MessagePage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/fanpage/:teamName" element={<ThreadsList />} />

          <Route path="/profile" element={<ProfileHeader />}>
            <Route index path="posts" element={<ThreadsList />} />
            <Route path="follower" element={<FollowBox title={"팔로워"} />} />
            <Route
              path="following"
              element={<FollowBox title={"팔로잉"} />}
            ></Route>
          </Route>
          <Route path="message" element={<MessagePage />} />
          <Route path="/fanpage/:teamName" element={<FanPage />} />
          <Route path="/message" element={<InboxMessage />} />
        </Route>
      </Routes>
    </>
  );
}

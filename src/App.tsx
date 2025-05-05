import { Routes, Route } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import FanPage from "./pages/FanPage";
import Profile from "./components/Profile";
import MessagePage from "./pages/MessagePage";
import MessageContainer from "./components/MessageContainer";
import InboxMessage from "./components/InboxMessage";
import SentList from "./components/SentList";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/fanpage/:teamName" element={<FanPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/message" element={<MessagePage />}>
            <Route index element={<InboxMessage />} />
            <Route path="inbox" element={<InboxMessage />} />
            <Route path="sent" element={<SentList />} />
            <Route path="sent/:id" element={<MessageContainer mode={"sent"} />} />
            <Route path="write" element={<MessageContainer mode={"write"} />} />
            <Route path="view/:id" element={<MessageContainer mode={"received"} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

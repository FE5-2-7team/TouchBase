import { Routes, Route } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import ThreadsList from "./pages/ThreadsList";
import Profile from "./components/Profile";
import InboxMessage from "./components/InboxMessage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/fanpage/:teamName" element={<ThreadsList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/message" element={<InboxMessage />} />
        </Route>
      </Routes>
    </>
  );
}

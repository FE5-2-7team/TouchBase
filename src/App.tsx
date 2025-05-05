import { Routes, Route } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import ThreadsList from "./pages/ThreadsList";
import Profile from "./components/Profile";
import InboxMessage from "./components/InboxMessage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LogInPage";
import EditProfilePage from "./pages/EditProfilePage";

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
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/edit" element={<EditProfilePage />} />
      </Routes>
    </>
  );
}

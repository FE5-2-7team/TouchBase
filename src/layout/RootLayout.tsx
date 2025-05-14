import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Outlet } from "react-router";
import { useParams, useLocation } from "react-router";

export default function RootLayout() {
  const { teamName } = useParams();
  const location = useLocation();
  const showLayout = location.pathname.includes("edit") ? false : true;

  const hideFooter = location.pathname.includes("message") ? false : true;

  if (!showLayout) {
    return <Outlet />;
  }

  return (
    <>
      <Header />
      <div className="pt-[150px] dark:bg-[#191A1E] dark:text-white">
        <Outlet />
      </div>
      {!teamName && hideFooter && <Footer />}
    </>
  );
}

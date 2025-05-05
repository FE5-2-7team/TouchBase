import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Outlet } from "react-router";
import { useParams } from "react-router";

export default function RootLayout() {
  const { teamName } = useParams();

  return (
    <>
      <Header />
      <div className="pt-[150px] dark:bg-gray-900 dark:text-white">
        <Outlet />
      </div>
      {!teamName && <Footer />}
    </>
  );
}

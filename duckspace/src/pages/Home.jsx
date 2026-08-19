import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

import HomeSlide from "../components/homeComponents/HomeSlide";
import HomePopupCard from "../components/homeComponents/HomePopupCard";
import HomeExhibition from "../components/homeComponents/HomeExhibition";
import DuckSpaceIcon from "../assets/DuckSpaceIcon.svg";

import { useNavigate } from "react-router-dom";
import { logout } from "../apis/authApi";
import { getHome } from "../apis/homeApi";
import { getBanners } from "../apis/bannerApi";

const Home = () => {
  const navigate = useNavigate();
  const [home, setHome] = useState(null);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getHome()
      .then(setHome)
      .catch((error) => console.error("홈 데이터 조회 실패:", error));
  }, []);

  useEffect(() => {
    getBanners()
      .then((data) => {
        console.log("배너 조회:", data);

        const bannerList = data?.banners ?? [];

        setBanners(
          bannerList
            .filter((banner) => banner.active)
            .sort((a, b) => a.sortOrder - b.sortOrder)
        );
      })
      .catch((error) =>
        console.error("배너 조회 실패:", error)
      );
  }, []);

  const handleLogout = async () => {
    const refreshToken =
      localStorage.getItem("refreshToken");

    try {
      if (refreshToken) {
        await logout(refreshToken);
      }
    } catch (error) {
      console.error("로그아웃 API 오류:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      navigate("/login");
    }
  };
  return (
    <div className="min-h-screen bg-white pb-24">

      {/* 로고 */}
      <div className="flex items-center justify-between px-5 py-3">
        <img
          src={DuckSpaceIcon}
          alt="DuckSpace"
          className="h-9"
        />

        <button
          type="button"
          onClick={handleLogout}
          className="cursor-pointer text-[13px] text-[#858485]"
        >
          로그아웃
        </button>
      </div>

      {/* 상단 팝업 슬라이드 */}
      <div className="pt-4">
        <HomeSlide banners={banners} />
      </div>

      {/* 다가오는 팝업 */}
      <HomePopupCard popups={home?.upcomingPopups ?? []} />

      {/* 다른 유저 전시장 */}
      <HomeExhibition exhibitions={home?.popularExhibitions ?? []} />

      <NavBar />
    </div>
  );
}

export default Home
